import capitalizeFirstLetter from "./capitalizeFirstLetter";

import type { EntitlementsResponse } from "@/lib/providers/billing";

/**
 * Extract the plan tier from an entitlements response.
 *
 * The tier lives in the entitlement whose `featureKey` is `tier`; its value is
 * JSONB-quoted (e.g. `"pro"`), so the surrounding quotes are stripped.
 * @param entitlements - Entitlements response from Aether.
 * @returns Capitalized tier name (e.g. "Free", "Pro") or null if unavailable.
 */
const getTierFromEntitlements = (
  entitlements: EntitlementsResponse | null | undefined,
): string | null => {
  const raw = entitlements?.entitlements?.find(
    (e) => e.featureKey === "tier",
  )?.value;

  if (!raw) return null;

  const stripped = String(raw).replace(/^"|"$/g, "");

  return capitalizeFirstLetter(stripped) ?? null;
};

export default getTierFromEntitlements;
