import { app } from "lib/config";

import type { Metadata } from "next";
import type { ReactNode } from "react";

interface MetadataParams {
  params: Promise<{ projectId: string; organization: string }>;
}

export const generateMetadata = async ({
  params,
}: MetadataParams): Promise<Metadata> => {
  const { projectId: projectSlug, organization: organizationId } = await params;

  // const project: ProjectQuery = await request({
  //   url: API_BASE_URL!,
  //   document: ProjectDocument,
  //   variables: { projectSlug, organizationId } as ProjectQueryVariables,
  // });

  return {
    title: `${projectSlug} | ${app.name}`,
  };
};

/**
 * Project layout.
 */
const ProjectLayout = ({ children }: { children: ReactNode }) => children;

export default ProjectLayout;
