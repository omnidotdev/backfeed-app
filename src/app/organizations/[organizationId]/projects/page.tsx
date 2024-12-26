import { notFound } from "next/navigation";
import { Suspense } from "react";
import { LuPlusCircle } from "react-icons/lu";

import { Page } from "components/layout";
import { ProjectsOverview } from "components/project";
import { app } from "lib/config";
import { getAuthSession } from "lib/util";

interface Props {
  /** Projects page params. */
  params: Promise<{ organizationId: string }>;
}

/**
 * Projects overview page.
 */
const ProjectsPage = async ({ params }: Props) => {
  const { organizationId } = await params;
  const session = await getAuthSession();

  const breadcrumbs = [
    {
      label: app.organizationsPage.breadcrumb,
      href: "/organizations",
    },
    {
      // TODO: Use actual organization name here instead of ID
      label: organizationId,
      href: `/organizations/${organizationId}`,
    },
    {
      label: app.projectsPage.breadcrumb,
    },
  ];

  if (!session) notFound();

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
      {/* // ! NB: wrapped in a suspense boundary to avoid opting entire page into CSR. See: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout */}
      <Suspense>
        <ProjectsOverview />
      </Suspense>
    </Page>
  );
};

export default ProjectsPage;
