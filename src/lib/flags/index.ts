import { GrowthBook } from "@growthbook/growthbook";

import {
  FLAGS_API_HOST,
  FLAGS_CLIENT_KEY,
  isProdEnv,
} from "@/lib/config/env.config";
import { FLAGS, defaultFlags } from "./defaults";

export { FLAGS };

/**
 * Get the value of a feature flag with fallback to defaults.
 */
const getFlagValue = <T>(
  gb: GrowthBook,
  flagKey: string,
  fallback: T,
): T | boolean | string | number => {
  const value = gb.getFeatureValue(flagKey, undefined);

  if (value !== undefined) {
    return value;
  }

  // Fall back to default configuration
  const flagConfig = defaultFlags[flagKey];

  if (flagConfig) {
    return flagConfig.variants[flagConfig.defaultVariant] as T;
  }

  return fallback;
};

/**
 * Check if maintenance mode should be shown.
 * Session can be the extended session from getAuth or null.
 * The extended session has `user.id` from better-auth or `session.userId`.
 */
export const getIsMaintenanceMode = async (
  session: { user?: { id?: string }; session?: { userId?: string } } | null,
): Promise<boolean> => {
  // Always show the app in non-production environments
  if (!isProdEnv) {
    return false;
  }

  // Extract user ID from extended session structure
  const userId = session?.user?.id ?? session?.session?.userId ?? "anonymous";

  const gb = new GrowthBook({
    apiHost: FLAGS_API_HOST,
    clientKey: FLAGS_CLIENT_KEY,
    attributes: {
      id: userId,
      loggedIn: !!session,
    },
  });

  try {
    await gb.init({ timeout: 3000 });

    const isMaintenanceMode = getFlagValue(gb, FLAGS.MAINTENANCE, false);

    gb.destroy();

    return Boolean(isMaintenanceMode);
  } catch {
    gb.destroy();

    // Default to showing the app if flag fetching fails
    return false;
  }
};
