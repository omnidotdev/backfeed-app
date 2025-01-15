"use client";

import { Grid, Stack, VStack } from "@omnidev/sigil";
import { useMutationState } from "@tanstack/react-query";
import { LuMessageSquare } from "react-icons/lu";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { SkeletonArray, Spinner } from "components/core";
import { CommentCard, CreateComment } from "components/feedback";
import { EmptyState, ErrorBoundary, SectionContainer } from "components/layout";
import { useInfiniteCommentsQuery } from "generated/graphql";
import { app } from "lib/config";
import { CREATE_COMMENT_MUTATION_KEY } from "lib/constants";
import { useAuth } from "lib/hooks";

import type {
  CommentFragment,
  CreateCommentMutationVariables,
} from "generated/graphql";

interface Props {
  /** Feedback ID. */
  feedbackId: string;
}

/**
 * Feedback comments section.
 */
const Comments = ({ feedbackId }: Props) => {
  const { user } = useAuth();

  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteCommentsQuery(
      {
        pageSize: 5,
        feedbackId,
      },
      {
        initialPageParam: undefined,
        getNextPageParam: (lastPage) =>
          lastPage?.comments?.pageInfo?.hasNextPage
            ? { after: lastPage?.comments?.pageInfo?.endCursor }
            : undefined,
      }
    );

  const pendingComments = useMutationState<Partial<CommentFragment>>({
    filters: { mutationKey: CREATE_COMMENT_MUTATION_KEY, status: "pending" },
    select: (mutation) => {
      const { input } = mutation.state
        .variables as CreateCommentMutationVariables;

      return {
        message: input.comment.message,
        user: {
          rowId: user?.rowId!,
          username: user?.username,
        },
      };
    },
  });

  // These are not defined within the `select` function in order to preserve type safety.
  const totalCount = data?.pages?.[0]?.comments?.totalCount ?? 0;
  const comments = data?.pages?.flatMap((page) =>
    page?.comments?.edges?.map((edge) => edge?.node)
  );

  const [loaderRef, { rootRef }] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: fetchNextPage,
    disabled: isError,
    // NB: `rootMargin` is passed to `IntersectionObserver`. We can use it to trigger 'onLoadMore' when the spinner comes *near* to being visible, instead of when it becomes fully visible within the root element.
    rootMargin: "0px 0px 400px 0px",
  });

  return (
    <SectionContainer
      ref={rootRef}
      title={app.feedbackPage.comments.title}
      description={app.feedbackPage.comments.description}
      icon={LuMessageSquare}
    >
      <Stack>
        <CreateComment totalCount={totalCount} />

        {isError ? (
          <ErrorBoundary message="Error fetching comments" h="xs" />
        ) : (
          // NB: the padding is necessary to prevent clipping of the card borders/box shadows
          <Grid gap={2} mt={4} maxH="sm" overflow="auto" p="1px">
            {isLoading ? (
              <SkeletonArray count={5} h={21} />
            ) : comments?.length || pendingComments.length ? (
              <VStack>
                {!!pendingComments.length && (
                  <CommentCard
                    commentId="pending"
                    senderName={pendingComments[0].user?.username}
                    message={pendingComments[0].message}
                    date={new Date()}
                    isSender
                    isPending
                    w="full"
                    minH={21}
                  />
                )}

                {comments?.map((comment) => (
                  <CommentCard
                    key={comment?.rowId}
                    commentId={comment?.rowId!}
                    senderName={comment?.user?.username}
                    message={comment?.message}
                    date={comment?.createdAt}
                    isSender={comment?.user?.rowId === user?.rowId}
                    w="full"
                    minH={21}
                  />
                ))}

                {hasNextPage && <Spinner ref={loaderRef} />}
              </VStack>
            ) : (
              <EmptyState
                message={app.feedbackPage.comments.emptyState.message}
                h="xs"
                w="full"
              />
            )}
          </Grid>
        )}
      </Stack>
    </SectionContainer>
  );
};

export default Comments;
