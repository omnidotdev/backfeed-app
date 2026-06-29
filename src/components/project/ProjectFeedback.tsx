import { createListCollection } from "@ark-ui/react";
import { Kbd } from "@omnidotdev/thornberry/kbd";
import {
  keepPreviousData,
  useInfiniteQuery,
  useMutationState,
  useQuery,
} from "@tanstack/react-query";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { LuPlus } from "react-icons/lu";
import useInfiniteScroll from "react-infinite-scroll-hook";

import SkeletonArray from "@/components/core/SkeletonArray";
import Spinner from "@/components/core/Spinner";
import CreateFeedback from "@/components/feedback/CreateFeedback";
import FeedbackCard from "@/components/feedback/FeedbackCard";
import EmptyState from "@/components/layout/EmptyState";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import RoadmapBoard from "@/components/project/RoadmapBoard";
import SavedViews from "@/components/project/SavedViews";
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
import { Hotkeys, hotkeyLabel } from "@/lib/constants/hotkeys.constant";
import { isStatusOnRoadmap } from "@/lib/constants/roadmap.constant";
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
    value: PostOrderBy.VotesSumWeightDesc,
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
  const cycleViewState = useProjectViewStore((state) => state.cycleViewState);

  const searchRef = useRef<HTMLInputElement>(null);

  const { data: project } = useQuery({
    ...projectOptions({
      organizationId,
      projectSlug,
    }),
    select: (data) => data?.projects?.nodes?.[0],
  });

  const onSearchChange = useHandleSearch();

  // live search text, used to filter the list client-side on every keystroke
  // while useHandleSearch debounces the actual query. Kept in sync when the
  // route search changes externally (e.g. a saved view applies a search)
  const [searchInput, setSearchInput] = useState(search);
  useEffect(() => {
    setSearchInput(search);
  }, [search]);

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
        orderBy ?? PostOrderBy.VotesSumWeightDesc,
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
        postTags: {
          nodes: [],
        },
      } as FeedbackFragment;
    });
  }, [pendingMutations, defaultStatus, project, session, organizationId]);

  const { setIsOpen: setIsCreateFeedbackOpen } = useDialogStore({
    type: DialogType.CreatePost,
  });

  // signed-out users open the composer too; the dialog persists their draft and
  // routes them to sign-in on submit, so nothing is lost
  const onCreatePost = () => setIsCreateFeedbackOpen(true);

  // "C" opens the create-feedback dialog (ignored while typing in a field). only
  // gate on the free-tier limit once signed in
  useHotkeys(
    Hotkeys.CreatePost,
    () => (!session || canCreateFeedback) && setIsCreateFeedbackOpen(true),
    { preventDefault: true },
    [session, canCreateFeedback, setIsCreateFeedbackOpen],
  );

  // "V" cycles the board view (ignored while typing in a field)
  useHotkeys(
    Hotkeys.CycleView,
    () => cycleViewState(),
    { preventDefault: true },
    [cycleViewState],
  );

  // "/" focuses the feedback search (ignored while already typing in a field)
  useHotkeys(
    Hotkeys.FocusSearch,
    () => searchRef.current?.focus(),
    { preventDefault: true },
    [],
  );

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
      data?.statusTemplates?.nodes
        // curate the roadmap (explicit flag overrides the default heuristic)
        .filter((status) =>
          isStatusOnRoadmap({
            name: status?.name,
            showOnRoadmap: status?.showOnRoadmap,
          }),
        )
        .map((status) => ({
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

  // optimistically apply the status, search, and tag filters client-side so the
  // list updates on click/keystroke instead of lingering on the stale
  // keepPreviousData list until the refetch returns. Mirrors the server filters:
  // hide excluded statuses (always keep status-less posts), match the search
  // against the title only, and require any of the selected tags
  const searchQuery = searchInput.trim().toLowerCase();

  const visiblePosts = (posts ?? []).filter((post) => {
    const displayName = post?.statusTemplate?.displayName;
    if (displayName && excludedStatuses.includes(displayName)) return false;
    if (searchQuery && !post?.title?.toLowerCase().includes(searchQuery))
      return false;
    if (tags.length) {
      const postTagIds = new Set(
        (post?.postTags?.nodes ?? []).map((node) => node?.tag?.rowId),
      );
      if (!tags.some((tagId) => postTagIds.has(tagId))) return false;
    }
    return true;
  });

  const allPosts = [
    ...(showPendingFeedback
      ? pendingFeedback.filter((feedback) =>
          feedback.title?.toLowerCase().includes(searchQuery),
        )
      : []),
    ...visiblePosts,
  ];

  const [loaderRef, { rootRef }] = useInfiniteScroll({
    // include the next-page fetch so the hook knows a load is in progress and
    // doesn't sit on a stuck spinner / spam onLoadMore
    loading: isLoading || isFetchingNextPage,
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
          ref={searchRef}
          placeholder={app.projectPage.projectFeedback.search.placeholder}
          className="w-full md:max-w-sm"
          value={searchInput}
          onChange={(event) => {
            setSearchInput(event.target.value);
            onSearchChange(event);
          }}
        />

        {/* Right: Controls */}
        <div className="flex shrink-0 items-center justify-between gap-2 md:justify-end">
          <SelectRoot
            collection={createListCollection({ items: SORT_BY_OPTIONS })}
            defaultValue={
              orderBy ? [orderBy] : [PostOrderBy.VotesSumWeightDesc]
            }
            onValueChange={({ value }) => {
              const orderBy = value[0] as
                | PostOrderBy.CreatedAtDesc
                | PostOrderBy.VotesSumWeightDesc;

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

          <SavedViews />

          <SwitchFeedbackView />

          <Button
            size="sm"
            variant="solid"
            onClick={onCreatePost}
            // signed-out users keep an enabled button (it routes to sign-in);
            // only gate it on the create limit once signed in
            disabled={!!session && !canCreateFeedback}
            // on mobile the FAB owns this action, so hide the toolbar button to
            // avoid two "+" affordances doing the same thing
            className="hidden sm:inline-flex"
          >
            <LuPlus />
            <span>{app.projectPage.projectFeedback.createPost.title}</span>
            {session && (
              <Kbd className="ml-1 hidden border-current/30 bg-transparent text-current/80 sm:inline-flex">
                {hotkeyLabel(Hotkeys.CreatePost)}
              </Kbd>
            )}
          </Button>
        </div>
      </div>

      {/* Status Filter Pills (hidden in roadmap; the columns are the statuses) */}
      {viewState !== ViewState.Roadmap && <StatusFilterPills />}

      {/* Tag Filter Pills (filter the underlying posts; shown in every view) */}
      <TagFilterPills />

      {/* Create Feedback dialog (rendered for everyone; opened via the toolbar
          button, mobile FAB, or "C" hotkey) */}
      <CreateFeedback />

      {/* Mobile create FAB: the toolbar button is hidden on small screens, so
          the FAB is the sole add-post affordance here (desktop keeps the labeled
          toolbar button). Shown to signed-out users too; it opens the composer
          rather than being hidden. */}
      <Button
        size="icon"
        variant="solid"
        aria-label={app.projectPage.projectFeedback.createPost.title}
        onClick={onCreatePost}
        disabled={!!session && !canCreateFeedback}
        className="fixed right-5 bottom-5 z-40 size-14 rounded-full shadow-lg sm:hidden"
      >
        <LuPlus className="size-6" />
      </Button>

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
            // inline view carries the page header + tabs + filters above, so the
            // board gets a shorter height than the dedicated roadmap route (sm+
            // only; mobile flows naturally so cards aren't crammed)
            className="sm:h-[calc(100svh-20rem)]"
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
