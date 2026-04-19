import { queryOptions } from "@tanstack/react-query";

import { checkLimit } from "@/server/functions/entitlements";

/**
 * Query options for checking an entitlement limit via Aether.
 * Falls back to hardcoded constants if Aether is unreachable.
 */
export const checkLimitOptions = ({
  organizationId,
  featureKey,
  currentCount,
}: {
  organizationId: string;
  featureKey: string;
  currentCount: number;
}) =>
  queryOptions({
    queryKey: ["entitlement", "checkLimit", organizationId, featureKey],
    queryFn: () =>
      checkLimit({
        data: { organizationId, featureKey, currentCount },
      }),
    staleTime: 60 * 1000,
  });
