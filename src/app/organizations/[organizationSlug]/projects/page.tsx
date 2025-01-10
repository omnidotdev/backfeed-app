import { notFound } from "next/navigation";
import { LuPlusCircle } from "react-icons/lu";

import { Page } from "components/layout";
import { ProjectFilters, ProjectList } from "components/project";
import { app } from "lib/config";
import { sdk } from "lib/graphql";
import { getAuthSession } from "lib/util";

import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { organizationSlug } = await params;

  const { organizationBySlug: organization } = await sdk.Organization({
    slug: organizationSlug,
  });

  return {
    title: `${organization?.name} ${app.projectsPage.breadcrumb} | ${app.name}`,
  };
};

interface Props {
  /** Projects page params. */
  params: Promise<{ organizationSlug: string }>;
}

/**
 * Projects overview page.
 */
const ProjectsPage = async ({ params }: Props) => {
  const { organizationSlug } = await params;

  const [session, { organizationBySlug: organization }] = await Promise.all([
    getAuthSession(),
    sdk.Organization({ slug: organizationSlug }),
  ]);

  const breadcrumbs = [
    {
      label: app.organizationsPage.breadcrumb,
      href: "/organizations",
    },
    {
      label: organization?.name ?? organizationSlug,
      href: `/organizations/${organizationSlug}`,
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
      <ProjectFilters />

      <ProjectList />
    </Page>
  );
};

export default ProjectsPage;
