import { useInfiniteQuery, useMutationState } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";

import SkeletonArray from "@/components/core/SkeletonArray";
import ReplyCard from "@/components/feedback/ReplyCard";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { Button } from "@/components/ui/button";
import {
  CollapsibleContent,
  CollapsibleRoot,
} from "@/components/ui/collapsible";
import { useCreateCommentMutation } from "@/generated/graphql";
import { infiniteRepliesOptions } from "@/lib/options/comments";

import type { ComponentProps } from "react";
import type {
  Comment,
  CreateCommentMutationVariables,
  ReplyFragment,
} from "@/generated/graphql";

const feedbackRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout/projects/$projectSlug/$feedbackId",
);

interface Props extends ComponentProps<typeof CollapsibleRoot> {
  /** Comment ID. */
  commentId: Comment["rowId"];
}

/**
 * Comment replies section.
 */
const Replies = ({ commentId, ...rest }: Props) => {
  const { session } = feedbackRoute.useRouteContext();

  const {
    data: replies,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    ...infiniteRepliesOptions({
      commentId,
    }),
    select: (data) =>
      data?.pages?.flatMap((page) =>
        page?.comments?.edges?.map((edge) => edge?.node),
      ),
  });

  const pendingReplies = useMutationState<ReplyFragment>({
    filters: {
      mutationKey: useCreateCommentMutation.getKey(),
      predicate: (mutation) =>
        (mutation.state.variables as CreateCommentMutationVariables).input
          .comment.parentId === commentId,
      status: "pending",
    },
    select: (mutation) => {
      const { input } = mutation.state
        .variables as CreateCommentMutationVariables;

      return {
        rowId: "pending",
        parentId: input.comment.parentId,
        message: input.comment.message,
        createdAt: new Date(),
        user: {
          rowId: session?.user?.rowId!,
          username: session?.user?.username,
        },
      };
    },
  });

  const allReplies = [...pendingReplies, ...(replies ?? [])];

  if (isError) {
    return (
      <ErrorBoundary message="Error fetching replies" className="my-4 h-80" />
    );
  }

  return (
    <CollapsibleRoot {...rest}>
      <CollapsibleContent>
        <div className="mt-4 grid gap-2 sm:ml-10">
          {isLoading ? (
            <SkeletonArray count={5} className="h-[5.25rem]" />
          ) : (
            <div className="flex flex-col items-center gap-1">
              {allReplies?.map((reply) => (
                <ReplyCard
                  key={reply?.rowId}
                  reply={reply!}
                  className="min-h-[5.25rem] w-full"
                />
              ))}

              {hasNextPage && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="my-2"
                  onClick={() => fetchNextPage()}
                >
                  Load More
                </Button>
              )}
            </div>
          )}
        </div>
      </CollapsibleContent>
    </CollapsibleRoot>
  );
};

export default Replies;
