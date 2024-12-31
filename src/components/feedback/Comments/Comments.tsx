"use client";

import {
  Button,
  Grid,
  Skeleton,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@omnidev/sigil";
import { useInfiniteQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { useCallback } from "react";
import { LuMessageSquare } from "react-icons/lu";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { SkeletonArray, Spinner } from "components/core";
import { CommentCard } from "components/feedback";
import { EmptyState, ErrorBoundary, SectionContainer } from "components/layout";
import { CommentsDocument } from "generated/graphql";
import { API_BASE_URL, app } from "lib/config";

import type { CommentsQuery, CommentsQueryVariables } from "generated/graphql";

interface Props {
  /** Feedback ID. */
  feedbackId: string;
}

/**
 * Feedback comments section.
 */
const Comments = ({ feedbackId }: Props) => {
  const variables: CommentsQueryVariables = {
    pageSize: 5,
    feedbackId,
  };

  // TODO: Discuss using `useInfiniteCommentsQuery`. Any insight on how to appropriately apply the dynamic `after` parameter to that provided hook would be much appreciated.
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery<CommentsQuery>({
      queryKey: ["comments", variables],
      queryFn: ({ pageParam }) =>
        request({
          url: API_BASE_URL!,
          document: CommentsDocument,
          variables: {
            ...variables,
            after: pageParam,
          },
        }),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) =>
        lastPage?.comments?.pageInfo?.hasNextPage
          ? lastPage?.comments?.pageInfo?.endCursor
          : undefined,
    });

  const totalCount = data?.pages?.[0]?.comments?.totalCount ?? 0;
  const comments = data?.pages?.flatMap((page) =>
    page?.comments?.edges?.map((edge) => edge?.node)
  );

  const loadMoreComments = useCallback(() => {
    if (!hasNextPage) return;

    fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  const [loaderRef, { rootRef }] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: loadMoreComments,
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
        <Textarea
          placeholder={app.feedbackPage.comments.textAreaPlaceholder}
          borderColor="border.subtle"
          fontSize="sm"
          minH={16}
        />

        <Stack justify="space-between" direction="row">
          <Skeleton isLoaded={!isLoading} h="fit-content">
            <Text
              fontSize="sm"
              color="foreground.muted"
            >{`${isError ? 0 : totalCount} ${app.feedbackPage.comments.totalComments}`}</Text>
          </Skeleton>

          <Button
            w="fit-content"
            placeSelf="flex-end"
            // TODO: discuss if disabling this button (mutation) is the right approach if an error is encountered fetching the comments
            disabled={isLoading || isError}
          >
            {app.feedbackPage.comments.submit}
          </Button>
        </Stack>

        {isError ? (
          <ErrorBoundary message="Error fetching comments" h="xs" />
        ) : (
          // NB: the padding is necessary to prevent clipping of the card borders/box shadows
          <Grid gap={2} mt={4} maxH="sm" overflow="auto" p="1px">
            {isLoading ? (
              <SkeletonArray count={5} h={21} />
            ) : comments?.length ? (
              <VStack>
                {comments?.map((comment) => (
                  <CommentCard
                    key={comment?.rowId}
                    senderName={comment?.user?.username}
                    message={comment?.message}
                    date={comment?.createdAt}
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
