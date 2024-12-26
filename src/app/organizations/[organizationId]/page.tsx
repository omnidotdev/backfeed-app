import { notFound } from "next/navigation";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuPlusCircle } from "react-icons/lu";
import { Suspense } from "react";

import { Page } from "components/layout";
import { OrganizationOverview } from "components/organization";
import { app } from "lib/config";
import { getAuthSession } from "lib/util";

interface Props {
  /** Organization page params. */
  params: Promise<{ organizationId: string }>;
}

/**
 * Organization overview page.
 */
const OrganizationPage = async ({ params }: Props) => {
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
    },
  ];

  if (!session) notFound();

  return (
    <Page
      breadcrumbs={breadcrumbs}
      header={{
        title: organizationId,
        description: app.organizationPage.header.description,
        cta: [
          {
            label: app.organizationPage.header.cta.viewAllProjects.label,
            // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
            icon: <HiOutlineFolder />,
            variant: "outline",
            href: `/organizations/${organizationId}/projects`,
          },
          {
            label: app.organizationPage.header.cta.newProject.label,
            // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
            icon: <LuPlusCircle />,
          },
        ],
      }}
    >
      <Suspense>
        <OrganizationOverview />
      </Suspense>
    </Page>
  );
};

export default OrganizationPage;
