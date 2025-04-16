import { cache } from "react";

import { getSdk } from "lib/graphql";
import { getAuthSession } from "lib/util";

import type { Organization } from "generated/graphql";

interface ProjectOptions {
  organizationSlug: Organization["slug"];
}

const getOrganization = cache(async ({ organizationSlug }: ProjectOptions) => {
  const session = await getAuthSession();

  if (!session) return null;

  const sdk = getSdk({ session });

  const { organizationBySlug: organization } = await sdk.Organization({
    slug: organizationSlug,
  });

  return organization;
});

export default getOrganization;
