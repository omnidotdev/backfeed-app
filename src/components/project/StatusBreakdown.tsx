import { Checkbox, Flex, HStack, Text } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useNavigate, useSearch } from "@tanstack/react-router";
import { useDebounceCallback } from "usehooks-ts";

import StatusBadge from "@/components/core/StatusBadge";
import SectionContainer from "@/components/layout/SectionContainer";
import app from "@/lib/config/app.config";
import DEBOUNCE_TIME from "@/lib/constants/debounceTime.constant";
import {
  projectStatusesOptions,
  statusBreakdownOptions,
} from "@/lib/options/projects";

import type { CheckboxCheckedChangeDetails } from "@ark-ui/react";
import type { StatusTemplate } from "@/generated/graphql";

interface Status {
  /** Status template ID. */
  rowId: StatusTemplate["rowId"] | undefined;
  /** Status template name. */
  name: StatusTemplate["name"] | undefined;
  /** Status template display name. */
  displayName: StatusTemplate["displayName"] | undefined;
  /* Status template color. */
  color: StatusTemplate["color"];
}

/**
 * Feedback status breakdown for a project.
 */
const StatusBreakdown = () => {
  const { workspaceId, projectId } = useLoaderData({
    from: "/_public/workspaces/$workspaceSlug/_layout/projects/$projectSlug/",
  });

  const excludedStatuses = useSearch({
    from: "/_public/workspaces/$workspaceSlug/_layout/projects/$projectSlug/",
    select: ({ excludedStatuses }) => excludedStatuses,
  });
  const navigate = useNavigate({
    from: "/workspaces/$workspaceSlug/projects/$projectSlug",
  });

  const handleToggleStatus = useDebounceCallback(
    ({ checked }: CheckboxCheckedChangeDetails, status: Status) => {
      // NB: we must filter the statuses regardless of checked status to prevent adding duplicates of the same status to the search params.
      const filteredStatuses = excludedStatuses.filter(
        (s) => s !== status?.name!,
      );

      checked
        ? navigate({
            search: (prev) => ({
              ...prev,
              excludedStatuses: filteredStatuses,
            }),
          })
        : navigate({
            search: (prev) => ({
              ...prev,
              // NB: the sort method is used to stabilize the array order. This helps with query key management to avoid having multiple keys that point to the same data
              excludedStatuses: [...filteredStatuses, status?.name!].sort(),
            }),
          });
    },
    DEBOUNCE_TIME,
  );

  const { data: projectStatuses } = useQuery({
    ...projectStatusesOptions({
      workspaceId,
    }),
    select: (data) =>
      data?.statusTemplates?.nodes?.map((status) => ({
        rowId: status?.rowId,
        name: status?.name,
        displayName: status?.displayName,
        color: status?.color,
      })),
  });

  const { data: breakdown } = useQuery({
    ...statusBreakdownOptions({
      projectId,
    }),
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
  });

  return (
    <SectionContainer
      title={app.projectPage.statusBreakdown.title}
      titleProps={{ fontSize: "md" }}
    >
      {breakdown?.map(({ status, count }) => (
        <Flex key={status?.rowId} justifyContent="space-between" align="center">
          <HStack>
            <Checkbox
              defaultChecked={!excludedStatuses.includes(status?.name!)}
              onCheckedChange={(details) => handleToggleStatus(details, status)}
              size="sm"
              iconProps={{
                style: {
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
