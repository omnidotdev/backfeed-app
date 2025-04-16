import { cache } from "react";

import { getSdk } from "lib/graphql";

import type { Organization } from "generated/graphql";
import type { Session } from "next-auth";

interface ProjectOptions {
  session: Session;
  organizationSlug: Organization["slug"];
}

const getOrganization = cache(
  async ({ session, organizationSlug }: ProjectOptions) => {
    const sdk = getSdk({ session });

    const { organizationBySlug: organization } = await sdk.Organization({
      slug: organizationSlug,
    });

    return organization;
  }
);

export default getOrganization;
