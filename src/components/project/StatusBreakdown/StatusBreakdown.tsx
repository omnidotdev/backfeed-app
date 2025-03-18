"use client";

import { Badge, Flex, Text } from "@omnidev/sigil";

import { SectionContainer } from "components/layout";
import { useStatusBreakdownQuery } from "generated/graphql";
import { app } from "lib/config";

import type { Post } from "generated/graphql";

interface Props {
  /** Project ID. */
  projectId: Post["projectId"];
}

/**
 * Feedback status breakdown for a project. Shows the number of feedback items in each status.
 */
const StatusBreakdown = ({ projectId }: Props) => {
  const { data: breakdown } = useStatusBreakdownQuery(
    {
      projectId,
    },
    {
      select: (data) =>
        data?.postStatuses?.groupedAggregates?.map((aggregate) => ({
          status: aggregate.keys?.[0],
          count: aggregate.distinctCount?.rowId,
        })),
    }
  );

  return (
    <SectionContainer title={app.projectPage.statusBreakdown.title}>
      {breakdown?.map(({ status, count }) => (
        <Flex key={status} justifyContent="space-between" align="center">
          <Badge>{status}</Badge>

          <Text>{count}</Text>
        </Flex>
      ))}
    </SectionContainer>
  );
};

export default StatusBreakdown;
