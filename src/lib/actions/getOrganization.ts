import { cache } from "react";

import { getSdk } from "lib/graphql";
import { getAuthSession } from "lib/util";

import type { Organization } from "generated/graphql";

interface OrganizationOptions {
  /** Organization slug. */
  organizationSlug: Organization["slug"];
}

/**
 * Helper function to fetch an organization's details. Cached for deduping requests.
 */
const getOrganization = cache(
  async ({ organizationSlug }: OrganizationOptions) => {
    const session = await getAuthSession();

    // if (!session) return null;

    const sdk = getSdk({ session });

    const { organizationBySlug: organization } = await sdk.Organization({
      slug: organizationSlug,
    });

    return organization;
  },
);

export default getOrganization;
