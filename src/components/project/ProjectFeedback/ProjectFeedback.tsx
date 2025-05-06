"use client";

import { createListCollection } from "@ark-ui/react";
import {
  Button,
  Grid,
  Icon,
  Input,
  Select,
  Stack,
  Text,
  VStack,
} from "@omnidev/sigil";
import { keepPreviousData, useMutationState } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { FiArrowUpRight } from "react-icons/fi";
import { HiOutlineFolder } from "react-icons/hi2";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { SkeletonArray, Spinner } from "components/core";
import { CreateFeedback, FeedbackCard } from "components/feedback";
import { EmptyState, ErrorBoundary, SectionContainer } from "components/layout";
import {
  PostOrderBy,
  useCreateFeedbackMutation,
  useInfinitePostsQuery,
  useProjectStatusesQuery,
} from "generated/graphql";
import { app } from "lib/config";
import {
  useHandleSearch,
  useOrganizationMembership,
  useSearchParams,
} from "lib/hooks";

import type {
  CreateFeedbackMutationVariables,
  FeedbackFragment,
  Project,
} from "generated/graphql";
import type { Session } from "next-auth";

const SORT_BY_OPTIONS = [
  {
    label: "Created At",
    value: PostOrderBy.CreatedAtDesc,
  },
  {
    label: "Total Upvotes",
    value: PostOrderBy.UpvotesCountDesc,
  },
  {
    label: "Total Downvotes",
    value: PostOrderBy.DownvotesCountDesc,
  },
];

interface Props {
  /** Authenticated user. */
  user: Session["user"];
  /** Project ID. */
  projectId: Project["rowId"];
}

/**
 * Project feedback.
 */
const ProjectFeedback = ({ user, projectId }: Props) => {
  const router = useRouter();

  const params = useParams<{ organizationSlug: string; projectSlug: string }>();

  const [{ excludedStatuses, orderBy, search }, setSearchParams] =
    useSearchParams();

  const onSearchChange = useHandleSearch();

  const { data: defaultStatus } = useProjectStatusesQuery(
    {
      projectId,
      isDefault: true,
    },
    {
      enabled: !!projectId,
      select: (data) => data?.postStatuses?.nodes?.[0],
    },
  );

  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfinitePostsQuery(
      {
        pageSize: 5,
        projectId,
        excludedStatuses,
        orderBy: orderBy
          ? [orderBy as PostOrderBy, PostOrderBy.CreatedAtDesc]
          : undefined,
        search,
      },
      {
        placeholderData: keepPreviousData,
        initialPageParam: undefined,
        getNextPageParam: (lastPage) =>
          lastPage?.posts?.pageInfo?.hasNextPage
            ? { after: lastPage?.posts?.pageInfo?.endCursor }
            : undefined,
      },
    );

  const pendingFeedback = useMutationState<FeedbackFragment>({
    filters: {
      mutationKey: useCreateFeedbackMutation.getKey(),
      status: "pending",
    },
    select: (mutation) => {
      const { input } = mutation.state
        .variables as CreateFeedbackMutationVariables;

      return {
        rowId: "pending",
        title: input.post.title,
        description: input.post.description,
        status: defaultStatus!,
        project: {
          rowId: input.post.projectId,
          name: "pending",
          slug: "pending",
          postStatuses: {
            nodes: [],
          },
        },
        user: {
          username: user?.username,
        },
        upvotes: {
          totalCount: 0,
        },
        downvotes: {
          totalCount: 0,
        },
      };
    },
  });

  const posts =
    data?.pages?.flatMap((page) => page?.posts?.nodes?.map((post) => post)) ??
    [];

  const { isAdmin } = useOrganizationMembership({
    userId: user.rowId,
    organizationId: posts?.[0]?.project?.organization?.rowId,
  });

  // NB: we condition displaying the pending feedback to limit jumpy behavior with optimistic updates. Dependent on the filters provided for the posts query.
  const showPendingFeedback =
    defaultStatus &&
    !excludedStatuses.includes(defaultStatus.status) &&
    !orderBy;

  const allPosts = [
    ...(showPendingFeedback
      ? [
          ...pendingFeedback.filter((feedback) =>
            // NB: search filter is a bit different than the others. If `showPendingFeedback` is true, we only want to optimistically add feedback that would be included with the search
            feedback.title
              ?.toLowerCase()
              .includes(search.toLowerCase()),
          ),
        ]
      : []),
    ...posts,
  ];

  const [loaderRef, { rootRef }] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: fetchNextPage,
    disabled: isError,
  });

  return (
    <SectionContainer
      ref={rootRef}
      title={app.projectPage.projectFeedback.title}
      icon={HiOutlineFolder}
      p={0}
      pr={{ base: 4, sm: 6 }}
      pl={{ base: 4, sm: 6 }}
      pt={{ base: 4, sm: 6 }}
    >
      <Stack gap={0}>
        <CreateFeedback />

        <Stack mt={4} direction={{ base: "column", sm: "row" }}>
          <Input
            placeholder={app.projectPage.projectFeedback.search.placeholder}
            borderColor="border.subtle"
            onChange={onSearchChange}
          />

          <Select
            maxW={{ base: undefined, sm: 64 }}
            label={app.projectPage.projectFeedback.sortBy.label}
            collection={createListCollection({
              items: SORT_BY_OPTIONS,
            })}
            displayFieldLabel={false}
            clearTrigger={null}
            triggerProps={{
              borderColor: "border.subtle",
            }}
            defaultValue={orderBy ? [orderBy] : [PostOrderBy.CreatedAtDesc]}
            onValueChange={({ value }) => {
              const updatedValue =
                value?.[0] === PostOrderBy.CreatedAtDesc ? null : value?.[0];

              setSearchParams({ orderBy: updatedValue });
            }}
          />
        </Stack>

        {isError ? (
          <ErrorBoundary message="Error fetching feedback" h="sm" my={4} />
        ) : (
          <Grid
            gap={2}
            mt={4}
            maxH="md"
            overflow="auto"
            p="1px"
            scrollbar="hidden"
            WebkitMaskImage={
              allPosts.length ? "var(--scrollable-mask)" : undefined
            }
          >
            {isLoading ? (
              <SkeletonArray count={5} h={21} />
            ) : allPosts.length ? (
              <VStack>
                {allPosts.map((feedback) => {
                  const isPending = feedback?.rowId === "pending";

                  // TODO: discuss below. The current condition probably could be managed better.
                  // NB: `canManageStatus` check in `FeedbackCard` is conditionalized on `projectStatuses`. We must validate that a user has admin privileges to allow managing statuses
                  const projectStatuses = isAdmin
                    ? feedback?.project?.postStatuses?.nodes?.filter(
                        (status) => status != null,
                      )
                    : undefined;

                  return (
                    <FeedbackCard
                      key={feedback?.rowId}
                      feedback={feedback!}
                      totalUpvotes={feedback?.upvotes?.totalCount}
                      totalDownvotes={feedback?.downvotes?.totalCount}
                      projectStatuses={projectStatuses}
                      isPending={isPending}
                      w="full"
                      minH={21}
                      borderRadius="md"
                      bgColor="card-item"
                      cursor={isPending ? "not-allowed" : "pointer"}
                      role="group"
                      onClick={() =>
                        !isPending
                          ? router.push(
                              `/organizations/${params.organizationSlug}/projects/${params.projectSlug}/${feedback?.rowId}`,
                            )
                          : undefined
                      }
                    >
                      <Button
                        position="absolute"
                        top={1}
                        right={1}
                        p={2}
                        variant="icon"
                        color={{
                          base: "foreground.muted",
                          _groupHover: "brand.primary",
                        }}
                        bgColor="transparent"
                      >
                        <Icon src={FiArrowUpRight} w={5} h={5} />
                      </Button>
                    </FeedbackCard>
                  );
                })}

                {hasNextPage ? (
                  <Spinner ref={loaderRef} my={4} />
                ) : (
                  <Text my={5}>{app.projectPage.projectFeedback.endOf}</Text>
                )}
              </VStack>
            ) : (
              <EmptyState
                message={app.projectPage.projectFeedback.emptyState.message}
                h="xs"
                w="full"
                mb={4}
              />
            )}
          </Grid>
        )}
      </Stack>
    </SectionContainer>
  );
};

export default ProjectFeedback;
