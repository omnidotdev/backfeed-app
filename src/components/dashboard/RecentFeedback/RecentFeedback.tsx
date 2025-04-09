"use client";

import { Flex } from "@omnidev/sigil";
import { useSuspenseQuery } from "@tanstack/react-query";

import { FeedbackSection, Response } from "components/dashboard";
import { EmptyState, ErrorBoundary } from "components/layout";
import { app } from "lib/config";
import { recentFeedbackQueryOptions } from "lib/react-query/options";

import type { Post, User } from "generated/graphql";

interface Props {
  userId: User["rowId"];
}

/**
 * Recent feedback section.
 */
const RecentFeedback = ({ userId }: Props) => {
  const { data: recentFeedback, isError } = useSuspenseQuery(
    recentFeedbackQueryOptions({
      userId,
    })
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
          {recentFeedback?.length ? (
            recentFeedback?.map((feedback) => (
              <Response
                key={feedback?.rowId}
                feedback={feedback as Partial<Post>}
                borderBottomWidth={{ base: "1px", _last: 0 }}
                pt={{ base: 3, _first: 0 }}
                pb={{ base: 3, _last: 6 }}
              />
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
