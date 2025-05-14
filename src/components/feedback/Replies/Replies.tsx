"use client";

import { Button, Collapsible, Grid, VStack } from "@omnidev/sigil";
import { useMutationState } from "@tanstack/react-query";

import { SkeletonArray } from "components/core";
import { ReplyCard } from "components/feedback";
import { ErrorBoundary } from "components/layout";
import {
  useCreateCommentMutation,
  useInfiniteRepliesQuery,
} from "generated/graphql";

import type { CollapsibleProps } from "@omnidev/sigil";
import type {
  Comment,
  CreateCommentMutationVariables,
  Organization,
  ReplyFragment,
} from "generated/graphql";
import type { Session } from "next-auth";

interface Props extends CollapsibleProps {
  /** Authenticated user. */
  user: Session["user"];
  /** Organization ID. */
  organizationId: Organization["rowId"];
  /** Comment ID. */
  commentId: Comment["rowId"];
}

/**
 * Comment replies section.
 */
const Replies = ({ user, organizationId, commentId, ...rest }: Props) => {
  const {
    data: replies,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteRepliesQuery(
    {
      commentId,
    },
    {
      initialPageParam: undefined,
      getNextPageParam: (lastPage) =>
        lastPage?.comments?.pageInfo?.hasNextPage
          ? { after: lastPage?.comments?.pageInfo?.endCursor }
          : undefined,
      select: (data) =>
        data?.pages?.flatMap((page) =>
          page?.comments?.edges?.map((edge) => edge?.node),
        ),
    },
  );

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
        message: input.comment.message,
        user: {
          rowId: user?.rowId!,
          username: user?.username,
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
              <ReplyCard
                key={reply?.rowId}
                user={user}
                reply={reply!}
                organizationId={organizationId}
                w="full"
                minH={21}
              />
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
