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
import { LuMessageSquare } from "react-icons/lu";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { SkeletonArray, Spinner } from "components/core";
import { CommentCard } from "components/feedback";
import { EmptyState, ErrorBoundary, SectionContainer } from "components/layout";
import { useInfiniteCommentsQuery } from "generated/graphql";
import { app } from "lib/config";

interface Props {
  /** Feedback ID. */
  feedbackId: string;
}

/**
 * Feedback comments section.
 */
const Comments = ({ feedbackId }: Props) => {
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
        <Textarea
          placeholder={app.feedbackPage.comments.textAreaPlaceholder}
          borderColor="border.subtle"
          fontSize="sm"
          minH={16}
          disabled
        />

        <Stack justify="space-between" direction="row">
          <Skeleton isLoaded={!isLoading} h="fit-content">
            <Text
              fontSize="sm"
              color="foreground.muted"
            >{`${isError ? 0 : totalCount} ${app.feedbackPage.comments.totalComments}`}</Text>
          </Skeleton>

          <Button w="fit-content" placeSelf="flex-end" disabled>
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
