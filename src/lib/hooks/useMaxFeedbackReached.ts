/** @knipignore */

import { useQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";

import { workspaceMetricsOptions } from "@/lib/options/workspaces";

const FREE_TIER_MAX_FEEDBACK = 500;
const BASIC_TIER_MAX_FEEDBACK = 2000;

/**
 * Hook to check if the maximum number of feedback posts has been reached for the current tier.
 * Returns true if the limit is reached, false otherwise.
 */
const useMaxFeedbackReached = () => {
  const { workspaceId, hasBasicTierPrivileges, hasTeamTierPrivileges } =
    useRouteContext({
      from: "/_public/workspaces/$workspaceSlug/_layout",
    });

  const { data: metrics, isLoading } = useQuery({
    ...workspaceMetricsOptions({ workspaceId: workspaceId! }),
    enabled: !!workspaceId,
  });

  // Allow feedback creation while data is loading
  if (isLoading) return false;

  const totalFeedback = metrics?.posts?.totalCount ?? 0;

  // Team tier has unlimited feedback
  if (hasTeamTierPrivileges) return false;

  // Basic tier limit
  if (hasBasicTierPrivileges) {
    return totalFeedback >= BASIC_TIER_MAX_FEEDBACK;
  }

  // Free tier limit
  return totalFeedback >= FREE_TIER_MAX_FEEDBACK;
};

export default useMaxFeedbackReached;
