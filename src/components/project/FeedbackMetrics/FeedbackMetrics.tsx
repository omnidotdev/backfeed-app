"use client";

import { Flex, Text, Icon, Skeleton } from "@omnidev/sigil";
import { HiOutlineFolder } from "react-icons/hi2";
import { PiArrowFatLineUpFill } from "react-icons/pi";

import { SectionContainer } from "components/layout";
import { app } from "lib/config";

interface Props {
  /** Total feedback for the project. */
  totalFeedback: number;
  /** Total upvotes for the project posts. */
  totalUpvotes: number;
  /** Whether the project data is loaded. */
  isLoaded?: boolean;
  /** Whether loading the project data encountered an error. */
  isError?: boolean;
}

/**
 * Feedback metrics for a project.
 */
const FeedbackMetrics = ({
  totalFeedback,
  totalUpvotes,
  isLoaded,
  isError,
}: Props) => {
  const metrics = [
    {
      title: app.projectPage.feedbackMetrics.totalFeedback,
      icon: HiOutlineFolder,
      value: totalFeedback,
    },
    {
      title: app.projectPage.feedbackMetrics.totalUpvotes,
      icon: PiArrowFatLineUpFill,
      value: totalUpvotes,
    },
  ];

  return (
    <SectionContainer title={app.projectPage.feedbackMetrics.title}>
      {metrics.map(({ title, icon, value }) => (
        <Flex key={title} justify="space-between" align="center">
          <Flex gap={2} align="center">
            <Icon src={icon} />

            <Text color="foreground.muted">{title}</Text>
          </Flex>

          <Skeleton isLoaded={isLoaded} minW={8}>
            <Text fontSize={{ base: "sm", lg: "md" }} textAlign="right">
              {isError ? 0 : value}
            </Text>
          </Skeleton>
        </Flex>
      ))}
    </SectionContainer>
  );
};

export default FeedbackMetrics;
