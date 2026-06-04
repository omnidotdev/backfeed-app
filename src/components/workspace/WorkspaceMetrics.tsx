import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { HiOutlineChatBubbleLeftRight, HiOutlineFolder } from "react-icons/hi2";

import SectionContainer from "@/components/layout/SectionContainer";
import { Skeleton } from "@/components/ui/skeleton";
import app from "@/lib/config/app.config";
import { workspaceMetricsOptions } from "@/lib/options/workspaces";

import type { IconType } from "react-icons";

const workspaceLayoutRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout/",
);

interface WorkspaceMetric {
  /** Human-readable title. */
  title: string;
  /** Actual metric value. */
  value: number;
  /** Visual icon. */
  icon: IconType;
}

/**
 * Workspace metrics.
 */
const WorkspaceMetrics = () => {
  const { organizationId } = workspaceLayoutRoute.useRouteContext();

  const {
    data: workspaceMetrics,
    isLoading,
    isError,
  } = useQuery({
    ...workspaceMetricsOptions({
      organizationId,
    }),
    select: (data) => ({
      totalProjects: data?.projects?.totalCount,
      totalPosts: data?.posts?.totalCount,
    }),
  });

  const WORKSPACE_METRICS: WorkspaceMetric[] = [
    {
      title: app.workspacePage.metrics.data.totalProjects.title,
      value: workspaceMetrics?.totalProjects ?? 0,
      icon: HiOutlineFolder,
    },
    {
      title: app.workspacePage.metrics.data.totalPosts.title,
      value: workspaceMetrics?.totalPosts ?? 0,
      icon: HiOutlineChatBubbleLeftRight,
    },
  ];

  return (
    <SectionContainer
      title={app.workspacePage.metrics.title}
      description={app.workspacePage.metrics.description}
    >
      <div className="grid h-full">
        {WORKSPACE_METRICS.map(({ title, value, icon: MetricIcon }) => (
          <div key={title} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MetricIcon className="size-4" />

              <span className="text-foreground-muted text-sm lg:text-base">
                {title}
              </span>
            </div>

            {isLoading ? (
              <Skeleton className="h-5 w-8" />
            ) : (
              <span className="text-right text-sm lg:text-base">
                {isError ? 0 : value}
              </span>
            )}
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default WorkspaceMetrics;
