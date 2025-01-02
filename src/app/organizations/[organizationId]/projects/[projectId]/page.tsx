import request from "graphql-request";
import { notFound } from "next/navigation";
import { LuSettings } from "react-icons/lu";
import { HiOutlineFolder } from "react-icons/hi2";

import { ProjectOverview } from "components/project";
import { Page } from "components/layout";
import { ProjectDocument } from "generated/graphql";
import { API_BASE_URL, app } from "lib/config";
import { getAuthSession, getProject } from "lib/util";

import type { ProjectQuery, ProjectQueryVariables } from "generated/graphql";
import type { Metadata } from "next";

const fetchProject = async (projectId: string): Promise<ProjectQuery> =>
  request({
    url: API_BASE_URL!,
    document: ProjectDocument,
    variables: { rowId: projectId } as ProjectQueryVariables,
  });

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { projectId } = await params;

  const { project } = await fetchProject(projectId);

  return {
    title: `${project?.name} | ${app.name}`,
  };
};

interface Props {
  /** Project page params. */
  params: Promise<{ organizationId: string; projectId: string }>;
}

/**
 * Project overview page.
 */
const ProjectPage = async ({ params }: Props) => {
  const { organizationId, projectId } = await params;

  const [session, { project }] = await Promise.all([
    getAuthSession(),
    getProject(projectId),
  ]);

  const breadcrumbs = [
    {
      label: app.organizationsPage.breadcrumb,
      href: "/organizations",
    },
    {
      label: project?.organization?.name ?? organizationId,
      href: `/organizations/${organizationId}`,
    },
    {
      label: app.projectsPage.breadcrumb,
      href: `/organizations/${organizationId}/projects`,
    },
    {
      label: project?.name ?? projectId,
    },
  ];

  const name = project?.name!;
  const description = project?.description!;

  if (!session || !project) notFound();

  return (
    <Page
      breadcrumbs={breadcrumbs}
      // TODO: Use actual project data here instead of placeholder
      header={{
        title: name,
        description: description,
        // TODO: add button actions
        cta: [
          {
            label: app.projectPage.header.cta.settings.label,
            // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
            icon: <LuSettings />,
          },
          {
            label: app.projectPage.header.cta.viewAllProjects.label,
            // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
            icon: <HiOutlineFolder />,
            variant: "outline",
            href: `/organizations/${organizationId}/projects`,
          },
        ],
      }}
    >
      <ProjectOverview
        name={name}
        description={description}
        createdAt={project.createdAt}
        projectId={projectId}
      />
    </Page>
  );
};

export default ProjectPage;
