"use client";

import { Flex, Icon, Text } from "@omnidev/sigil";
import { HiOutlineFolder } from "react-icons/hi2";
import { TbHeartbeat } from "react-icons/tb";

import { SectionContainer } from "components/layout";
import { app } from "lib/config";

interface Props {
  /** Total feedback for the project. */
  totalFeedback: number;
  /** Total upvotes for the project posts. */
  totalEngagement: number;
  /** Whether loading the project data encountered an error. */
  isError?: boolean;
}

/**
 * Feedback metrics for a project.
 */
const FeedbackMetrics = ({
  totalFeedback,
  totalEngagement,
  isError,
}: Props) => {
  const metrics = [
    {
      title: app.projectPage.feedbackMetrics.totalFeedback,
      icon: HiOutlineFolder,
      value: totalFeedback,
    },
    {
      title: app.projectPage.feedbackMetrics.totalEngagement,
      icon: TbHeartbeat,
      value: totalEngagement,
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

          <Text fontSize={{ base: "sm", lg: "md" }} textAlign="right">
            {isError ? 0 : value}
          </Text>
        </Flex>
      ))}
    </SectionContainer>
  );
};

export default FeedbackMetrics;
