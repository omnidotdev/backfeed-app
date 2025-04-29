"use client";

import { Flex } from "@omnidev/sigil";
import Link from "next/link";

import { SkeletonArray } from "components/core";
import { FeedbackSection, Response } from "components/dashboard";
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
    },
  );

  return (
    <FeedbackSection
      title="Recent Feedback"
      maxH="xl"
      contentProps={{ overflow: "auto", p: 6 }}
    >
      {isError ? (
        <ErrorBoundary
          message="Error fetching recent feedback"
          minH={40}
          h="full"
          w="full"
        />
      ) : (
        <Flex w="full" direction="column" gap={2} h="full">
          {isLoading ? (
            <SkeletonArray count={5} h={24} w="100%" />
          ) : recentFeedback?.length ? (
            recentFeedback?.map((feedback) => (
              <Link
                key={feedback?.rowId}
                href={`/organizations/${feedback?.project?.organization?.slug}/projects/${feedback?.project?.slug}/${feedback?.rowId}`}
              >
                <Response
                  feedback={feedback as Partial<Post>}
                  p={2}
                  _hover={{
                    bgColor: "background.muted",
                    borderRadius: "md",
                  }}
                />
              </Link>
            ))
          ) : (
            <EmptyState
              message={app.dashboardPage.recentFeedback.emptyState.message}
              minH={40}
              h="full"
              w="full"
            />
          )}
        </Flex>
      )}
    </FeedbackSection>
  );
};

export default RecentFeedback;
