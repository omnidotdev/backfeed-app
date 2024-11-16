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
    message: "I like turtles.",
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
];

const RecentFeedback = () => (
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

export default RecentFeedback;
