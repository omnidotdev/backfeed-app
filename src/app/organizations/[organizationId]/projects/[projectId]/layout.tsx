import { app } from "lib/config";

import type { Metadata } from "next";
import type { ReactNode } from "react";

interface MetadataParams {
  params: Promise<{ projectId: string; organizationId: string }>;
}

export const generateMetadata = async ({
  params,
}: MetadataParams): Promise<Metadata> => {
  const { projectId } = await params;

  // TODO: Hook up when fetching data here
  // const project: ProjectQuery = await request({
  //   url: API_BASE_URL!,
  //   document: ProjectDocument,
  //   variables: { projectSlug, organizationId } as ProjectQueryVariables,
  // });

  return {
    title: `${projectId} | ${app.name}`,
  };
};

/**
 * Project layout.
 */
const ProjectLayout = ({ children }: { children: ReactNode }) => children;

export default ProjectLayout;
