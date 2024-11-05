import request from "graphql-request";

import { ProjectDocument } from "generated/graphql";
import { API_BASE_URL, app } from "lib/config";

import type { ProjectQuery, ProjectQueryVariables } from "generated/graphql";
import type { Metadata } from "next";
import type { ReactNode } from "react";

interface MetadataParams {
  params: Promise<{ project: string }>;
}

export const generateMetadata = async ({
  params,
}: MetadataParams): Promise<Metadata> => {
  const { project: projectSlug } = await params;

  const project: ProjectQuery = await request({
    url: API_BASE_URL!,
    document: ProjectDocument,
    variables: { projectSlug } as ProjectQueryVariables,
  });

  return {
    title: `${project?.projectBySlugAndOrganizationId?.name} | ${app.name}`,
  };
};

/**
 * Project layout.
 */
const ProjectLayout = ({ children }: { children: ReactNode }) => children;

export default ProjectLayout;
