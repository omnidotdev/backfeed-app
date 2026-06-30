import { useQuery } from "@tanstack/react-query";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import Color from "colorjs.io";

import {
  projectStatusesOptions,
  statusBreakdownOptions,
} from "@/lib/options/projects";
import cn from "@/lib/utils";

import type { ComponentProps } from "react";
import type { StatusTemplate } from "@/generated/graphql";

const projectRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout/projects/$projectSlug/",
);

interface Status {
  rowId: StatusTemplate["rowId"] | undefined;
  name: StatusTemplate["name"] | undefined;
  displayName: StatusTemplate["displayName"] | undefined;
  color: StatusTemplate["color"];
}

interface StatusFilterPillsProps extends ComponentProps<"div"> {}

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
    const isExcluded = excludedStatuses.includes(status?.name!);
    const filteredStatuses = excludedStatuses.filter(
      (s) => s !== status?.name!,
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
          excludedStatuses: [...filteredStatuses, status?.name!].sort(),
        }),
      });
    }
  };

  const handleToggleAll = () => {
    const allStatusNames =
      projectStatuses?.map((s) => s.name!).filter(Boolean) ?? [];
    const allExcluded = allStatusNames.every((name) =>
      excludedStatuses.includes(name),
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
          excludedStatuses: allStatusNames.sort(),
        }),
      });
    }
  };

  if (!breakdown?.length) return null;

  const allActive = excludedStatuses.length === 0;

  return (
    <div
      className="flex flex-wrap gap-2 border-[var(--colors-neutral-100)] border-b py-3 dark:border-[var(--colors-neutral-800)]"
      {...rest}
    >
      {/* Toggle All pill */}
      <button
        type="button"
        onClick={handleToggleAll}
        className={cn(
          "flex cursor-pointer select-none items-center gap-1.5 rounded-full px-3 py-1 transition-all",
          allActive
            ? "bg-primary/10 hover:bg-primary/15 dark:bg-primary/15"
            : "bg-[var(--colors-neutral-100)] hover:bg-[var(--colors-neutral-200)] dark:bg-[var(--colors-neutral-800)]",
        )}
      >
        <span
          className={cn(
            "whitespace-nowrap font-medium text-sm",
            allActive ? "text-primary" : "text-muted-foreground",
          )}
        >
          All
        </span>
      </button>

      {breakdown.map(({ status, count }) => {
        const isActive = !excludedStatuses.includes(status?.name!);
        const bgColor = getBackgroundColor(
          status?.color,
          isActive ? 0.12 : 0.05,
        );
        const countBgColor = getBackgroundColor(
          status?.color,
          isActive ? 0.2 : 0.1,
        );

        return (
          <button
            type="button"
            key={status?.rowId}
            onClick={() => handleToggleStatus(status)}
            className="flex cursor-pointer select-none items-center gap-2 rounded-full py-1 pr-1 pl-3 transition-all hover:opacity-85"
            style={{
              backgroundColor: isActive ? bgColor : "var(--colors-neutral-100)",
              opacity: isActive ? 1 : 0.7,
            }}
          >
            <span
              className={cn(
                "whitespace-nowrap font-medium text-sm",
                !isActive && "text-muted-foreground",
              )}
              style={{
                color: isActive ? (status?.color ?? undefined) : undefined,
              }}
            >
              {status?.displayName ?? "Unknown"}
            </span>

            <span
              className="flex h-5 min-w-5 items-center justify-center rounded-full font-semibold text-xs"
              style={{
                backgroundColor: countBgColor,
                color: isActive ? (status?.color ?? undefined) : undefined,
              }}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default StatusFilterPills;
