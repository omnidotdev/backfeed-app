import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import MAX_NUMBER_OF_PROJECTS from "@/lib/constants/numberOfProjects.constant";
import billing from "@/lib/providers/billing";
import { authMiddleware } from "@/server/middleware";

import type { EntitlementsResponse } from "@/lib/providers/billing";

/** Feature keys for Backfeed entitlements */
export const FeatureKey = {
  MaxProjects: "max_projects",
  MaxUniqueUsers: "max_unique_users",
  MaxComments: "max_comments",
} as const;

/** FALLBACK ONLY -- source of truth is Omni API plan_feature */
const FALLBACK_LIMITS: Record<string, number> = {
  [FeatureKey.MaxProjects]: MAX_NUMBER_OF_PROJECTS,
  [FeatureKey.MaxUniqueUsers]: 15,
  [FeatureKey.MaxComments]: 100,
};

const entitySchema = z.object({
  entityType: z.string(),
  entityId: z.string(),
  productId: z.string().optional(),
});

const checkEntitlementSchema = z.object({
  entityType: z.string(),
  entityId: z.string(),
  productId: z.string(),
  featureKey: z.string(),
});

const checkLimitSchema = z.object({
  organizationId: z.string(),
  featureKey: z.string(),
  currentCount: z.number(),
});

/**
 * Get all entitlements for an entity.
 */
export const getEntitlements = createServerFn()
  .inputValidator((data) => entitySchema.parse(data))
  .middleware([authMiddleware])
  .handler(async ({ data, context }): Promise<EntitlementsResponse | null> => {
    return billing.getEntitlements(
      data.entityType,
      data.entityId,
      data.productId,
      context.session.accessToken,
    );
  });

/**
 * Check if an entity has a specific entitlement.
 * Returns the entitlement value if found, null otherwise.
 */
export const checkEntitlement = createServerFn()
  .inputValidator((data) => checkEntitlementSchema.parse(data))
  .middleware([authMiddleware])
  .handler(async ({ data, context }): Promise<string | null> => {
    return billing.checkEntitlement(
      data.entityType,
      data.entityId,
      data.productId,
      data.featureKey,
      context.session.accessToken,
    );
  });

/**
 * Check whether an entity is within its entitlement limit for a given feature.
 * Falls back to hardcoded constants if Aether is unreachable.
 */
export const checkLimit = createServerFn()
  .inputValidator((data) => checkLimitSchema.parse(data))
  .middleware([authMiddleware])
  .handler(
    async ({
      data,
    }): Promise<{ allowed: boolean; limit: number; current: number }> => {
      const { organizationId, featureKey, currentCount } = data;

      let limit: number;

      try {
        const value = await billing.checkEntitlement(
          "backfeed/organization",
          organizationId,
          "backfeed",
          featureKey,
        );

        limit = value ? Number(value) : (FALLBACK_LIMITS[featureKey] ?? 0);
      } catch {
        // FALLBACK ONLY -- use hardcoded limit when Aether is unreachable
        limit = FALLBACK_LIMITS[featureKey] ?? 0;
      }

      return {
        allowed: currentCount < limit,
        limit,
        current: currentCount,
      };
    },
  );
