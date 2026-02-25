import { createServerFn } from "@tanstack/react-start";

import { flags } from "@/lib/providers";

import type { FlagContext } from "@omnidotdev/providers";

export const FLAGS = {
  MAINTENANCE: "backfeed-app-maintenance-mode",
} as const;

/**
 * Fetch the value of the maintenance mode feature flag.
 * Accepts optional user context for admin bypass evaluation.
 *
 * @param context - User context (email) for Unleash constraint evaluation.
 *                  @omni.dev users bypass maintenance mode via Unleash strategy.
 */
export const fetchMaintenanceMode = createServerFn({ method: "GET" })
  .inputValidator((data: FlagContext | undefined) => data)
  .handler(async ({ data: context }) => {
    const isMaintenanceMode = await flags.isEnabled(FLAGS.MAINTENANCE, context);
    return { isMaintenanceMode };
  });
