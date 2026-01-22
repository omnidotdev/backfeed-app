import { Flex, Stack, Text, VStack } from "@omnidev/sigil";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Link, getRouteApi } from "@tanstack/react-router";
import useInfiniteScroll from "react-infinite-scroll-hook";

import SkeletonArray from "@/components/core/SkeletonArray";
import Spinner from "@/components/core/Spinner";
import FeedbackSection from "@/components/dashboard/FeedbackSection";
import Response from "@/components/dashboard/Response";
import EmptyState from "@/components/layout/EmptyState";
import { recentFeedbackOptions } from "@/lib/options/dashboard";

import type { FlexProps } from "@omnidev/sigil";
import type { Post } from "@/generated/graphql";

const dashboardRoute = getRouteApi("/_auth/dashboard");

interface Props extends Pick<FlexProps, "minH"> {}

/**
 * Recent Feedback section.
 * Shows recent feedback items across all user's organizations.
 */
const RecentFeedback = ({ minH }: Props) => {
  const { session } = dashboardRoute.useRouteContext();

  // Get org IDs from session for filtering
  const organizationIds = session?.organizations?.map((org) => org.id) ?? [];

  const {
    data: feedbackData,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    ...recentFeedbackOptions({
      organizationIds,
    }),
    select: (data) =>
      data?.pages?.flatMap((page) =>
        page?.posts?.edges?.map((edge) => edge?.node),
      ),
    enabled: organizationIds.length > 0,
  });

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
      minH={minH}
      contentProps={{
        overflow: "auto",
        scrollbar: "hidden",
      }}
    >
      {isError ? (
        <Flex align="center" justify="center" h="full" p={8}>
          <Text color="foreground.subtle" fontSize="sm">
            Unable to load feedback
          </Text>
        </Flex>
      ) : (
        <Stack w="full" h="full" gap={0}>
          {isLoading ? (
            <Stack p={4} gap={3}>
              <SkeletonArray count={5} h={16} w="100%" borderRadius="lg" />
            </Stack>
          ) : feedbackData?.length ? (
            <VStack gap={0}>
              {feedbackData?.map((feedback, index) => {
                const isLast =
                  index === feedbackData.length - 1 && !hasNextPage;
                return (
                  <Link
                    key={feedback?.rowId}
                    to="/workspaces/$workspaceSlug/projects/$projectSlug/$feedbackId"
                    params={{
                      workspaceSlug:
                        session?.organizations?.find(
                          (org) => org.id === feedback?.project?.organizationId,
                        )?.slug ?? "",
                      projectSlug: feedback?.project?.slug!,
                      feedbackId: feedback?.rowId!,
                    }}
                    style={{ width: "100%" }}
                  >
                    <Response
                      feedback={feedback as Partial<Post>}
                      px={5}
                      py={3}
                      borderBottomWidth={isLast ? 0 : "1px"}
                      borderColor="border.subtle"
                      transition="background 0.1s ease"
                      _hover={{
                        bgColor: "background.subtle",
                      }}
                    />
                  </Link>
                );
              })}

              {hasNextPage && (
                <Flex ref={loaderRef} justify="center" my={4}>
                  {isFetchingNextPage && <Spinner />}
                </Flex>
              )}
            </VStack>
          ) : (
            <EmptyState
              message="No feedback items yet"
              minH={40}
              h="full"
              w="full"
              borderColor="transparent"
            />
          )}
        </Stack>
      )}
    </FeedbackSection>
  );
};

export default RecentFeedback;
