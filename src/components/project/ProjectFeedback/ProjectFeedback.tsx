"use client";

import { createListCollection } from "@ark-ui/react";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  Select,
  Stack,
  Text,
} from "@omnidev/sigil";
import {
  keepPreviousData,
  useInfiniteQuery,
  useMutationState,
} from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { HiOutlineFolder } from "react-icons/hi2";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { GradientMask, SkeletonArray, Spinner } from "components/core";
import { CreateFeedback, FeedbackCard } from "components/feedback";
import { EmptyState, ErrorBoundary, SectionContainer } from "components/layout";
import { SwitchFeedbackView } from "components/project";
import {
  PostOrderBy,
  useCreateFeedbackMutation,
  useProjectStatusesQuery,
} from "generated/graphql";
import { app } from "lib/config";
import {
  useDebounceValue,
  useHandleSearch,
  useOrganizationMembership,
  useSearchParams,
} from "lib/hooks";
import { infinitePostsOptions } from "lib/options";
import {
  ViewState,
  useDialogStore,
  useProjectViewStore,
} from "lib/hooks/store";
import { DialogType } from "store";

import type {
  CreateFeedbackMutationVariables,
  FeedbackFragment,
  Project,
} from "generated/graphql";
import type { Session } from "next-auth";

// TODO: figure out how to properly handle refresh for view state management.

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
  user: Session["user"] | undefined;
  /** Project ID. */
  projectId: Project["rowId"];
}

/**
 * Project feedback.
 */
const ProjectFeedback = ({ user, projectId }: Props) => {
  const router = useRouter();

  const { viewState, setViewState } = useProjectViewStore(
    ({ viewState, setViewState }) => ({
      viewState,
      setViewState,
    }),
  );

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

  const {
    data: posts,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    ...infinitePostsOptions({
      projectId,
      userId: user?.rowId,
      excludedStatuses,
      orderBy,
      search,
    }),
    placeholderData: keepPreviousData,
    select: (data) =>
      data?.pages?.flatMap((page) => page?.posts?.nodes?.map((post) => post)),
  });

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
        },
        user: {
          rowId: user?.rowId ?? "",
          username: user?.username,
        },
        comments: {
          totalCount: 0,
        },
        commentsWithReplies: {
          totalCount: 0,
        },
        upvotes: {
          totalCount: 0,
        },
        userUpvotes: {
          nodes: [],
        },
        downvotes: {
          totalCount: 0,
        },
        userDownvotes: {
          nodes: [],
        },
      };
    },
  });

  const { isAdmin } = useOrganizationMembership({
    userId: user?.rowId,
    organizationId: posts?.[0]?.project?.organization?.rowId,
  });

  const { isOpen: isCreateFeedbackOpen, setIsOpen: setIsCreateFeedbackOpen } =
    useDialogStore({
      type: DialogType.CreateFeedback,
    });

  // debounced value is to allow for collapse animation to finish prior to changing maxH of scrollable container (prevent potential layout shit on larger viewports)
  const [debouncedIsCreateFeedbackOpen] = useDebounceValue({
    value: isCreateFeedbackOpen,
    delay: 250,
  });

  const { data: projectStatuses } = useProjectStatusesQuery(
    {
      projectId,
    },
    {
      enabled: isAdmin,
      select: (data) =>
        data?.postStatuses?.nodes.map((status) => ({
          rowId: status?.rowId,
          status: status?.status,
          color: status?.color,
        })),
    },
  );

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
    ...(posts ?? []),
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
      headerActions={
        <SwitchFeedbackView
          position={{ baseToSm: "absolute" }}
          right={{ baseToSm: 4 }}
        />
      }
      p={0}
      gap={2}
      pr={{ base: 4, sm: 6 }}
      pl={{ base: 4, sm: 6 }}
      pt={{ base: 4, sm: 6 }}
    >
      {user && (
        <Button
          position={{ base: undefined, sm: "absolute" }}
          size="sm"
          top={{ base: 4, sm: 6 }}
          right={{ base: 4, sm: 6 }}
          variant="outline"
          colorPalette="brand.primary"
          color="brand.primary"
          mt={{ base: 2, sm: 0 }}
          bgColor={{
            _hover: { base: "brand.primary.50", _dark: "brand.primary.950/30" },
          }}
          onClick={() => setIsCreateFeedbackOpen(!isCreateFeedbackOpen)}
        >
          {app.projectPage.projectFeedback.createFeedback.title}
        </Button>
      )}

      {/* NB: the margin is necessary to prevent clipping of the card borders/box shadows */}
      <Stack gap={0} position="relative" mb="1px">
        {user && <CreateFeedback user={user} />}

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
            columns={{ base: 1, lg: viewState === ViewState.List ? 1 : 2 }}
            maxH={
              isCreateFeedbackOpen || debouncedIsCreateFeedbackOpen
                ? "xl"
                : { base: "xl", md: "3xl" }
            }
            transitionDuration={isCreateFeedbackOpen ? "0ms" : "250ms"}
            transitionProperty="max-height"
            transitionTimingFunction="default"
            overflow="auto"
            scrollbar="hidden"
            // NB: the padding is necessary to prevent clipping of the card borders/box shadows
            p="1px"
          >
            {isLoading ? (
              <SkeletonArray count={5} h={21} />
            ) : allPosts.length ? (
              <>
                {allPosts.map((feedback) => {
                  const isPending = feedback?.rowId === "pending";

                  return (
                    <GridItem
                      key={feedback?.rowId}
                      colSpan={{ base: 1, lg: allPosts.length === 1 ? 2 : 1 }}
                    >
                      <FeedbackCard
                        user={user}
                        canManageFeedback={isAdmin}
                        feedback={feedback!}
                        projectStatuses={projectStatuses}
                        h="full"
                        w="full"
                        minH={21}
                        titleProps={
                          viewState === ViewState.Grid
                            ? {
                                // TODO: figure out how to expand this beyond line clamp of 2
                                lineClamp: 2,
                                overflow: "hidden",
                              }
                            : undefined
                        }
                        descriptionProps={
                          viewState === ViewState.Grid
                            ? {
                                // TODO: figure out how to expand this beyond line clamp of 2
                                lineClamp: 2,
                                overflow: "hidden",
                              }
                            : undefined
                        }
                        borderRadius="md"
                        bgColor="card-item"
                        cursor={isPending ? "not-allowed" : "pointer"}
                        _hover={{ boxShadow: "card" }}
                        onClick={() =>
                          !isPending
                            ? router.push(
                                `/organizations/${params.organizationSlug}/projects/${params.projectSlug}/${feedback?.rowId}`,
                              )
                            : undefined
                        }
                      />
                    </GridItem>
                  );
                })}

                <GridItem
                  colSpan={{
                    base: 1,
                    lg:
                      allPosts.length === 1 || viewState === ViewState.Grid
                        ? 2
                        : 1,
                  }}
                  my={5}
                >
                  <Flex justify="center">
                    {hasNextPage ? (
                      <Spinner ref={loaderRef} />
                    ) : (
                      <Text>{app.projectPage.projectFeedback.endOf}</Text>
                    )}
                  </Flex>
                </GridItem>
              </>
            ) : (
              <GridItem colSpan={viewState === ViewState.Grid ? 2 : 1}>
                <EmptyState
                  message={app.projectPage.projectFeedback.emptyState.message}
                  h="xs"
                  w="full"
                  mb={4}
                />
              </GridItem>
            )}
          </Grid>
        )}

        {!!allPosts.length && <GradientMask bottom={0} />}
      </Stack>
    </SectionContainer>
  );
};

export default ProjectFeedback;
