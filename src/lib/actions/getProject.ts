import { getSdk } from "lib/graphql";
import { getAuthSession } from "lib/util";
import { cache } from "react";

import type { Organization, Project } from "generated/graphql";

interface ProjectOptions {
  /** Slug of the organization that the project is a part of. */
  organizationSlug: Organization["slug"];
  /** Project slug. */
  projectSlug: Project["slug"];
}

/**
 * Fetch a project's details. Cached for deduping requests.
 */
const getProject = cache(
  async ({ organizationSlug, projectSlug }: ProjectOptions) => {
    const session = await getAuthSession();

    if (!session) return null;

    const sdk = getSdk({ session });

    const { projects } = await sdk.Project({
      projectSlug,
      organizationSlug,
      userId: session.user.rowId!,
    });

    return projects?.nodes?.[0];
  },
);

export default getProject;
