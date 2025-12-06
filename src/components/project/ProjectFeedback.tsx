import { createListCollection } from "@ark-ui/react";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Input,
  Select,
  Stack,
  Text,
} from "@omnidev/sigil";
import {
  keepPreviousData,
  useInfiniteQuery,
  useMutationState,
  useQuery,
} from "@tanstack/react-query";
import {
  useNavigate,
  useParams,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuPlus } from "react-icons/lu";
import useInfiniteScroll from "react-infinite-scroll-hook";

import GradientMask from "@/components/core/GradientMask";
import SkeletonArray from "@/components/core/SkeletonArray";
import Spinner from "@/components/core/Spinner";
import CreateFeedback from "@/components/feedback/CreateFeedback";
import FeedbackCard from "@/components/feedback/FeedbackCard";
import EmptyState from "@/components/layout/EmptyState";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import SectionContainer from "@/components/layout/SectionContainer";
import SwitchFeedbackView from "@/components/project/SwitchFeedbackView";
import { PostOrderBy, useCreateFeedbackMutation } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import useHandleSearch from "@/lib/hooks/useHandleSearch";
import useOrganizationMembership from "@/lib/hooks/useOrganizationMembership";
import {
  freeTierFeedbackOptions,
  infiniteFeedbackOptions,
} from "@/lib/options/feedback";
import { projectOptions, projectStatusesOptions } from "@/lib/options/projects";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";
import useProjectViewStore, {
  ViewState,
} from "@/lib/store/useProjectViewStore";

import type {
  CreateFeedbackMutationVariables,
  FeedbackFragment,
} from "@/generated/graphql";

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

/**
 * Project feedback.
 */
const ProjectFeedback = () => {
  const { session } = useRouteContext({
    from: "/_auth/organizations/$organizationSlug/_layout/projects/$projectSlug/",
  });
  const { organizationSlug, projectSlug } = useParams({
    from: "/_auth/organizations/$organizationSlug/_layout/projects/$projectSlug/",
  });
  const { excludedStatuses, search, orderBy } = useSearch({
    from: "/_auth/organizations/$organizationSlug/_layout/projects/$projectSlug/",
  });
  const navigate = useNavigate({
    from: "/organizations/$organizationSlug/projects/$projectSlug",
  });

  const { viewState } = useProjectViewStore(({ viewState }) => ({
    viewState,
  }));

  const { data: project } = useQuery({
    ...projectOptions({ organizationSlug, projectSlug }),
    select: (data) => data?.projects?.nodes?.[0],
  });

  const onSearchChange = useHandleSearch();

  const { data: canCreateFeedback } = useQuery(
    freeTierFeedbackOptions({
      organizationSlug,
      projectSlug,
    }),
  );

  const { data: defaultStatus } = useQuery({
    ...projectStatusesOptions({
      projectId: project?.rowId!,
      isDefault: true,
    }),
    enabled: !!project?.rowId,
    select: (data) => data?.postStatuses?.nodes?.[0],
  });

  const {
    data: posts,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    ...infiniteFeedbackOptions({
      projectId: project?.rowId!,
      excludedStatuses,
      orderBy: [orderBy, PostOrderBy.CreatedAtDesc],
      search,
      userId: session?.user?.rowId,
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
          rowId: session?.user?.rowId ?? "",
          username: session?.user?.username,
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
    userId: session?.user?.rowId,
    organizationId: posts?.[0]?.project?.organization?.rowId,
  });

  const { isOpen: isCreateFeedbackOpen, setIsOpen: setIsCreateFeedbackOpen } =
    useDialogStore({
      type: DialogType.CreateFeedback,
    });

  const { data: projectStatuses } = useQuery({
    ...projectStatusesOptions({
      projectId: project?.rowId!,
    }),
    enabled: isAdmin && !!project?.rowId,
    select: (data) =>
      data?.postStatuses?.nodes.map((status) => ({
        rowId: status?.rowId,
        status: status?.status,
        color: status?.color,
      })),
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
      {session && (
        <Button
          position={{ base: undefined, sm: "absolute" }}
          size="sm"
          top={{ base: 4, sm: 6 }}
          right={{ base: 4, sm: 6 }}
          variant="outline"
          colorPalette="brand.primary"
          color={{ base: "brand.primary", _disabled: "foreground.muted" }}
          mt={{ base: 2, sm: 0 }}
          bgColor={{
            _hover: {
              base: "brand.primary.50",
              _dark: "brand.primary.950/30",
              _disabled: "transparent",
            },
          }}
          opacity={{ _disabled: 0.5 }}
          onClick={() => setIsCreateFeedbackOpen(!isCreateFeedbackOpen)}
          // TODO: add tooltip for disabled state. Discuss copy
          disabled={!canCreateFeedback}
        >
          <Icon src={LuPlus} />

          {app.projectPage.projectFeedback.createFeedback.title}
        </Button>
      )}

      {/* NB: the margin is necessary to prevent clipping of the card borders/box shadows */}
      <Stack gap={0} position="relative" mb="1px">
        {!!session && <CreateFeedback />}

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
              const orderBy = value[0] as
                | PostOrderBy.CreatedAtDesc
                | PostOrderBy.UpvotesCountDesc
                | PostOrderBy.DownvotesCountDesc;

              navigate({
                search: (prev) => ({
                  ...prev,
                  orderBy,
                }),
              });
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
            maxH={isCreateFeedbackOpen ? "xl" : { base: "xl", md: "3xl" }}
            transitionDuration="250ms"
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
                            ? navigate({
                                to: "/organizations/$organizationSlug/projects/$projectSlug/$feedbackId",
                                params: {
                                  organizationSlug,
                                  projectSlug,
                                  feedbackId: feedback?.rowId!,
                                },
                              })
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
