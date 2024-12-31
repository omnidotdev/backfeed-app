import { notFound } from "next/navigation";
import { LuPlusCircle } from "react-icons/lu";

import { Page } from "components/layout";
import { ProjectsOverview } from "components/project";
import { app } from "lib/config";
import { getAuthSession, getOrganization } from "lib/util";

interface Props {
  /** Projects page params. */
  params: Promise<{ organizationId: string }>;
}

/**
 * Projects overview page.
 */
const ProjectsPage = async ({ params }: Props) => {
  const { organizationId } = await params;

  const [session, { organization }] = await Promise.all([
    getAuthSession(),
    getOrganization(organizationId),
  ]);

  const breadcrumbs = [
    {
      label: app.organizationsPage.breadcrumb,
      href: "/organizations",
    },
    {
      label: organization?.name ?? organizationId,
      href: `/organizations/${organizationId}`,
    },
    {
      label: app.projectsPage.breadcrumb,
    },
  ];

  if (!session || !organization) notFound();

  return (
    <Page
      breadcrumbs={breadcrumbs}
      header={{
        title: app.projectsPage.header.title,
        description: app.projectsPage.header.description,
        cta: [
          {
            label: app.projectsPage.header.cta.newProject.label,
            // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
            icon: <LuPlusCircle />,
          },
        ],
      }}
    >
      <ProjectsOverview />
    </Page>
  );
};

export default ProjectsPage;
