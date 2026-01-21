import { startUnleash } from "unleash-client";

import { FLAGS_API_HOST, FLAGS_CLIENT_KEY } from "@/lib/config/env.config";

import type { Context } from "unleash-client";

let flagClient: Awaited<ReturnType<typeof startUnleash>> | null = null;

/**
 * Get Unleash feature flag client (singleton).
 */
export const getFlagClient = async () => {
  if (flagClient) return flagClient;

  flagClient = await startUnleash({
    url: FLAGS_API_HOST!,
    appName: "backfeed",
    customHeaders: {
      Authorization: FLAGS_CLIENT_KEY!,
    },
  });

  return flagClient;
};

/**
 * User context for feature flag evaluation.
 * Used for user-targeted flags like maintenance mode bypass.
 */
export interface FlagContext {
  userId?: string;
  email?: string;
}

/**
 * Check if a feature flag is enabled.
 * Returns the default value if the client is not configured or an error occurs.
 *
 * @param flagKey - The feature flag key
 * @param defaultValue - Default value if flag evaluation fails
 * @param context - Optional user context for targeted flags (e.g., maintenance mode bypass for @omni.dev)
 */
export const isEnabled = async (
  flagKey: string,
  defaultValue = false,
  context?: FlagContext,
): Promise<boolean> => {
  if (!FLAGS_CLIENT_KEY) return defaultValue;

  try {
    const client = await getFlagClient();
    const unleashContext: Context | undefined = context
      ? {
          userId: context.userId,
          properties: context.email ? { email: context.email } : undefined,
        }
      : undefined;
    return client.isEnabled(flagKey, unleashContext);
  } catch {
    return defaultValue;
  }
};
