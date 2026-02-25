import { createFlagProvider } from "@omnidotdev/providers";

import { FLAGS_API_HOST, FLAGS_CLIENT_KEY } from "@/lib/config/env.config";

export const flags = createFlagProvider(
  FLAGS_API_HOST
    ? {
        provider: "unleash",
        url: FLAGS_API_HOST,
        apiKey: FLAGS_CLIENT_KEY!,
        appName: "backfeed",
      }
    : {},
);
