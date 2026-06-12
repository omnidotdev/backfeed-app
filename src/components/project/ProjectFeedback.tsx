import { createListCollection } from "@ark-ui/react";
import {
  keepPreviousData,
  useInfiniteQuery,
  useMutationState,
  useQuery,
} from "@tanstack/react-query";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
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
  const { session, hasAdminPrivileges, organizationId } =
    projectRoute.useRouteContext();
  const { workspaceSlug, projectSlug } = projectRoute.useParams();
  const { excludedStatuses, search, orderBy } = projectRoute.useSearch();
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
      className="relative flex flex-col gap-5 overflow-visible rounded-2xl border border-[var(--colors-neutral-200)] bg-white p-4 sm:p-6 dark:border-[var(--colors-neutral-800)] dark:bg-[var(--colors-neutral-900)]"
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
          >
            <SelectControl>
              <SelectTrigger className="h-8 min-w-36 border-border-subtle">
                <SelectValueText placeholder="Sort by" />
                <SelectIndicator />
              </SelectTrigger>
            </SelectControl>

            <SelectPortal>
              <SelectPositioner>
                <SelectContent>
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

      {/* Status Filter Pills */}
      <StatusFilterPills />

      {/* Create Feedback Form */}
      {!!session && <CreateFeedback />}

      {/* Feedback List */}
      {isError ? (
        <ErrorBoundary message="Error fetching feedback" className="h-96" />
      ) : (
        <div
          className={cn(
            "grid grid-cols-1 gap-3",
            viewState === ViewState.List ? "md:grid-cols-1" : "md:grid-cols-2",
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
                      className={`h-full min-h-[5.25rem] w-full rounded-xl bg-[var(--colors-card-item)] ${
                        isPending ? "cursor-not-allowed" : "cursor-pointer"
                      }`}
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
