"use client";

import { Flex, Text } from "@omnidev/sigil";

import { StatusBadge } from "components/core";
import { SectionContainer } from "components/layout";
import {
  useProjectStatusesQuery,
  useStatusBreakdownQuery,
} from "generated/graphql";
import { app } from "lib/config";

import type { Project } from "generated/graphql";

interface Props {
  /** Project ID. */
  projectId: Project["rowId"];
}

/**
 * Feedback status breakdown for a project. Shows the number of feedback items in each status.
 */
const StatusBreakdown = ({ projectId }: Props) => {
  const { data: projectStatuses } = useProjectStatusesQuery(
    {
      projectId,
    },
    {
      select: (data) =>
        data?.postStatuses?.nodes?.map((status) => ({
          rowId: status?.rowId,
          status: status?.status,
        })),
    }
  );

  const { data: breakdown } = useStatusBreakdownQuery(
    {
      projectId,
    },
    {
      enabled: !!projectStatuses?.length,
      select: (data) =>
        projectStatuses?.map((status) => {
          const count =
            data?.posts?.groupedAggregates?.find(
              ({ keys }) => keys?.[0] === status?.rowId
            )?.distinctCount?.rowId ?? 0;

          return {
            status: status,
            count,
          };
        }),
    }
  );

  return (
    <SectionContainer title={app.projectPage.statusBreakdown.title}>
      {breakdown?.map(({ status, count }) => (
        <Flex key={status?.rowId} justifyContent="space-between" align="center">
          <StatusBadge status={status!} />

          <Text>{count}</Text>
        </Flex>
      ))}
    </SectionContainer>
  );
};

export default StatusBreakdown;
