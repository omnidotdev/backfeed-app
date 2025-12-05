import { Flex, Stack, Text, VStack } from "@omnidev/sigil";
import { Link, useRouteContext } from "@tanstack/react-router";
import useInfiniteScroll from "react-infinite-scroll-hook";

import GradientMask from "@/components/core/GradientMask";
import SkeletonArray from "@/components/core/SkeletonArray";
import Spinner from "@/components/core/Spinner";
import FeedbackSection from "@/components/dashboard/FeedbackSection";
import Response from "@/components/dashboard/Response";
import EmptyState from "@/components/layout/EmptyState";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { useInfiniteRecentFeedbackQuery } from "@/generated/graphql";
import app from "@/lib/config/app.config";

import type { Post } from "@/generated/graphql";

/**
 * Recent feedback section.
 */
const RecentFeedback = () => {
  const { session } = useRouteContext({ from: "/_auth/dashboard" });
  const {
    data: recentFeedback,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteRecentFeedbackQuery(
    {
      userId: session?.user.rowId!,
    },
    {
      initialPageParam: undefined,
      getNextPageParam: (lastPage) =>
        lastPage?.posts?.pageInfo?.hasNextPage
          ? { after: lastPage?.posts?.pageInfo?.endCursor }
          : undefined,
      select: (data) =>
        data?.pages?.flatMap((page) =>
          page?.posts?.edges?.map((edge) => edge?.node),
        ),
    },
  );

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
            <VStack gap={0} p={1}>
              {recentFeedback?.map((feedback) => (
                <Flex key={feedback?.rowId} direction="column" w="full" p={1}>
                  <Link
                    to="/organizations/$organizationSlug/projects/$projectSlug/$feedbackId"
                    params={{
                      organizationSlug: feedback?.project?.organization?.slug!,
                      projectSlug: feedback?.project?.slug!,
                      feedbackId: feedback?.rowId!,
                    }}
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
              borderColor="transparent"
            />
          )}

          {!!recentFeedback?.length && <GradientMask bottom={0} />}
        </Stack>
      )}
    </FeedbackSection>
  );
};

export default RecentFeedback;
