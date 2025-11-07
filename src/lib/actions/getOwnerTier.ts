import { Tier } from "generated/graphql";
import { getOrganization } from "lib/actions";

import type { Organization } from "generated/graphql";

interface Options {
  /** Organization slug. */
  organizationSlug: Organization["slug"];
}

/**
 * Fetch an organization owner's tier details. Cached for deduping requests.
 */
const getOwnerTier = async ({ organizationSlug }: Options) => {
  const organization = await getOrganization({ organizationSlug });

  const organizationOwnerTier = organization?.members.nodes[0]?.user?.tier;

  const hasBasicTierPrivileges =
    (organizationOwnerTier && organizationOwnerTier !== Tier.Free) ?? false;

  return {
    isOwnerSubscribed: !!organizationOwnerTier,
    hasBasicTierPrivileges,
    hasTeamTierPrivileges:
      hasBasicTierPrivileges && organizationOwnerTier !== Tier.Basic,
  };
};

export default getOwnerTier;
