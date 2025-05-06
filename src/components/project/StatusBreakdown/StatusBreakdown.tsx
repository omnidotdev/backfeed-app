"use client";

import { Checkbox, Flex, HStack, Text } from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";

import { StatusBadge } from "components/core";
import { SectionContainer } from "components/layout";
import {
  useProjectStatusesQuery,
  useStatusBreakdownQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { useSearchParams } from "lib/hooks";

import type { Project } from "generated/graphql";

interface Props {
  /** Project ID. */
  projectId: Project["rowId"];
}

/**
 * Feedback status breakdown for a project.
 */
const StatusBreakdown = ({ projectId }: Props) => {
  const queryClient = useQueryClient();

  const [{ excludedStatuses }, setSearchParams] = useSearchParams();

  const { data: projectStatuses } = useProjectStatusesQuery(
    {
      projectId,
    },
    {
      select: (data) =>
        data?.postStatuses?.nodes?.map((status) => ({
          rowId: status?.rowId,
          status: status?.status,
          color: status?.color,
        })),
    },
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
              ({ keys }) => keys?.[0] === status?.rowId,
            )?.distinctCount?.rowId ?? 0;

          return {
            status,
            count,
          };
        }),
    },
  );

  return (
    <SectionContainer title={app.projectPage.statusBreakdown.title}>
      {breakdown?.map(({ status, count }) => (
        <Flex key={status?.rowId} justifyContent="space-between" align="center">
          <HStack>
            <Checkbox
              defaultChecked={!excludedStatuses.includes(status?.status!)}
              onCheckedChange={({ checked }) => {
                queryClient.invalidateQueries(
                  {
                    queryKey: ["Posts.infinite"],
                  },
                  { cancelRefetch: false },
                );

                checked
                  ? setSearchParams({
                      excludedStatuses: excludedStatuses.filter(
                        (s) => s !== status?.status!,
                      ),
                    })
                  : setSearchParams({
                      excludedStatuses: [...excludedStatuses, status?.status!],
                    });
              }}
              size="sm"
              // @ts-ignore TODO: Update Sigil component to support icon toggling in checkbox
              iconProps={{
                style: {
                  pointerEvents: "none",
                },
              }}
            />

            <StatusBadge status={status!} />
          </HStack>

          <Text>{count}</Text>
        </Flex>
      ))}
    </SectionContainer>
  );
};

export default StatusBreakdown;
