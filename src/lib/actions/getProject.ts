import { cache } from "react";

import { getSdk } from "lib/graphql";

import type { Organization, Project } from "generated/graphql";
import type { Session } from "next-auth";

interface ProjectOptions {
  session: Session;
  organizationSlug: Organization["slug"];
  projectSlug: Project["slug"];
}

const getProject = cache(
  async ({ session, organizationSlug, projectSlug }: ProjectOptions) => {
    const sdk = getSdk({ session });

    const { projects } = await sdk.Project({ projectSlug, organizationSlug });

    return projects?.nodes?.[0];
  }
);

export default getProject;
