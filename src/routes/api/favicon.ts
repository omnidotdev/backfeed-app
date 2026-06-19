import { createFileRoute } from "@tanstack/react-router";

import { resolveFavicon } from "@/lib/server/resolveFavicon";

/** Cache a resolved favicon for a day in the browser and a week at the edge. */
const HIT_CACHE_CONTROL = "public, max-age=86400, s-maxage=604800, immutable";

/** Briefly cache misses so a site without a favicon is not re-fetched on every render. */
const MISS_CACHE_CONTROL = "public, max-age=600";

/**
 * Favicon caching proxy. Resolves a site's real favicon server-side (see
 * resolveFavicon) and serves it from our own origin, so public pages render the
 * actual site icon without leaking visited domains to a third-party service.
 */
export const Route = createFileRoute("/api/favicon")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const target = new URL(request.url).searchParams.get("url");
        if (!target) return new Response("Missing url", { status: 400 });

        const icon = await resolveFavicon(target).catch(() => null);
        if (!icon)
          return new Response("Not found", {
            status: 404,
            headers: { "Cache-Control": MISS_CACHE_CONTROL },
          });

        return new Response(icon.body as unknown as BodyInit, {
          headers: {
            "Content-Type": icon.contentType,
            "Cache-Control": HIT_CACHE_CONTROL,
          },
        });
      },
    },
  },
});
