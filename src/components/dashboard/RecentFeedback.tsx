import { Flex, Stack, Text, VStack } from "@omnidev/sigil";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Link, useRouteContext } from "@tanstack/react-router";
import { useMemo } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

import SkeletonArray from "@/components/core/SkeletonArray";
import Spinner from "@/components/core/Spinner";
import FeedbackSection from "@/components/dashboard/FeedbackSection";
import Response from "@/components/dashboard/Response";
import EmptyState from "@/components/layout/EmptyState";
import { recentFeedbackOptions } from "@/lib/options/dashboard";

import type { Post } from "@/generated/graphql";

/**
 * Needs Attention section.
 * Shows feedback items prioritized by those needing review (no status assigned).
 */
const RecentFeedback = () => {
  const { session } = useRouteContext({ from: "/_auth/dashboard" });

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

  // Sort to show items without status (needs review) first
  const sortedFeedback = useMemo(() => {
    if (!feedbackData) return [];
    return [...feedbackData].sort((a, b) => {
      const aHasStatus = !!a?.statusTemplate;
      const bHasStatus = !!b?.statusTemplate;
      if (!aHasStatus && bHasStatus) return -1;
      if (aHasStatus && !bHasStatus) return 1;
      return 0;
    });
  }, [feedbackData]);

  const [loaderRef, { rootRef }] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: fetchNextPage,
    disabled: isError,
  });

  return (
    <FeedbackSection
      ref={rootRef}
      title="Needs Attention"
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
        <Stack w="full" h="full">
          {isLoading ? (
            <Stack p={4} gap={3}>
              <SkeletonArray count={5} h={16} w="100%" borderRadius="lg" />
            </Stack>
          ) : sortedFeedback?.length ? (
            <VStack gap={0}>
              {sortedFeedback?.map((feedback) => (
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
                    borderBottomWidth="1px"
                    borderColor="border.subtle"
                    transition="background 0.1s ease"
                    _hover={{
                      bgColor: "background.subtle",
                    }}
                  />
                </Link>
              ))}

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
