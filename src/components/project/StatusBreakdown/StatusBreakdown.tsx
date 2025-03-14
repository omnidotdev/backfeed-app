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
      select: (data) => ({
        new: data?.new?.totalCount ?? 0,
        planned: data?.planned?.totalCount ?? 0,
        in_progress: data?.in_progress?.totalCount ?? 0,
        completed: data?.completed?.totalCount ?? 0,
        closed: data?.closed?.totalCount ?? 0,
      }),
    }
  );

  // TODO: determine if this is fine with the prefetch from the server
  if (!breakdown) return null;

  return (
    <SectionContainer title={app.projectPage.statusBreakdown.title}>
      {Object.entries(breakdown).map(([key, value]) => (
        <Flex key={key} justifyContent="space-between" align="center">
          <Badge>{convertFromSnakeCase(key)}</Badge>

          <Text>{value}</Text>
        </Flex>
      ))}
    </SectionContainer>
  );
};

export default StatusBreakdown;
