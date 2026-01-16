import { startUnleash } from "unleash-client";

import { FLAGS_API_HOST, FLAGS_CLIENT_KEY } from "@/lib/config/env.config";

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
 * Check if a feature flag is enabled.
 * Returns the default value if the client is not configured or an error occurs.
 */
export const isEnabled = async (
  flagKey: string,
  defaultValue = false,
): Promise<boolean> => {
  if (!FLAGS_CLIENT_KEY) return defaultValue;

  try {
    const client = await getFlagClient();
    return client.isEnabled(flagKey);
  } catch {
    return defaultValue;
  }
};
