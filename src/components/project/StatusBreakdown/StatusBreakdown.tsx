"use client";

import { Badge, Flex, Text } from "@omnidev/sigil";

import { SectionContainer } from "components/layout";
import { app } from "lib/config";

// TODO: Discuss status breakdown and how it should be implemented.

/**
 * Feedback status breakdown for a project. Shows the number of feedback items in each status.
 */
const StatusBreakdown = () => {
  const breakdown = [
    {
      status: app.projectPage.statusBreakdown.status.new,
      count: 69,
    },
    {
      status: app.projectPage.statusBreakdown.status.planned,
      count: 69,
    },
    {
      status: app.projectPage.statusBreakdown.status.inProgress,
      count: 69,
    },
    {
      status: app.projectPage.statusBreakdown.status.completed,
      count: 69,
    },
  ];

  return (
    <SectionContainer title={app.projectPage.statusBreakdown.title}>
      {breakdown.map(({ status, count }) => (
        <Flex key={status} justifyContent="space-between" align="center">
          <Badge>{status}</Badge>

          <Text>{count}</Text>
        </Flex>
      ))}
    </SectionContainer>
  );
};

export default StatusBreakdown;
