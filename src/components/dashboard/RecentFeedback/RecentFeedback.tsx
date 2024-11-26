"use client";

import { Flex } from "@omnidev/sigil";

import { SkeletonArray } from "components/core";
import { FeedbackCard, Response } from "components/dashboard";
import { ErrorBoundary } from "components/layout";
import { useDataState } from "lib/hooks";

import type { ResponseType } from "lib/util";

interface Feedback {
  id: string;
  sender: string;
  message: string;
  date: string;
  type: ResponseType;
}

const FEEDBACK: Feedback[] = [
  {
    id: "1",
    sender: "Back Feed",
    message: "I still like turtles.",
    date: "30 seconds ago",
    type: "Neutral",
  },
  {
    id: "2",
    sender: "Feed Back",
    message: "The new dashboard layout is much more intuitive!",
    date: "4 minutes ago",
    type: "Positive",
  },
  {
    id: "3",
    sender: "Fed Front",
    message: "Having issues with the new export feature.",
    date: "3 hours ago",
    type: "Bug",
  },
  {
    id: "4",
    sender: "Back Fed",
    message: "Would love to be able to export feedback.",
    date: "2 days ago",
    type: "Feature",
  },
  {
    id: "5",
    sender: "Back Feed",
    message: "I am having troubles logging in.",
    date: "3 days ago",
    type: "Bug",
  },
  {
    id: "6",
    sender: "Back Fed",
    message: "I love turtles!",
    date: "4 days ago",
    type: "Positive",
  },
  {
    id: "7",
    sender: "Front Fed",
    message: "Would love to be able to export feedback.",
    date: "10 days ago",
    type: "Feature",
  },
  {
    id: "8",
    sender: "Back Feed",
    message: "I like turtles.",
    date: "69 days ago",
    type: "Neutral",
  },
];

/**
 * Recent feedback section.
 */
const RecentFeedback = () => {
  const { isLoading, isError } = useDataState({ timeout: 500 });

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
          ) : (
            FEEDBACK.map(({ id, sender, message, date, type }) => (
              <Response
                key={id}
                sender={sender}
                message={message}
                date={date}
                type={type}
              />
            ))
          )}
        </Flex>
      )}
    </FeedbackCard>
  );
};

export default RecentFeedback;
