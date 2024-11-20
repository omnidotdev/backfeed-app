import { app } from "lib/config";

import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

interface MetadataParams {
  params: Promise<{ projectId: string; organizationId: string }>;
}

export const generateMetadata = async ({
  params,
}: MetadataParams): Promise<Metadata> => {
  const { projectId, organizationId } = await params;

  // TODO: Hook up when fething data here.
  // const project: ProjectQuery = await request({
  //   url: API_BASE_URL!,
  //   document: ProjectDocument,
  //   variables: { projectSlug, organizationId } as ProjectQueryVariables,
  // });

  return {
    title: `${projectId} ${organizationId} | ${app.name}`,
  };
};

/**
 * Project layout.
 */
const ProjectLayout = ({ children }: { children: PropsWithChildren }) =>
  children;

export default ProjectLayout;
