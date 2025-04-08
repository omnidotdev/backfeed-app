"use client";

import { Flex, Text } from "@omnidev/sigil";

import { StatusBadge } from "components/core";
import { SectionContainer } from "components/layout";
import { app } from "lib/config";

import type { Project } from "generated/graphql";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  projectStatusesQueryOptions,
  statusBreakdownQueryOptions,
} from "lib/react-query/options";

interface Props {
  /** Project ID. */
  projectId: Project["rowId"];
}

/**
 * Feedback status breakdown for a project. Shows the number of feedback items in each status.
 */
const StatusBreakdown = ({ projectId }: Props) => {
  const { data: projectStatuses } = useSuspenseQuery({
    ...projectStatusesQueryOptions({
      projectId,
    }),
    select: (data) =>
      data?.postStatuses?.nodes?.map((status) => ({
        rowId: status?.rowId,
        status: status?.status,
        color: status?.color,
      })),
  });

  const { data: breakdown } = useSuspenseQuery({
    ...statusBreakdownQueryOptions({
      projectId,
    }),
    select: (data) =>
      projectStatuses?.map((status) => {
        const count =
          data?.posts?.groupedAggregates?.find(
            ({ keys }) => keys?.[0] === status?.rowId
          )?.distinctCount?.rowId ?? 0;

        return {
          status,
          count,
        };
      }),
  });

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
