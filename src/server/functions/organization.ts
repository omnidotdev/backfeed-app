import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { AUTH_BASE_URL } from "@/lib/config/env.config";

export interface PublicOrganization {
  id: string;
  name: string;
  slug: string;
  type: "personal" | "team";
}

const slugSchema = z.object({
  slug: z.string(),
});

/**
 * Fetch organization by slug from the IDP.
 * Used for unauthenticated public workspace access.
 */
export const fetchOrganizationBySlug = createServerFn()
  .inputValidator((data) => slugSchema.parse(data))
  .handler(async ({ data }): Promise<PublicOrganization | null> => {
    try {
      const response = await fetch(
        `${AUTH_BASE_URL}/api/organization/by-slug/${encodeURIComponent(data.slug)}`,
      );

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Failed to fetch organization: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error("Error fetching organization by slug:", error);
      return null;
    }
  });
