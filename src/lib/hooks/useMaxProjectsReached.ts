/** @knipignore */

import { useQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";

import { workspaceMetricsOptions } from "@/lib/options/workspaces";

const FREE_TIER_MAX_PROJECTS = 2;
const BASIC_TIER_MAX_PROJECTS = 10;

/**
 * Hook to check if the maximum number of projects has been reached for the current tier.
 * Returns true if the limit is reached, false otherwise.
 */
const useMaxProjectsReached = () => {
  const { workspaceId, hasBasicTierPrivileges, hasTeamTierPrivileges } =
    useRouteContext({
      from: "/_public/workspaces/$workspaceSlug/_layout",
    });

  const { data: metrics, isLoading } = useQuery({
    ...workspaceMetricsOptions({ workspaceId: workspaceId! }),
    enabled: !!workspaceId,
  });

  // Allow project creation while data is loading
  if (isLoading) return false;

  const totalProjects = metrics?.projects?.totalCount ?? 0;

  // Team tier has unlimited projects
  if (hasTeamTierPrivileges) return false;

  // Basic tier limit
  if (hasBasicTierPrivileges) {
    return totalProjects >= BASIC_TIER_MAX_PROJECTS;
  }

  // Free tier limit
  return totalProjects >= FREE_TIER_MAX_PROJECTS;
};

export default useMaxProjectsReached;
