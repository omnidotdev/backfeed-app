import { Flex, Text, css } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import Color from "colorjs.io";

import {
  projectStatusesOptions,
  statusBreakdownOptions,
} from "@/lib/options/projects";

import type { FlexProps } from "@omnidev/sigil";
import type { StatusTemplate } from "@/generated/graphql";

const projectRoute = getRouteApi(
  "/_public/workspaces/$workspaceSlug/_layout/projects/$projectSlug/",
);

interface Status {
  rowId: StatusTemplate["rowId"] | undefined;
  name: StatusTemplate["name"] | undefined;
  displayName: StatusTemplate["displayName"] | undefined;
  color: StatusTemplate["color"];
}

interface StatusFilterPillsProps extends FlexProps {}

/**
 * Get background color with opacity from status color.
 */
const getBackgroundColor = (
  color: string | null | undefined,
  opacity = 0.15,
): string | undefined => {
  if (!color) return undefined;
  try {
    const parsed = new Color(color);
    parsed.alpha = opacity;
    return parsed.toString({ format: "rgba" });
  } catch {
    return undefined;
  }
};

/**
 * Horizontal status filter pills for filtering feedback by status.
 */
const StatusFilterPills = ({ ...rest }: StatusFilterPillsProps) => {
  const { projectId } = projectRoute.useLoaderData();
  const { organizationId } = projectRoute.useRouteContext();

  const excludedStatuses = projectRoute.useSearch({
    select: ({ excludedStatuses }) => excludedStatuses,
  });
  const navigate = useNavigate({
    from: "/workspaces/$workspaceSlug/projects/$projectSlug",
  });

  const { data: projectStatuses } = useQuery({
    ...projectStatusesOptions({
      organizationId,
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

  const handleToggleStatus = (status: Status) => {
    const isExcluded = excludedStatuses.includes(status?.displayName!);
    const filteredStatuses = excludedStatuses.filter(
      (s) => s !== status?.displayName!,
    );

    if (isExcluded) {
      // Currently excluded, so include it (remove from excluded list)
      navigate({
        search: (prev) => ({
          ...prev,
          excludedStatuses: filteredStatuses,
        }),
      });
    } else {
      // Currently included, so exclude it (add to excluded list)
      navigate({
        search: (prev) => ({
          ...prev,
          excludedStatuses: [...filteredStatuses, status?.displayName!].sort(),
        }),
      });
    }
  };

  const handleToggleAll = () => {
    const allStatusDisplayNames =
      projectStatuses?.map((s) => s.displayName!).filter(Boolean) ?? [];
    const allExcluded = allStatusDisplayNames.every((displayName) =>
      excludedStatuses.includes(displayName),
    );

    if (allExcluded || excludedStatuses.length > 0) {
      // Some or all are excluded, show all
      navigate({
        search: (prev) => ({
          ...prev,
          excludedStatuses: [],
        }),
      });
    } else {
      // All are shown, exclude all
      navigate({
        search: (prev) => ({
          ...prev,
          excludedStatuses: allStatusDisplayNames.sort(),
        }),
      });
    }
  };

  if (!breakdown?.length) return null;

  const allActive = excludedStatuses.length === 0;

  return (
    <Flex
      gap={2}
      wrap="wrap"
      py={3}
      borderBottomWidth="1px"
      borderColor={{ base: "neutral.100", _dark: "neutral.800" }}
      {...rest}
    >
      {/* Toggle All pill */}
      <Flex
        align="center"
        gap={1.5}
        px={3}
        py={1}
        borderRadius="full"
        cursor="pointer"
        userSelect="none"
        bgColor={
          allActive
            ? { base: "primary/10", _dark: "primary/15" }
            : { base: "neutral.100", _dark: "neutral.800" }
        }
        onClick={handleToggleAll}
        className={css({
          transition: "all 0.15s ease",
          _hover: {
            bgColor: allActive ? "primary/15" : "neutral.200",
          },
        })}
      >
        <Text
          fontSize="sm"
          fontWeight="medium"
          whiteSpace="nowrap"
          color={allActive ? "primary" : "foreground.muted"}
        >
          All
        </Text>
      </Flex>

      {breakdown.map(({ status, count }) => {
        const isActive = !excludedStatuses.includes(status?.displayName!);
        const bgColor = getBackgroundColor(
          status?.color,
          isActive ? 0.12 : 0.05,
        );
        const countBgColor = getBackgroundColor(
          status?.color,
          isActive ? 0.2 : 0.1,
        );

        return (
          <Flex
            key={status?.rowId}
            align="center"
            gap={2}
            pl={3}
            pr={1}
            py={1}
            borderRadius="full"
            cursor="pointer"
            userSelect="none"
            onClick={() => handleToggleStatus(status)}
            className={css({
              transition: "all 0.15s ease",
              _hover: {
                opacity: 0.85,
              },
            })}
            style={{
              backgroundColor: isActive ? bgColor : "var(--colors-neutral-100)",
              opacity: isActive ? 1 : 0.7,
            }}
          >
            <Text
              fontSize="sm"
              fontWeight="medium"
              whiteSpace="nowrap"
              color={isActive ? undefined : "foreground.muted"}
              style={{
                color: isActive ? (status?.color ?? undefined) : undefined,
              }}
            >
              {status?.displayName ?? "Unknown"}
            </Text>

            <Flex
              align="center"
              justify="center"
              minW={5}
              h={5}
              borderRadius="full"
              fontSize="xs"
              fontWeight="semibold"
              style={{
                backgroundColor: countBgColor,
                color: isActive ? (status?.color ?? undefined) : undefined,
              }}
            >
              {count}
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default StatusFilterPills;
