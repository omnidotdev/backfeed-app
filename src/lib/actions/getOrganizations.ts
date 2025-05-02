import { cache } from "react";

import { getSdk } from "lib/graphql";
import { getAuthSession } from "lib/util";

import { Role } from "generated/graphql";

/**
 * Helper function to fetch an organization's details. Cached for deduping requests.
 */
const getOrganizations = cache(async () => {
  const session = await getAuthSession();

  if (!session) return null;

  const sdk = getSdk({ session });

  const { organizations } = await sdk.Organizations({
    userId: session.user?.rowId!,
    isMember: false,
    excludeRoles: [Role.Member],
  });

  if (!organizations) return null;

  return organizations?.nodes;
});

export default getOrganizations;
