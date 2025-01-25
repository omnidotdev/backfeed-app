"use client";

import { Flex } from "@omnidev/sigil";

import { SkeletonArray } from "components/core";
import { FeedbackCard, Response } from "components/dashboard";
import { EmptyState, ErrorBoundary } from "components/layout";
import { useRecentFeedbackQuery } from "generated/graphql";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

import type { Post } from "generated/graphql";

/**
 * Recent feedback section.
 */
const RecentFeedback = () => {
  const { user } = useAuth();

  const {
    data: recentFeedback,
    isLoading,
    isError,
  } = useRecentFeedbackQuery(
    {
      userId: user?.rowId!,
    },
    {
      enabled: !!user?.rowId,
      select: (data) => data?.posts?.nodes,
    }
  );

  return (
    <FeedbackCard
      title="Recent Feedback"
      maxH="xl"
      contentProps={{ overflow: "auto" }}
    >
      {isError ? (
        <ErrorBoundary
          message="Error fetching recent feedback"
          h={400}
          w="full"
        />
      ) : (
        <Flex w="full" direction="column" gap={2}>
          {isLoading ? (
            <SkeletonArray count={5} h={24} w="100%" />
          ) : recentFeedback?.length ? (
            recentFeedback?.map((feedback) => (
              <Response
                key={feedback?.rowId}
                feedback={feedback as Partial<Post>}
                type="Neutral"
              />
            ))
          ) : (
            <EmptyState
              message={app.dashboardPage.recentFeedback.emptyState.message}
              h={400}
              w="full"
            />
          )}
        </Flex>
      )}
    </FeedbackCard>
  );
};

export default RecentFeedback;
