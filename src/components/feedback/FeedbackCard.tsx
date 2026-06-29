import { Format, Portal } from "@ark-ui/react";
import { RichTextContent } from "@omnidotdev/thornberry/rich-text-editor";
import {
  useNavigate,
  useParams,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import dayjs from "dayjs";
import { LuCheck, LuChevronDown, LuMessageCircle } from "react-icons/lu";

import DestructiveAction from "@/components/core/DestructiveAction";
import StatusBadge from "@/components/core/StatusBadge";
import AttachmentGallery from "@/components/feedback/AttachmentGallery";
import FeedbackKey from "@/components/feedback/FeedbackKey";
import TagBadge from "@/components/feedback/TagBadge";
import TagPicker from "@/components/feedback/TagPicker";
import UpdateFeedback from "@/components/feedback/UpdateFeedback";
import VotingButtons from "@/components/feedback/VotingButtons";
import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
} from "@/components/ui/avatar";
import {
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuPositioner,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import {
  VoteType,
  useDeletePostMutation,
  useUpdatePostMutation,
} from "@/generated/graphql";
import app from "@/lib/config/app.config";
import {
  feedbackByIdOptions,
  infiniteFeedbackOptions,
} from "@/lib/options/feedback";
import {
  projectMetricsOptions,
  statusBreakdownOptions,
} from "@/lib/options/projects";
import { statusTimelineQueryKey } from "@/lib/options/statusTimeline";
import useStatusMenuStore from "@/lib/store/useStatusMenuStore";
import { linkifyIssueRefsHtml } from "@/lib/util/issueRefs";
import stripHtml from "@/lib/util/stripHtml";
import cn from "@/lib/utils";

import type { InfiniteData } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import type {
  FeedbackByIdQuery,
  FeedbackFragment,
  PostOrderBy,
  PostsQuery,
  StatusTemplate,
} from "@/generated/graphql";

interface ProjectStatus {
  /** Status template row ID. */
  rowId: StatusTemplate["rowId"] | undefined;
  /** Status template name. */
  name: StatusTemplate["name"] | undefined;
  /** Status template display name. */
  displayName: StatusTemplate["displayName"] | undefined;
  /** Status template color. */
  color: StatusTemplate["color"];
}

interface Props extends ComponentProps<"div"> {
  /** Whether the user has permission to manage statuses or delete feedback. */
  canManageFeedback: boolean;
  /** Feedback details. */
  feedback: Partial<FeedbackFragment>;
  /** Project status options. */
  projectStatuses?: ProjectStatus[];
  /** Title props. */
  titleProps?: ComponentProps<"span">;
  /** Description props. */
  descriptionProps?: ComponentProps<"p">;
  /** Whether the user is authenticated. */
  isAuthenticated?: boolean;
  /** Whether to disable hover styles (e.g., on detail page). */
  disableHover?: boolean;
  /** Hide the status badge (e.g., on the roadmap, where the column conveys status). */
  hideStatus?: boolean;
  /** Compact mode for dense boards (roadmap): trims meta, drops description/attachments/actions. */
  compact?: boolean;
  /** Index for alternating row backgrounds in list view. */
  index?: number;
}

/**
 * Feedback card.
 */
const FeedbackCard = ({
  canManageFeedback,
  feedback,
  projectStatuses,
  titleProps,
  descriptionProps,
  isAuthenticated: isAuthenticatedProp,
  disableHover,
  hideStatus,
  compact,
  index,
  className,
  ...rest
}: Props) => {
  const { session, queryClient } = useRouteContext({
    from: "__root__",
  });

  // Use prop if provided, otherwise derive from session existence
  const isAuthenticated = isAuthenticatedProp ?? !!session;
  const {
    workspaceSlug,
    projectSlug,
    feedbackId: isFeedbackRoute,
  } = useParams({ strict: false });
  const { excludedStatuses, search, orderBy } = useSearch({ strict: false });
  const navigate = useNavigate();

  const { isStatusMenuOpen, setIsStatusMenuOpen } = useStatusMenuStore(
    ({ isStatusMenuOpen, setIsStatusMenuOpen }) => ({
      isStatusMenuOpen,
      setIsStatusMenuOpen,
    }),
  );

  const { mutate: deletePost, isPending: isDeleteFeedbackPending } =
    useDeletePostMutation({
      onSettled: () =>
        Promise.all([
          queryClient.invalidateQueries({ queryKey: ["Posts.infinite"] }),
          queryClient.invalidateQueries({
            queryKey: statusBreakdownOptions({
              projectId: feedback?.project?.rowId!,
            }).queryKey,
          }),
          queryClient.invalidateQueries({
            queryKey: projectMetricsOptions({
              projectId: feedback?.project?.rowId!,
            }).queryKey,
          }),
        ]),
      onSuccess: () => {
        // Remove the deleted post from every cached feedback list immediately,
        // regardless of that list's variables (sort/filter/search), so it
        // disappears without waiting for a refetch. The exact-key invalidation
        // above could miss the active list when its variables differ.
        queryClient.setQueriesData<InfiniteData<PostsQuery>>(
          { queryKey: ["Posts.infinite"] },
          (old) =>
            old
              ? {
                  ...old,
                  pages: old.pages.map((page) => ({
                    ...page,
                    posts: page.posts
                      ? {
                          ...page.posts,
                          nodes: page.posts.nodes?.filter(
                            (node) => node?.rowId !== feedback.rowId,
                          ),
                        }
                      : page.posts,
                  })),
                }
              : old,
        );

        if (isFeedbackRoute) {
          navigate({
            to: "/workspaces/$workspaceSlug/projects/$projectSlug",
            params: {
              workspaceSlug: workspaceSlug!,
              projectSlug: projectSlug!,
            },
          });
        }
      },
    });

  const { mutate: updateStatus, isPending: isUpdateStatusPending } =
    useUpdatePostMutation({
      onMutate: (variables) => {
        const feedbackSnapshot = queryClient?.getQueryData(
          feedbackByIdOptions({
            rowId: feedback.rowId!,
            userId: session?.user?.rowId,
          }).queryKey,
        ) as FeedbackByIdQuery;

        const postsQueryKey = infiniteFeedbackOptions({
          projectId: feedback.project?.rowId!,
          excludedStatuses,
          orderBy: orderBy ? (orderBy as PostOrderBy) : undefined,
          search,
          userId: session?.user?.rowId,
        }).queryKey;

        const postsSnapshot = queryClient?.getQueryData(
          postsQueryKey,
        ) as InfiniteData<PostsQuery>;

        const updatedStatus = projectStatuses?.find(
          (status) => status.rowId === variables.patch.statusTemplateId,
        );

        if (feedbackSnapshot) {
          queryClient.setQueryData(
            feedbackByIdOptions({
              rowId: feedback.rowId!,
              userId: session?.user?.rowId,
            }).queryKey,
            {
              post: {
                ...feedbackSnapshot.post!,
                statusUpdatedAt:
                  variables.patch.statusUpdatedAt ??
                  feedbackSnapshot.post!.statusUpdatedAt,
                statusTemplate: {
                  ...feedbackSnapshot.post?.statusTemplate!,
                  rowId:
                    updatedStatus?.rowId ??
                    feedbackSnapshot.post?.statusTemplate?.rowId!,
                  name:
                    updatedStatus?.name ??
                    feedbackSnapshot.post?.statusTemplate?.name!,
                  displayName: updatedStatus?.displayName!,
                  color: updatedStatus?.color,
                },
              },
            },
          );
        }

        if (postsSnapshot) {
          queryClient.setQueryData(postsQueryKey, {
            ...postsSnapshot,
            // @ts-expect-error TODO: strongly type
            pages: postsSnapshot.pages.map((page) => ({
              ...page,
              posts: {
                ...page.posts,
                nodes: page.posts?.nodes?.map((post) => {
                  if (post?.rowId === variables.rowId) {
                    return {
                      ...post,
                      statusUpdatedAt: variables.patch.statusUpdatedAt,
                      statusTemplate: {
                        ...post?.statusTemplate,
                        rowId: updatedStatus?.rowId,
                        name: updatedStatus?.name,
                        displayName: updatedStatus?.displayName,
                        color: updatedStatus?.color,
                      },
                    };
                  }

                  return post;
                }),
              },
            })),
          });
        }
      },
      onSettled: async () =>
        Promise.all([
          queryClient.invalidateQueries({ queryKey: ["Posts.infinite"] }),

          queryClient.invalidateQueries({
            queryKey: statusBreakdownOptions({
              projectId: feedback.project?.rowId!,
            }).queryKey,
          }),

          queryClient.invalidateQueries({
            queryKey: feedbackByIdOptions({
              rowId: feedback.rowId!,
              userId: session?.user?.rowId,
            }).queryKey,
          }),

          queryClient.invalidateQueries({
            queryKey: statusTimelineQueryKey(feedback.rowId!),
          }),
        ]),
    });

  // get user's vote from the unified votes
  const userUpvoteNode = session ? feedback?.userUpvotes?.nodes[0] : null;
  const userDownvoteNode = session ? feedback?.userDownvotes?.nodes[0] : null;
  const userVote = userUpvoteNode
    ? { rowId: userUpvoteNode.rowId, voteType: VoteType.Up }
    : userDownvoteNode
      ? { rowId: userDownvoteNode.rowId, voteType: VoteType.Down }
      : null;

  const totalUpvotes = feedback?.upvotes?.totalCount ?? 0;
  const totalDownvotes = feedback?.downvotes?.totalCount ?? 0;

  const isAuthor = session?.user?.rowId === feedback.user?.rowId;

  const canAdjustFeedback = isAuthor || canManageFeedback;

  const isFeedbackPending = feedback.rowId === "pending";

  const actionIsPending = isFeedbackPending || isDeleteFeedbackPending;

  // tags assigned to the post, shown read-only on the card (full and roadmap)
  const tags = (feedback.postTags?.nodes ?? [])
    .map((node) => node?.tag)
    .filter((tag): tag is NonNullable<typeof tag> => Boolean(tag));

  // Alternating background for odd rows (when index is provided)
  const hasAlternatingBg =
    index !== undefined && index % 2 === 1 && !disableHover;

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: card-level navigation with interactive children
    // biome-ignore lint/a11y/useKeyWithClickEvents: card-level navigation with interactive children
    <div
      className={cn(
        "relative flex items-start gap-2 rounded-xl p-4",
        // normalize roadmap cards to a consistent height so columns look flush
        compact && "min-h-[4.75rem]",
        actionIsPending && "opacity-50",
        hasAlternatingBg &&
          "bg-[var(--colors-neutral-50)] dark:bg-[var(--colors-neutral-900)]/50",
        !disableHover &&
          "transition-all hover:bg-[var(--colors-neutral-100)] dark:hover:bg-[var(--colors-neutral-800)]",
        className,
      )}
      {...rest}
      onClick={!isStatusMenuOpen ? rest.onClick : undefined}
    >
      {/* Voting buttons on the left */}
      <VotingButtons
        feedbackId={feedback.rowId!}
        projectId={feedback?.project?.rowId!}
        userVote={userVote}
        totalUpvotes={totalUpvotes}
        totalDownvotes={totalDownvotes}
        isFeedbackRoute={!!isFeedbackRoute}
        isAuthenticated={isAuthenticated}
        userId={session?.user?.rowId ?? undefined}
      />

      {/* Content on the right */}
      <div className="flex h-full w-full flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span
              {...titleProps}
              className={cn(
                "break-words font-semibold text-base leading-[1.3] md:text-lg",
                titleProps?.className,
              )}
            >
              {feedback.title}
            </span>

            {/* full cards: the copyable key under the title (the author moves to
                the bottom meta row, with the date). dense (roadmap) cards move
                the key + count to a bottom-pinned row (below). */}
            {!compact && (
              <div className="flex min-w-0 items-center gap-2 text-foreground-subtle text-xs leading-none">
                <FeedbackKey
                  className="shrink-0 leading-none"
                  prefix={feedback.project?.prefix}
                  number={feedback.number}
                />
              </div>
            )}
          </div>

          <MenuRoot
            onOpenChange={({ open }) =>
              open ? setIsStatusMenuOpen(true) : undefined
            }
            onExitComplete={() => setIsStatusMenuOpen(false)}
            positioning={{ strategy: "fixed" }}
          >
            <MenuTrigger
              asChild
              disabled={
                !canManageFeedback || actionIsPending || isUpdateStatusPending
              }
            >
              <StatusBadge
                status={feedback.statusTemplate!}
                className={cn(
                  canManageFeedback ? "cursor-pointer" : "cursor-default",
                  // the roadmap column already conveys status; hide the badge there
                  hideStatus && "hidden",
                )}
                onClick={(evt) => evt.stopPropagation()}
              >
                {canManageFeedback && <LuChevronDown />}
              </StatusBadge>
            </MenuTrigger>

            <Portal>
              <MenuPositioner>
                <MenuContent>
                  <MenuItemGroup>
                    {projectStatuses?.map((status) => (
                      <MenuItem
                        key={status.rowId}
                        value={status.rowId!}
                        className="flex items-center justify-between"
                        style={
                          status.color ? { color: status.color } : undefined
                        }
                        onClick={() =>
                          updateStatus({
                            rowId: feedback.rowId!,
                            patch: {
                              statusTemplateId: status.rowId!,
                              statusUpdatedAt: new Date(),
                            },
                          })
                        }
                      >
                        {status.displayName}

                        {status.rowId === feedback.statusTemplate?.rowId && (
                          <LuCheck className="size-4 text-[var(--colors-green-500)]" />
                        )}
                      </MenuItem>
                    ))}
                  </MenuItemGroup>
                </MenuContent>
              </MenuPositioner>
            </Portal>
          </MenuRoot>
        </div>

        {(tags.length > 0 ||
          (isAuthenticated &&
            !isFeedbackPending &&
            feedback.project?.rowId)) && (
          <div className="flex flex-wrap items-center gap-1.5">
            {tags.map((tag) => (
              <TagBadge key={tag.rowId} name={tag.name} color={tag.color} />
            ))}

            {isAuthenticated &&
              !isFeedbackPending &&
              feedback.rowId &&
              feedback.project?.rowId && (
                <TagPicker
                  postId={feedback.rowId}
                  projectId={feedback.project.rowId}
                  label={compact ? "" : "Tag"}
                  triggerProps={{
                    variant: "ghost",
                    size: "sm",
                    "aria-label": "Edit tags",
                    className:
                      "h-6 gap-1 px-1.5 text-foreground-subtle text-xs hover:text-foreground",
                  }}
                />
              )}
          </div>
        )}

        {!compact &&
          feedback.description &&
          (isFeedbackRoute ? (
            // detail page: full rich content (HTML), or legacy plain text
            /<[a-z][\s\S]*>/i.test(feedback.description) ? (
              <RichTextContent
                html={
                  workspaceSlug && projectSlug
                    ? linkifyIssueRefsHtml(
                        feedback.description,
                        (number) =>
                          `/workspaces/${workspaceSlug}/projects/${projectSlug}/${number}`,
                      )
                    : feedback.description
                }
                className="break-words text-muted-foreground text-sm leading-normal"
              />
            ) : (
              <p className="break-words text-muted-foreground text-sm leading-normal">
                {feedback.description.split("\n").map((line, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: simple index due to the nature of the rendering
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            )
          ) : (
            // feed preview: stripped, clamped plain text with an ellipsis
            <p
              {...descriptionProps}
              className={cn(
                "line-clamp-2 break-words text-muted-foreground text-sm leading-normal",
                descriptionProps?.className,
              )}
            >
              {/<[a-z][\s\S]*>/i.test(feedback.description)
                ? stripHtml(feedback.description)
                : feedback.description}
            </p>
          ))}

        {!compact && !!feedback.attachments?.nodes.length && (
          <AttachmentGallery
            attachments={feedback.attachments.nodes.filter(
              (node): node is NonNullable<typeof node> => node != null,
            )}
            compact={!disableHover}
          />
        )}

        {!compact && (
          // pinned to the bottom (mt-auto) so short posts fill the height the
          // vote rail gives the card; wraps instead of overflowing on mobile
          <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-foreground-subtle text-xs">
            {feedback.user?.username && (
              <span className="flex min-w-0 max-w-[10rem] shrink items-center gap-1.5">
                <AvatarRoot className="size-4 shrink-0 rounded-full text-[0.55rem]">
                  <AvatarImage
                    src={feedback.user.avatarUrl ?? undefined}
                    alt={feedback.user.username}
                  />
                  <AvatarFallback className="bg-muted">
                    {feedback.user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </AvatarRoot>

                <span className="truncate">{feedback.user.username}</span>
              </span>
            )}

            <span className="shrink-0 whitespace-nowrap">
              {isFeedbackRoute
                ? `Updated ${dayjs(isUpdateStatusPending ? new Date() : feedback.statusUpdatedAt).fromNow()}`
                : dayjs(
                    isFeedbackPending ? new Date() : feedback.createdAt,
                  ).fromNow()}
            </span>

            <div className="flex shrink-0 items-center gap-0.5">
              <LuMessageCircle className="size-3.5" />
              <Format.Number
                value={feedback.comments?.totalCount ?? 0}
                notation="compact"
              />
            </div>

            <div className="ml-auto flex items-center gap-2">
              {canAdjustFeedback && (
                <div className="flex items-center gap-2">
                  <UpdateFeedback
                    feedback={feedback}
                    triggerProps={{
                      disabled: actionIsPending,
                      onClick: (evt) => evt.stopPropagation(),
                    }}
                  />

                  <DestructiveAction
                    title={app.projectPage.projectFeedback.deletePost.title}
                    description={
                      app.projectPage.projectFeedback.deletePost.description
                    }
                    action={{
                      label:
                        app.projectPage.projectFeedback.deletePost.action.label,
                      onClick: () => deletePost({ postId: feedback.rowId! }),
                    }}
                    triggerProps={{
                      "aria-label":
                        app.projectPage.projectFeedback.deletePost.title,
                      size: "icon",
                      variant: "ghost",
                      className:
                        "size-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
                      disabled: actionIsPending,
                      onClick: (evt) => evt.stopPropagation(),
                    }}
                    iconClassName="size-4"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* dense (roadmap) cards: key + comment count pinned to the bottom so
            they line up across cards no matter how tall the title is */}
        {compact && (
          <div className="mt-auto flex items-center gap-1.5 pt-1 text-foreground-subtle text-xs">
            <span className="shrink-0">
              <FeedbackKey
                prefix={feedback.project?.prefix}
                number={feedback.number}
              />
            </span>

            <div className="ml-auto flex shrink-0 items-center gap-0.5">
              <LuMessageCircle className="size-3.5" />
              <Format.Number
                value={feedback.comments?.totalCount ?? 0}
                notation="compact"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackCard;
