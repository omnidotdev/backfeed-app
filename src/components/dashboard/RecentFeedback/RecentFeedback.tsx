"use client";

import { Flex, Stack, Text, VStack } from "@omnidev/sigil";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { GradientMask, Link, SkeletonArray, Spinner } from "components/core";
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
      contentProps={{
        position: "relative",
        // NB: the margin is necessary to prevent the mask from clipping box shadows
        mb: "1px",
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
        <Stack
          w="full"
          // NB: necessary to prevent the mask from clipping box shadows. Must be centered within this parent container.
          align="center"
          maxH="lg"
          overflow="auto"
          scrollbar="hidden"
          gap={2}
        >
          {isLoading ? (
            <SkeletonArray count={5} h={24} w="100%" />
          ) : recentFeedback?.length ? (
            <VStack gap={0} p={1}>
              {recentFeedback?.map((feedback) => (
                <Flex key={feedback?.rowId} direction="column" w="full" p={1}>
                  <Link
                    href={`/organizations/${feedback?.project?.organization?.slug}/projects/${feedback?.project?.slug}/${feedback?.rowId}`}
                  >
                    <Response
                      feedback={feedback as Partial<Post>}
                      p={2}
                      _hover={{
                        bgColor: "background.muted/40",
                        borderRadius: "sm",
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
            // NB: the width override is necessary to prevent the mask from clipping box shadows
            <GradientMask bottom={0} borderBottomRadius="lg" w="99%" />
          )}
        </Stack>
      )}
    </FeedbackSection>
  );
};

export default RecentFeedback;
