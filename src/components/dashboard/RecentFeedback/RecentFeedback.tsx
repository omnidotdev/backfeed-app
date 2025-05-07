"use client";

import { Box, Flex, Stack, Text, VStack } from "@omnidev/sigil";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { Link, SkeletonArray, Spinner } from "components/core";
import { FeedbackSection, Response } from "components/dashboard";
import { EmptyState, ErrorBoundary } from "components/layout";
import { useInfiniteRecentFeedbackQuery } from "generated/graphql";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

import type { Post } from "generated/graphql";

/**
 * Recent feedback section.
 */
const RecentFeedback = () => {
  const { user } = useAuth();

  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteRecentFeedbackQuery(
      {
        userId: user?.rowId!,
      },
      {
        initialPageParam: undefined,
        getNextPageParam: (lastPage) =>
          lastPage?.posts?.pageInfo?.hasNextPage
            ? { after: lastPage?.posts?.pageInfo?.endCursor }
            : undefined,
      },
    );

  // This is not defined within the `select` function in order to preserve type safety.
  const recentFeedback =
    data?.pages?.flatMap((page) =>
      page?.posts?.edges?.map((edge) => edge?.node),
    ) ?? [];

  const [loaderRef, { rootRef }] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: fetchNextPage,
    disabled: isError,
  });

  return (
    <FeedbackSection
      ref={rootRef}
      title="Recent Feedback"
      maxH="xl"
      contentProps={{
        overflow: "auto",
        p: 2,
        scrollbar: "hidden",
      }}
    >
      {isError ? (
        <ErrorBoundary
          message="Error fetching recent feedback"
          minH={40}
          h="full"
          w="full"
        />
      ) : (
        // NB: the margin is necessary to prevent clipping of the card borders/box shadows
        <Stack w="full" gap={2} h="full" mb="1px">
          {isLoading ? (
            <SkeletonArray count={5} h={24} w="100%" />
          ) : recentFeedback?.length ? (
            <VStack>
              {recentFeedback?.map((feedback) => (
                <Flex
                  key={feedback?.rowId}
                  direction="column"
                  w="full"
                  _last={{ pb: 2 }}
                >
                  <Link
                    href={`/organizations/${feedback?.project?.organization?.slug}/projects/${feedback?.project?.slug}/${feedback?.rowId}`}
                  >
                    <Response
                      feedback={feedback as Partial<Post>}
                      p={2}
                      _hover={{
                        bgColor: "background.muted/40",
                        borderRadius: "md",
                      }}
                    />
                  </Link>
                </Flex>
              ))}

              {hasNextPage ? (
                <Spinner ref={loaderRef} my={4} />
              ) : (
                <Text mb={4} py={2} fontSize="sm">
                  {app.dashboardPage.recentFeedback.endOf}
                </Text>
              )}
            </VStack>
          ) : (
            <EmptyState
              message={app.dashboardPage.recentFeedback.emptyState.message}
              minH={40}
              h="full"
              w="full"
            />
          )}

          {!!recentFeedback.length && (
            <Box
              position="absolute"
              bottom={0}
              h={12}
              w="full"
              bgGradient="mask"
            />
          )}
        </Stack>
      )}
    </FeedbackSection>
  );
};

export default RecentFeedback;
