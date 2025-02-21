"use client";

import { Grid, Stack, VStack } from "@omnidev/sigil";
import { useMutationState } from "@tanstack/react-query";
import { LuMessageSquare } from "react-icons/lu";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { SkeletonArray, Spinner } from "components/core";
import { CommentCard, CreateComment } from "components/feedback";
import { EmptyState, ErrorBoundary, SectionContainer } from "components/layout";
import {
  useCreateCommentMutation,
  useInfiniteCommentsQuery,
  useUserQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

import type {
  CommentFragment,
  CreateCommentMutationVariables,
  Post,
} from "generated/graphql";

interface Props {
  /** Feedback ID. */
  feedbackId: Post["rowId"];
}

/**
 * Feedback comments section.
 */
const Comments = ({ feedbackId }: Props) => {
  const { user } = useAuth();

  const { data: username } = useUserQuery(
    {
      hidraId: user?.hidraId!,
    },
    {
      enabled: !!user?.hidraId,
      select: (data) => data?.userByHidraId?.username,
    }
  );

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

  const pendingComments = useMutationState<CommentFragment>({
    filters: {
      mutationKey: useCreateCommentMutation.getKey(),
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
          username,
        },
      };
    },
  });

  // These are not defined within the `select` function in order to preserve type safety.
  const totalCount = data?.pages?.[0]?.comments?.totalCount ?? 0;
  const comments =
    data?.pages?.flatMap((page) =>
      page?.comments?.edges?.map((edge) => edge?.node)
    ) ?? [];

  const allComments = [...pendingComments, ...comments];

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
        <CreateComment />

        {isError ? (
          <ErrorBoundary message="Error fetching comments" h="xs" />
        ) : (
          // NB: the padding is necessary to prevent clipping of the card borders/box shadows
          <Grid gap={2} mt={4} maxH="sm" overflow="auto" p="1px">
            {isLoading ? (
              <SkeletonArray count={5} h={28} />
            ) : allComments?.length ? (
              <VStack>
                {allComments?.map((comment) => {
                  const isPending = comment?.rowId === "pending";

                  return (
                    <CommentCard
                      key={comment?.rowId}
                      commentId={comment?.rowId!}
                      senderName={comment?.user?.username}
                      message={comment?.message}
                      createdAt={comment?.createdAt ?? new Date()}
                      isSender={comment?.user?.rowId === user?.rowId}
                      isPending={isPending}
                      w="full"
                      minH={21}
                    />
                  );
                })}

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
