import {
  useInfiniteQuery,
  useMutationState,
  useQuery,
} from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { useMemo } from "react";
import { LuMessageSquare } from "react-icons/lu";
import useInfiniteScroll from "react-infinite-scroll-hook";

import GradientMask from "@/components/core/GradientMask";
import SkeletonArray from "@/components/core/SkeletonArray";
import Spinner from "@/components/core/Spinner";
import CommentCard from "@/components/feedback/CommentCard";
import CreateComment from "@/components/feedback/CreateComment";
import EmptyState from "@/components/layout/EmptyState";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import SectionContainer from "@/components/layout/SectionContainer";
import { useCreateCommentMutation } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import useScrollFade from "@/lib/hooks/useScrollFade";
import {
  freeTierCommentsOptions,
  infiniteCommentsOptions,
} from "@/lib/options/comments";

import type { MentionItem } from "@/components/ui/rich-text-editor";
import type {
  CommentFragment,
  CreateCommentMutationVariables,
} from "@/generated/graphql";

// Cache pending comment dates to maintain stable references and avoid infinite re-renders
const pendingDateCache = new Map<number, Date>();

const getPendingDate = (submittedAt: number): Date => {
  if (!pendingDateCache.has(submittedAt)) {
    pendingDateCache.set(submittedAt, new Date(submittedAt));
  }
  return pendingDateCache.get(submittedAt)!;
};

const feedbackRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout/projects/$projectSlug/$feedbackId",
);

/**
 * Feedback comments section.
 */
const Comments = () => {
  const { session, organizationId } = feedbackRoute.useRouteContext();
  const { projectSlug } = feedbackRoute.useParams();
  const { feedbackId } = feedbackRoute.useLoaderData();

  const { data: canCreateComment } = useQuery(
    freeTierCommentsOptions({
      projectSlug,
      organizationId,
      feedbackId,
    }),
  );

  const {
    data: comments,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    ...infiniteCommentsOptions({
      feedbackId,
    }),
    select: (data) =>
      data?.pages?.flatMap((page) =>
        page?.comments?.edges?.map((edge) => edge?.node),
      ),
  });

  const pendingComments = useMutationState<CommentFragment>({
    filters: {
      mutationKey: useCreateCommentMutation.getKey(),
      // make sure only top-level comments are counted towards pending comments
      predicate: (mutation) =>
        !(mutation.state.variables as CreateCommentMutationVariables).input
          .comment.parentId,
      status: "pending",
    },
    select: (mutation) => {
      const { input } = mutation.state
        .variables as CreateCommentMutationVariables;

      return {
        rowId: "pending",
        message: input.comment.message,
        // Use cached Date to maintain stable reference and avoid infinite re-renders
        createdAt: getPendingDate(mutation.state.submittedAt),
        user: {
          rowId: session?.user?.rowId!,
          username: session?.user?.username,
        },
        childComments: {
          totalCount: 0,
        },
      };
    },
  });

  const allComments = [...pendingComments, ...(comments ?? [])];

  // offer the thread's participants in the @-mention typeahead
  const mentionableUsers = useMemo<MentionItem[]>(() => {
    const byId = new Map<string, MentionItem>();
    for (const comment of comments ?? []) {
      const user = comment?.user;
      if (user?.rowId && user?.username && !byId.has(user.rowId)) {
        byId.set(user.rowId, {
          id: user.rowId,
          label: user.username,
          url: `/profile/${user.rowId}/account`,
        });
      }
    }
    return [...byId.values()];
  }, [comments]);

  const [loaderRef, { rootRef }] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: fetchNextPage,
    disabled: isError,
  });

  // only fade the bottom edge while the list is actually scrollable and not yet
  // at the end, so the fade never clips the last comment's reply controls
  const { ref: scrollFadeRef, showEndFade } = useScrollFade([
    allComments.length,
    isLoading,
  ]);

  return (
    <SectionContainer
      ref={rootRef}
      title={app.postPage.comments.title}
      description={app.postPage.comments.description}
      icon={LuMessageSquare}
      className="p-0 px-4 pt-4 sm:px-6 sm:pt-6"
    >
      {/* NB: the margin is necessary to prevent clipping of the card borders/box shadows */}
      <div className="relative mb-px flex flex-col gap-2">
        {/* fail open while the limit query is loading/undetermined; the server
            enforces the real limit on create */}
        <CreateComment
          canCreateComment={canCreateComment ?? true}
          mentionableUsers={mentionableUsers}
        />

        <div className="mt-4 h-px w-full bg-border" />

        {isError ? (
          <ErrorBoundary
            message="Error fetching comments"
            className="my-4 h-80"
          />
        ) : (
          <div
            ref={scrollFadeRef}
            className="mt-4 grid max-h-[36rem] gap-2 overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {isLoading ? (
              <SkeletonArray count={5} className="h-28" />
            ) : allComments?.length ? (
              <div className="flex flex-col items-center gap-2">
                {allComments?.map((comment) => (
                  <CommentCard
                    key={comment?.rowId}
                    comment={comment!}
                    canReply={canCreateComment ?? true}
                    mentionableUsers={mentionableUsers}
                    className="min-h-[5.25rem] w-full"
                  />
                ))}

                {hasNextPage && <Spinner ref={loaderRef} className="my-4" />}
              </div>
            ) : (
              <EmptyState
                message={app.postPage.comments.emptyState.message}
                className="mb-4 h-24 w-full"
              />
            )}
          </div>
        )}

        {!!allComments.length && showEndFade && (
          <GradientMask className="bottom-0" />
        )}
      </div>
    </SectionContainer>
  );
};

export default Comments;
