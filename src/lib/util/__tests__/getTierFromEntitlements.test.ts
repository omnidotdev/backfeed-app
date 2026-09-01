import { describe, expect, it } from "bun:test";

import getTierFromEntitlements from "../getTierFromEntitlements";

import type { EntitlementsResponse } from "@/lib/providers/billing";

const makeResponse = (
  entitlements: EntitlementsResponse["entitlements"],
): EntitlementsResponse => ({
  billingAccountId: "acct_1",
  entityType: "backfeed/organization",
  entityId: "org_1",
  entitlementVersion: 1,
  entitlements,
});

const tierEntitlement = (value: string | null) => ({
  id: "ent_tier",
  productId: "backfeed",
  featureKey: "tier",
  value,
  source: "manual",
  validFrom: "2026-01-01T00:00:00.000Z",
  validUntil: null,
});

describe("getTierFromEntitlements", () => {
  it("extracts and capitalizes the tier from a JSONB-quoted value", () => {
    expect(
      getTierFromEntitlements(makeResponse([tierEntitlement('"pro"')])),
    ).toBe("Pro");
  });

  it("handles an unquoted tier value", () => {
    expect(
      getTierFromEntitlements(makeResponse([tierEntitlement("team")])),
    ).toBe("Team");
  });

  it("finds the tier entitlement among other feature keys", () => {
    expect(
      getTierFromEntitlements(
        makeResponse([
          {
            id: "ent_projects",
            productId: "backfeed",
            featureKey: "max_projects",
            value: "10",
            source: "plan",
            validFrom: "2026-01-01T00:00:00.000Z",
            validUntil: null,
          },
          tierEntitlement('"free"'),
        ]),
      ),
    ).toBe("Free");
  });

  it("returns null when no tier entitlement is present", () => {
    expect(
      getTierFromEntitlements(
        makeResponse([
          {
            id: "ent_projects",
            productId: "backfeed",
            featureKey: "max_projects",
            value: "10",
            source: "plan",
            validFrom: "2026-01-01T00:00:00.000Z",
            validUntil: null,
          },
        ]),
      ),
    ).toBeNull();
  });

  it("returns null for a null/empty tier value", () => {
    expect(
      getTierFromEntitlements(makeResponse([tierEntitlement(null)])),
    ).toBeNull();
    expect(
      getTierFromEntitlements(makeResponse([tierEntitlement("")])),
    ).toBeNull();
  });

  it("returns null for a null or undefined response", () => {
    expect(getTierFromEntitlements(null)).toBeNull();
    expect(getTierFromEntitlements(undefined)).toBeNull();
  });
});
