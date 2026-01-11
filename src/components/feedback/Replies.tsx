import { Button, Collapsible, Grid, VStack } from "@omnidev/sigil";
import { useInfiniteQuery, useMutationState } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";

import SkeletonArray from "@/components/core/SkeletonArray";
import ReplyCard from "@/components/feedback/ReplyCard";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { useCreateCommentMutation } from "@/generated/graphql";
import { infiniteRepliesOptions } from "@/lib/options/comments";

import type { CollapsibleProps } from "@omnidev/sigil";
import type {
  Comment,
  CreateCommentMutationVariables,
  ReplyFragment,
} from "@/generated/graphql";

interface Props extends CollapsibleProps {
  /** Comment ID. */
  commentId: Comment["rowId"];
}

/**
 * Comment replies section.
 */
const Replies = ({ commentId, ...rest }: Props) => {
  const { session } = useRouteContext({
    from: "/_auth/workspaces/$workspaceSlug/_layout/projects/$projectSlug/$feedbackId",
  });

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
    return <ErrorBoundary message="Error fetching replies" h="xs" my={4} />;
  }

  return (
    <Collapsible {...rest}>
      <Grid gap={2} mt={4} ml={{ sm: 10 }}>
        {isLoading ? (
          <SkeletonArray count={5} h={21} />
        ) : (
          <VStack gap={1}>
            {allReplies?.map((reply) => (
              <ReplyCard key={reply?.rowId} reply={reply!} w="full" minH={21} />
            ))}

            {hasNextPage && (
              <Button
                variant="ghost"
                size="xs"
                my={2}
                onClick={() => fetchNextPage()}
              >
                Load More
              </Button>
            )}
          </VStack>
        )}
      </Grid>
    </Collapsible>
  );
};

export default Replies;
