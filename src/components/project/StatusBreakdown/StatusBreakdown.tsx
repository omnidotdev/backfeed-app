"use client";

import { Badge, Flex, Text } from "@omnidev/sigil";

import { SectionContainer } from "components/layout";
import { useProjectQuery, useStatusBreakdownQuery } from "generated/graphql";
import { app } from "lib/config";

import type { Organization, Project } from "generated/graphql";
import { useEffect } from "react";

interface Props {
  /** Project ID. */
  projectId: Project["rowId"];
  /** Project slug. */
  projectSlug: Project["slug"];
  /** Organization slug. */
  organizationSlug: Organization["slug"];
}

/**
 * Feedback status breakdown for a project. Shows the number of feedback items in each status.
 */
const StatusBreakdown = ({
  projectId,
  projectSlug,
  organizationSlug,
}: Props) => {
  const { data: projectStatuses } = useProjectQuery(
    {
      projectSlug,
      organizationSlug,
    },
    {
      select: (data) =>
        data?.projects?.nodes?.[0]?.postStatuses?.nodes?.map((status) => ({
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
            status: status?.status,
            count,
          };
        }),
    }
  );

  useEffect(() => console.log(breakdown), [breakdown]);

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
