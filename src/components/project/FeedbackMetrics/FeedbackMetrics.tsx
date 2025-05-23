"use client";

import { Flex, Icon, Skeleton, Text } from "@omnidev/sigil";
import { HiOutlineFolder } from "react-icons/hi2";
import { TbHeartbeat } from "react-icons/tb";

import { SectionContainer } from "components/layout";
import { app } from "lib/config";

interface Props {
  /** Total feedback for the project. */
  totalFeedback: number;
  /** Total upvotes for the project posts. */
  totalEngagement: number;
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
  totalEngagement,
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
      title: app.projectPage.feedbackMetrics.totalEngagement,
      icon: TbHeartbeat,
      value: totalEngagement,
    },
  ];

  return (
    <SectionContainer
      title={app.projectPage.feedbackMetrics.title}
      titleProps={{ fontSize: "md" }}
    >
      {metrics.map(({ title, icon, value }) => (
        <Flex key={title} justify="space-between" align="center">
          <Flex gap={2} align="center">
            <Icon src={icon} />

            <Text color="foreground.muted" fontSize="sm">
              {title}
            </Text>
          </Flex>

          <Skeleton isLoaded={isLoaded} minW={8}>
            <Text fontSize="sm" textAlign="right">
              {isError ? 0 : value}
            </Text>
          </Skeleton>
        </Flex>
      ))}
    </SectionContainer>
  );
};

export default FeedbackMetrics;
