import { getSdk } from "lib/graphql";
import { getAuthSession } from "lib/util";
import type { Organization } from "generated/graphql";

const PAGE_SIZE = 6;

interface OrganizationOptions {
  /** Organization slug. */
  organizationSlug: Organization["slug"];
  /** Exclude projects. */
  excludeProjects?: string;
}

const getOrganizationProjects = async ({
  organizationSlug,
  excludeProjects,
}: OrganizationOptions) => {
  const session = await getAuthSession();

  if (!session) return null;

  const sdk = getSdk({ session });

  const { projects: organizationProjects } = await sdk.Projects({
    organizationSlug: organizationSlug!,
    excludeProjects,
  });

  return organizationProjects;
};

export default getOrganizationProjects;
