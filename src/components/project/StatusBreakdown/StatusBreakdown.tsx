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
  // TODO: discuss scalability of this. If a project has a large number of posts, this query may become slow.
  const { data: breakdown } = useStatusBreakdownQuery(
    {
      projectId,
    },
    {
      select: (data) =>
        data?.project?.postStatuses?.nodes?.map((status) => {
          const numberOfPosts = data?.project?.posts?.nodes?.filter(
            (post) => post?.status?.status === status?.status
          ).length;

          return {
            status: status?.status,
            count: numberOfPosts,
          };
        }),
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
