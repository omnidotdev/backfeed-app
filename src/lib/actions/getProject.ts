import { cache } from "react";

import { getSdk } from "lib/graphql";
import { getAuthSession } from "lib/util";

import type { Organization, Project } from "generated/graphql";

interface ProjectOptions {
  organizationSlug: Organization["slug"];
  projectSlug: Project["slug"];
}

const getProject = cache(
  async ({ organizationSlug, projectSlug }: ProjectOptions) => {
    const session = await getAuthSession();

    if (!session) return null;

    const sdk = getSdk({ session });

    const { projects } = await sdk.Project({ projectSlug, organizationSlug });

    return projects?.nodes?.[0];
  }
);

export default getProject;
