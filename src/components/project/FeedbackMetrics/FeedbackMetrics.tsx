"use client";

import { Flex, Text, Icon } from "@omnidev/sigil";
import { HiOutlineFolder } from "react-icons/hi2";
import { PiArrowFatLineUpFill } from "react-icons/pi";

import { SectionContainer } from "components/layout";
import { app } from "lib/config";

/**
 * Feedback metrics for a project.
 */
const FeedbackMetrics = () => {
  const metrics = [
    {
      title: app.projectPage.feedbackMetrics.totalFeedback,
      icon: HiOutlineFolder,
      value: "69",
    },
    {
      title: app.projectPage.feedbackMetrics.totalUpvotes,
      icon: PiArrowFatLineUpFill,
      value: "69",
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

          <Text>{value}</Text>
        </Flex>
      ))}
    </SectionContainer>
  );
};

export default FeedbackMetrics;
