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
import { useMemo } from "react";
import { LuPlus } from "react-icons/lu";
import useInfiniteScroll from "react-infinite-scroll-hook";

import SkeletonArray from "@/components/core/SkeletonArray";
import Spinner from "@/components/core/Spinner";
import CreateFeedback from "@/components/feedback/CreateFeedback";
import FeedbackCard from "@/components/feedback/FeedbackCard";
import EmptyState from "@/components/layout/EmptyState";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import StatusFilterPills from "@/components/project/StatusFilterPills";
import SwitchFeedbackView from "@/components/project/SwitchFeedbackView";
import { PostOrderBy, useCreateFeedbackMutation } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import useHandleSearch from "@/lib/hooks/useHandleSearch";
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
    label: "Total Votes",
    value: PostOrderBy.VotesCountDesc,
  },
];

/**
 * Project feedback.
 */
const ProjectFeedback = () => {
  const { session, hasAdminPrivileges, organizationId } = useRouteContext({
    from: "/_public/workspaces/$workspaceSlug/_layout/projects/$projectSlug/",
  });
  const { workspaceSlug, projectSlug } = useParams({
    from: "/_public/workspaces/$workspaceSlug/_layout/projects/$projectSlug/",
  });
  const { excludedStatuses, search, orderBy } = useSearch({
    from: "/_public/workspaces/$workspaceSlug/_layout/projects/$projectSlug/",
  });
  const navigate = useNavigate({
    from: "/workspaces/$workspaceSlug/projects/$projectSlug",
  });

  const viewState = useProjectViewStore((state) => state.viewState);

  const { data: project } = useQuery({
    ...projectOptions({
      organizationId,
      projectSlug,
    }),
    select: (data) => data?.projects?.nodes?.[0],
  });

  const onSearchChange = useHandleSearch();

  const { data: canCreateFeedback } = useQuery(
    freeTierFeedbackOptions({
      organizationId,
      projectSlug,
    }),
  );

  const { data: defaultStatus } = useQuery({
    ...projectStatusesOptions({
      organizationId,
    }),
    enabled: !!organizationId,
    select: (data) => {
      // find the default status from project status configs, or fall back to first template
      const templates = data?.statusTemplates?.nodes;
      const configs = data?.projectStatusConfigs?.nodes;
      const defaultConfig = configs?.find((c) => c?.isDefault);
      if (defaultConfig) {
        return templates?.find(
          (t) => t?.rowId === defaultConfig.statusTemplateId,
        );
      }
      return templates?.[0];
    },
  });

  const projectId = project?.rowId;

  const {
    data: posts,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    ...infiniteFeedbackOptions({
      projectId: projectId!,
      excludedStatuses,
      orderBy: [orderBy, PostOrderBy.CreatedAtDesc],
      search,
      userId: session?.user?.rowId,
    }),
    enabled: !!projectId,
    placeholderData: keepPreviousData,
    select: (data) =>
      data?.pages?.flatMap((page) => page?.posts?.nodes?.map((post) => post)),
  });

  const pendingMutations = useMutationState({
    filters: {
      mutationKey: useCreateFeedbackMutation.getKey(),
      status: "pending",
    },
    select: (mutation) =>
      mutation.state.variables as CreateFeedbackMutationVariables,
  });

  const pendingFeedback = useMemo(() => {
    if (!defaultStatus) return [];

    return pendingMutations.map((variables) => {
      const now = new Date();

      return {
        rowId: "pending",
        number: variables.input.post.number,
        title: variables.input.post.title,
        description: variables.input.post.description,
        statusUpdatedAt: now,
        createdAt: now,
        updatedAt: now,
        statusTemplate: defaultStatus,
        project: {
          rowId: variables.input.post.projectId,
          name: project?.name ?? "pending",
          slug: project?.slug ?? "pending",
          prefix: project?.prefix ?? "",
          organizationId: project?.organizationId ?? organizationId,
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
      } as FeedbackFragment;
    });
  }, [pendingMutations, defaultStatus, project, session, organizationId]);

  const { isOpen: isCreateFeedbackOpen, setIsOpen: setIsCreateFeedbackOpen } =
    useDialogStore({
      type: DialogType.CreatePost,
    });

  const { data: projectStatuses } = useQuery({
    ...projectStatusesOptions({
      organizationId,
    }),
    enabled: hasAdminPrivileges && !!organizationId,
    select: (data) =>
      data?.statusTemplates?.nodes.map((status) => ({
        rowId: status?.rowId,
        name: status?.name,
        displayName: status?.displayName,
        color: status?.color,
      })),
  });

  // NB: we condition displaying the pending feedback to limit jumpy behavior with optimistic updates. Dependent on the filters provided for the posts query.
  const showPendingFeedback =
    defaultStatus &&
    !excludedStatuses.includes(defaultStatus.name!) &&
    !orderBy;

  const allPosts = [
    ...(showPendingFeedback
      ? pendingFeedback.filter((feedback) =>
          // NB: search filter is a bit different than the others. If `showPendingFeedback` is true, we only want to optimistically add feedback that would be included with the search
          feedback.title
            ?.toLowerCase()
            .includes(search.toLowerCase()),
        )
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
    <Stack
      ref={rootRef}
      position="relative"
      borderRadius="2xl"
      borderWidth="1px"
      borderColor={{ base: "neutral.200", _dark: "neutral.800" }}
      bgColor={{ base: "white", _dark: "neutral.900" }}
      overflow="visible"
      p={{ base: 4, sm: 6 }}
      gap={5}
    >
      {/* Toolbar Row */}
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "stretch", md: "center" }}
        justify="space-between"
        gap={3}
      >
        {/* Left: Search */}
        <Input
          placeholder={app.projectPage.projectFeedback.search.placeholder}
          borderColor="border.subtle"
          onChange={onSearchChange}
          maxW={{ base: "full", md: "sm" }}
          size="sm"
        />

        {/* Right: Controls */}
        <Flex
          align="center"
          gap={2}
          justify={{ base: "space-between", md: "flex-end" }}
          flexShrink={0}
        >
          <Select
            w={{ base: "auto", sm: "auto" }}
            minW={36}
            size="sm"
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
                | PostOrderBy.VotesCountDesc;

              navigate({
                search: (prev) => ({
                  ...prev,
                  orderBy,
                }),
              });
            }}
          />

          <SwitchFeedbackView />

          {session && (
            <Button
              size="sm"
              variant="solid"
              onClick={() => setIsCreateFeedbackOpen(!isCreateFeedbackOpen)}
              disabled={!canCreateFeedback}
            >
              <Icon src={LuPlus} />
              <Flex display={{ base: "none", sm: "flex" }}>
                {app.projectPage.projectFeedback.createPost.title}
              </Flex>
            </Button>
          )}
        </Flex>
      </Flex>

      {/* Status Filter Pills */}
      <StatusFilterPills />

      {/* Create Feedback Form */}
      {!!session && <CreateFeedback />}

      {/* Feedback List */}
      {isError ? (
        <ErrorBoundary message="Error fetching feedback" h="sm" />
      ) : (
        <Grid
          gap={3}
          columns={{ base: 1, md: viewState === ViewState.List ? 1 : 2 }}
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
                    colSpan={{ base: 1, md: allPosts.length === 1 ? 2 : 1 }}
                  >
                    <FeedbackCard
                      canManageFeedback={hasAdminPrivileges}
                      feedback={feedback!}
                      projectStatuses={projectStatuses}
                      h="full"
                      w="full"
                      minH={21}
                      titleProps={
                        viewState === ViewState.Grid
                          ? {
                              lineClamp: 2,
                              overflow: "hidden",
                            }
                          : undefined
                      }
                      descriptionProps={
                        viewState === ViewState.Grid
                          ? {
                              lineClamp: 2,
                              overflow: "hidden",
                            }
                          : undefined
                      }
                      borderRadius="xl"
                      bgColor="card-item"
                      cursor={isPending ? "not-allowed" : "pointer"}
                      onClick={() =>
                        !isPending
                          ? navigate({
                              to: "/workspaces/$workspaceSlug/projects/$projectSlug/$feedbackId",
                              params: {
                                workspaceSlug,
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

              {hasNextPage && (
                <GridItem
                  colSpan={{
                    base: 1,
                    md:
                      allPosts.length === 1 || viewState === ViewState.Grid
                        ? 2
                        : 1,
                  }}
                  my={5}
                >
                  <Flex justify="center">
                    <Spinner ref={loaderRef} />
                  </Flex>
                </GridItem>
              )}
            </>
          ) : (
            <GridItem colSpan={viewState === ViewState.Grid ? 2 : 1}>
              <EmptyState
                message={app.projectPage.projectFeedback.emptyState.message}
                h="xs"
                w="full"
              />
            </GridItem>
          )}
        </Grid>
      )}
    </Stack>
  );
};

export default ProjectFeedback;
