"use client";

import { Checkbox, Flex, HStack, Text } from "@omnidev/sigil";
import { StatusBadge } from "components/core";
import { SectionContainer } from "components/layout";
import {
  useProjectStatusesQuery,
  useStatusBreakdownQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { DEBOUNCE_TIME } from "lib/constants";
import { useSearchParams } from "lib/hooks";
import { useDebounceCallback } from "usehooks-ts";

import type { CheckboxCheckedChangeDetails } from "@ark-ui/react";
import type { PostStatus, Project } from "generated/graphql";

interface Status {
  /** Feedback status ID. */
  rowId: PostStatus["rowId"] | undefined;
  /** Feedback status. */
  status: PostStatus["status"] | undefined;
  /* Feedback status color. */
  color: PostStatus["color"];
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
            // NB: the sort method is used to stabilize the array order. This helps with query key management to avoid having multiple keys that point to the same data
            excludedStatuses: [...filteredStatuses, status?.status!].sort(),
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
    <SectionContainer
      title={app.projectPage.statusBreakdown.title}
      titleProps={{ fontSize: "md" }}
    >
      {breakdown?.map(({ status, count }) => (
        <Flex key={status?.rowId} justifyContent="space-between" align="center">
          <HStack>
            <Checkbox
              defaultChecked={!excludedStatuses.includes(status?.status!)}
              onCheckedChange={(details) => handleToggleStatus(details, status)}
              size="sm"
              // @ts-expect-error TODO: Update Sigil component to remove required `src` prop
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

          <Text fontSize="sm">{count}</Text>
        </Flex>
      ))}
    </SectionContainer>
  );
};

export default StatusBreakdown;
