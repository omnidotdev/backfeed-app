"use client";

import { Checkbox, Flex, HStack, Text } from "@omnidev/sigil";
import { useDebounceCallback } from "usehooks-ts";

import { StatusBadge } from "components/core";
import { SectionContainer } from "components/layout";
import {
  useProjectStatusesQuery,
  useStatusBreakdownQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { DEBOUNCE_TIME } from "lib/constants";
import { useSearchParams } from "lib/hooks";

import type { CheckboxCheckedChangeDetails } from "@ark-ui/react";
import type { Project } from "generated/graphql";

interface Status {
  rowId: string | undefined;
  status: string | undefined;
  color: string | null | undefined;
}

interface Props {
  /** Project ID. */
  projectId: Project["rowId"];
}

/**
 * Feedback status breakdown for a project.
 */
const StatusBreakdown = ({ projectId }: Props) => {
  const [{ excludedStatuses }, setSearchParams] = useSearchParams();

  const handleToggleStatus = useDebounceCallback(
    ({ checked }: CheckboxCheckedChangeDetails, status: Status) => {
      // NB: we must filter the statuses regardless of checked status to prevent adding duplicates of the same status to the search params.
      const filteredStatuses = excludedStatuses.filter(
        (s) => s !== status?.status!,
      );

      checked
        ? setSearchParams({
            excludedStatuses: filteredStatuses,
          })
        : setSearchParams({
            excludedStatuses: [...filteredStatuses, status?.status!],
          });
    },
    DEBOUNCE_TIME,
  );

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
              onCheckedChange={(details) => handleToggleStatus(details, status)}
              size="sm"
              // @ts-ignore TODO: Update Sigil component to remove required `src` prop
              iconProps={{
                style: {
                  // TODO: Update Sigil component to support icon toggling in checkbox
                  pointerEvents: "none",
                  height: 12,
                  width: 12,
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
