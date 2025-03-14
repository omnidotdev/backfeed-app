"use client";

import { Badge, Flex, Text } from "@omnidev/sigil";

import { SectionContainer } from "components/layout";
import { useStatusBreakdownQuery } from "generated/graphql";
import { app } from "lib/config";
import { convertFromSnakeCase } from "lib/util";

import type { Post } from "generated/graphql";

interface Props {
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
        data?.posts?.groupedAggregates?.map((aggregate) => ({
          status: aggregate.keys?.[0],
          count: aggregate.distinctCount?.rowId,
        })),
    }
  );

  return (
    <SectionContainer title={app.projectPage.statusBreakdown.title}>
      {breakdown?.map((aggregate) => (
        <Flex
          key={aggregate.status}
          justifyContent="space-between"
          align="center"
        >
          <Badge>{convertFromSnakeCase(aggregate.status!)}</Badge>

          <Text>{aggregate.count}</Text>
        </Flex>
      ))}
    </SectionContainer>
  );
};

export default StatusBreakdown;
