import { createListCollection } from "@ark-ui/react";
import {
  keepPreviousData,
  useInfiniteQuery,
  useMutationState,
  useQuery,
} from "@tanstack/react-query";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { LuPlus } from "react-icons/lu";
import useInfiniteScroll from "react-infinite-scroll-hook";

import SkeletonArray from "@/components/core/SkeletonArray";
import Spinner from "@/components/core/Spinner";
import CreateFeedback from "@/components/feedback/CreateFeedback";
import FeedbackCard from "@/components/feedback/FeedbackCard";
import EmptyState from "@/components/layout/EmptyState";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import RoadmapBoard from "@/components/project/RoadmapBoard";
import StatusFilterPills from "@/components/project/StatusFilterPills";
import SwitchFeedbackView from "@/components/project/SwitchFeedbackView";
import TagFilterPills from "@/components/project/TagFilterPills";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SelectContent,
  SelectControl,
  SelectIndicator,
  SelectItem,
  SelectItemText,
  SelectPortal,
  SelectPositioner,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
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
import { buildFeedbackKey } from "@/lib/util/feedbackUrl";
import cn from "@/lib/utils";

import type {
  CreateFeedbackMutationVariables,
  FeedbackFragment,
} from "@/generated/graphql";

// TODO: figure out how to properly handle refresh for view state management.

const projectRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout/projects/$projectSlug/",
);

const SORT_BY_OPTIONS = [
  {
    label: "Top Voted",
    value: PostOrderBy.VotesCountDesc,
  },
  {
    label: "Most Recent",
    value: PostOrderBy.CreatedAtDesc,
  },
];

/**
 * Project feedback.
 */
const ProjectFeedback = () => {
  const { session, hasAdminPrivileges, organizationId } =
    projectRoute.useRouteContext();
  const { workspaceSlug, projectSlug } = projectRoute.useParams();
  const { excludedStatuses, tags, search, orderBy } = projectRoute.useSearch();
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
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    ...infiniteFeedbackOptions({
      projectId: projectId!,
      excludedStatuses,
      // default to top-voted when no explicit sort is chosen
      orderBy: [
        orderBy ?? PostOrderBy.VotesCountDesc,
        PostOrderBy.CreatedAtDesc,
      ],
      search,
      userId: session?.user?.rowId,
      tagFilter: tags.length ? { some: { tagId: { in: tags } } } : undefined,
    }),
    enabled: !!projectId,
    placeholderData: keepPreviousData,
    select: (data) =>
      data?.pages?.flatMap((page) => page?.posts?.nodes?.map((post) => post)),
  });

  // in roadmap mode, eagerly load all pages so every status column is complete
  useEffect(() => {
    if (viewState === ViewState.Roadmap && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [viewState, hasNextPage, isFetchingNextPage, fetchNextPage]);

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
        // number is assigned server-side by the post-number trigger; show a
        // placeholder until the optimistic post is replaced by the real one
        number: 0,
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
        attachments: {
          nodes: [],
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

  // ungated statuses for the roadmap columns (every viewer, not just admins)
  const { data: roadmapStatuses } = useQuery({
    ...projectStatusesOptions({
      organizationId,
    }),
    enabled: viewState === ViewState.Roadmap && !!organizationId,
    select: (data) =>
      data?.statusTemplates?.nodes.map((status) => ({
        rowId: status?.rowId,
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
    <div
      ref={rootRef}
      className="relative flex flex-col gap-5 overflow-visible border-0 bg-transparent p-0 sm:rounded-2xl sm:border sm:border-[var(--colors-neutral-200)] sm:bg-white sm:p-6 dark:sm:border-[var(--colors-neutral-800)] dark:sm:bg-[var(--colors-neutral-900)]"
    >
      {/* Toolbar Row */}
      <div className="flex flex-col items-stretch justify-between gap-3 md:flex-row md:items-center">
        {/* Left: Search */}
        <Input
          placeholder={app.projectPage.projectFeedback.search.placeholder}
          className="h-8 w-full border-border-subtle text-sm md:max-w-sm"
          defaultValue={search}
          onChange={onSearchChange}
        />

        {/* Right: Controls */}
        <div className="flex shrink-0 items-center justify-between gap-2 md:justify-end">
          <SelectRoot
            collection={createListCollection({ items: SORT_BY_OPTIONS })}
            defaultValue={orderBy ? [orderBy] : [PostOrderBy.VotesCountDesc]}
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
          >
            <SelectControl>
              <SelectTrigger className="h-8 min-w-36 border-border-subtle">
                <SelectValueText placeholder="Sort by" />
                <SelectIndicator />
              </SelectTrigger>
            </SelectControl>

            <SelectPortal>
              <SelectPositioner>
                <SelectContent className="w-[var(--reference-width)] min-w-0">
                  {SORT_BY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} item={option}>
                      <SelectItemText>{option.label}</SelectItemText>
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectPositioner>
            </SelectPortal>
          </SelectRoot>

          <SwitchFeedbackView />

          {session && (
            <Button
              size="sm"
              variant="solid"
              onClick={() => setIsCreateFeedbackOpen(!isCreateFeedbackOpen)}
              disabled={!canCreateFeedback}
            >
              <LuPlus />
              <span className="hidden sm:flex">
                {app.projectPage.projectFeedback.createPost.title}
              </span>
            </Button>
          )}
        </div>
      </div>

      {/* Status Filter Pills (hidden in roadmap; the columns are the statuses) */}
      {viewState !== ViewState.Roadmap && <StatusFilterPills />}

      {/* Tag Filter Pills (filter the underlying posts; shown in every view) */}
      <TagFilterPills />

      {/* Create Feedback Form */}
      {!!session && <CreateFeedback />}

      {/* Feedback List / Roadmap */}
      {isError ? (
        <ErrorBoundary message="Error fetching feedback" className="h-96" />
      ) : viewState === ViewState.Roadmap ? (
        isLoading || !roadmapStatuses?.length ? (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {Array.from({ length: 4 }).map((_, columnIndex) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: fixed skeleton columns
                key={columnIndex}
                className="flex w-72 shrink-0 flex-col gap-3"
              >
                <SkeletonArray count={3} className="h-[5.25rem]" />
              </div>
            ))}
          </div>
        ) : (
          <RoadmapBoard
            posts={allPosts.filter(
              (post): post is FeedbackFragment => post?.rowId !== "pending",
            )}
            statuses={roadmapStatuses}
            canManageFeedback={hasAdminPrivileges}
            projectStatuses={projectStatuses}
            onSelectPost={(post) =>
              navigate({
                to: "/workspaces/$workspaceSlug/projects/$projectSlug/$feedbackId",
                params: {
                  workspaceSlug,
                  projectSlug,
                  feedbackId: buildFeedbackKey({
                    number: post.number!,
                    title: post.title,
                  }),
                },
              })
            }
          />
        )
      ) : (
        <div
          className={cn(
            "grid grid-cols-1",
            // list view goes edge-to-edge with dividers (no gap) on mobile; grid
            // view keeps gaps. both restore gaps on larger screens
            viewState === ViewState.List
              ? "gap-0 divide-y divide-border-subtle sm:gap-3 sm:divide-y-0 md:grid-cols-1"
              : "gap-3 md:grid-cols-2",
          )}
        >
          {isLoading ? (
            <SkeletonArray count={5} className="h-[5.25rem]" />
          ) : allPosts.length ? (
            <>
              {allPosts.map((feedback, index) => {
                const isPending = feedback?.rowId === "pending";

                return (
                  <div
                    key={feedback?.rowId}
                    className={cn(
                      "col-span-1",
                      allPosts.length === 1 && "md:col-span-2",
                    )}
                  >
                    <FeedbackCard
                      canManageFeedback={hasAdminPrivileges}
                      feedback={feedback!}
                      projectStatuses={projectStatuses}
                      index={viewState === ViewState.List ? index : undefined}
                      className={cn(
                        "h-full min-h-[5.25rem] w-full bg-[var(--colors-card-item)]",
                        // in list view, cards are flush (no rounding/bg) on mobile so
                        // the dividers read as one continuous feed; restored at sm+
                        viewState === ViewState.List
                          ? "rounded-none bg-transparent sm:rounded-xl sm:bg-[var(--colors-card-item)]"
                          : "rounded-xl",
                        isPending ? "cursor-not-allowed" : "cursor-pointer",
                      )}
                      titleProps={
                        viewState === ViewState.Grid
                          ? { className: "line-clamp-2 overflow-hidden" }
                          : undefined
                      }
                      descriptionProps={
                        viewState === ViewState.Grid
                          ? { className: "line-clamp-2 overflow-hidden" }
                          : undefined
                      }
                      onClick={() =>
                        !isPending
                          ? navigate({
                              to: "/workspaces/$workspaceSlug/projects/$projectSlug/$feedbackId",
                              params: {
                                workspaceSlug,
                                projectSlug,
                                feedbackId: buildFeedbackKey({
                                  number: feedback?.number!,
                                  title: feedback?.title,
                                }),
                              },
                            })
                          : undefined
                      }
                    />
                  </div>
                );
              })}

              {hasNextPage && (
                <div
                  className={cn(
                    "col-span-1 my-5",
                    (allPosts.length === 1 || viewState === ViewState.Grid) &&
                      "md:col-span-2",
                  )}
                >
                  <div className="flex justify-center">
                    <Spinner ref={loaderRef} />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div
              className={
                viewState === ViewState.Grid ? "col-span-2" : "col-span-1"
              }
            >
              <EmptyState
                message={app.projectPage.projectFeedback.emptyState.message}
                className="h-80 w-full"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectFeedback;
