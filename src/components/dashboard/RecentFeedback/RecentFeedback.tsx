"use client";

import { Button, Flex, Stack, Text, VStack } from "@omnidev/sigil";

import { Link, SkeletonArray } from "components/core";
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

  return (
    <FeedbackSection
      title="Recent Feedback"
      maxH="xl"
      contentProps={{
        overflow: "auto",
        p: 2,
        scrollbar: "hidden",
        WebkitMaskImage: recentFeedback?.length
          ? "var(--scrollable-mask)"
          : undefined,
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
        <Stack w="full" gap={2} h="full">
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
                <Button
                  variant="ghost"
                  bgColor="transparent"
                  color={{
                    base: "foreground.muted",
                    _hover: "foreground.default",
                  }}
                  mb={4}
                  onClick={() => fetchNextPage()}
                >
                  {app.dashboardPage.recentFeedback.loadMore}
                </Button>
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
        </Stack>
      )}
    </FeedbackSection>
  );
};

export default RecentFeedback;
