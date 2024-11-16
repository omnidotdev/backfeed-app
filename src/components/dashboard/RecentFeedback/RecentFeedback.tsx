"use client";

import { Button, Flex, Icon } from "@omnidev/sigil";
import { FiMoreHorizontal } from "react-icons/fi";

import { FeedbackCard, Response } from "components/dashboard";

import type { ResponseType } from "components/dashboard";

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
    message: "This is a test message",
    date: "0 minutes ago",
    type: "Neutral",
  },
  {
    id: "2",
    sender: "Feed Back",
    message: "This is a test message",
    date: "2 minutes ago",
    type: "Positive",
  },
  {
    id: "3",
    sender: "Fed Front",
    message: "This is a test message",
    date: "4 minutes ago",
    type: "Negative",
  },
  {
    id: "4",
    sender: "Back Fed",
    message: "This is a test message",
    date: "6 minutes ago",
    type: "Feature",
  },
];

const RecentFeedback = () => {
  return (
    <FeedbackCard title="Recent Feedback">
      <Flex direction="column">
        {FEEDBACK.map(({ id, sender, message, date, type }) => (
          <Response
            key={id}
            sender={sender}
            message={message}
            date={date}
            type={type}
          />
        ))}
      </Flex>

      <Button
        variant="icon"
        w="fit-content"
        bgColor="transparent"
        opacity={{ base: 1, _hover: 0.8 }}
        placeSelf="center"
        mb={-4}
      >
        <Icon
          src={FiMoreHorizontal}
          w={8}
          h={8}
          color="foreground.subtle"
          placeSelf="center"
        />
      </Button>
    </FeedbackCard>
  );
};

export default RecentFeedback;
