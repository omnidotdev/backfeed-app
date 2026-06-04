import {
  useInfiniteQuery,
  useMutationState,
  useQuery,
} from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
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
import {
  freeTierCommentsOptions,
  infiniteCommentsOptions,
} from "@/lib/options/comments";

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
  const { projectSlug, feedbackId } = feedbackRoute.useParams();

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

  const [loaderRef, { rootRef }] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: fetchNextPage,
    disabled: isError,
  });

  return (
    <SectionContainer
      ref={rootRef}
      title={app.postPage.comments.title}
      description={app.postPage.comments.description}
      icon={LuMessageSquare}
      p={0}
      pr={{ base: 4, sm: 6 }}
      pl={{ base: 4, sm: 6 }}
      pt={{ base: 4, sm: 6 }}
    >
      {/* NB: the margin is necessary to prevent clipping of the card borders/box shadows */}
      <div className="relative mb-px flex flex-col gap-2">
        <CreateComment canCreateComment={canCreateComment ?? false} />

        <div className="mt-4 h-px w-full bg-border" />

        {isError ? (
          <ErrorBoundary
            message="Error fetching comments"
            className="my-4 h-80"
          />
        ) : (
          <div className="mt-4 grid max-h-[36rem] gap-2 overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {isLoading ? (
              <SkeletonArray count={5} h={28} />
            ) : allComments?.length ? (
              <div className="flex flex-col items-center gap-2">
                {allComments?.map((comment) => (
                  <CommentCard
                    key={comment?.rowId}
                    comment={comment!}
                    canReply={canCreateComment ?? false}
                    w="full"
                    minH={21}
                  />
                ))}

                {hasNextPage && <Spinner ref={loaderRef} className="my-4" />}
              </div>
            ) : (
              <EmptyState
                message={app.postPage.comments.emptyState.message}
                h={24}
                w="full"
                mb={4}
              />
            )}
          </div>
        )}

        {!!allComments.length && <GradientMask bottom={0} />}
      </div>
    </SectionContainer>
  );
};

export default Comments;
