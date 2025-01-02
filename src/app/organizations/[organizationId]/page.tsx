import { notFound } from "next/navigation";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuPlusCircle } from "react-icons/lu";

import { Page } from "components/layout";
import { OrganizationOverview } from "components/organization";
import { app } from "lib/config";
import { sdk } from "lib/graphql";
import { getAuthSession } from "lib/util";

import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { organizationId } = await params;

  const { organization } = await sdk.Organization({ rowId: organizationId });

  return {
    title: `${organization?.name} | ${app.name}`,
  };
};

interface Props {
  /** Organization page params. */
  params: Promise<{ organizationId: string }>;
}

/**
 * Organization overview page.
 */
const OrganizationPage = async ({ params }: Props) => {
  const { organizationId } = await params;

  const [session, { organization }] = await Promise.all([
    getAuthSession(),
    sdk.Organization({ rowId: organizationId }),
  ]);

  const breadcrumbs = [
    {
      label: app.organizationsPage.breadcrumb,
      href: "/organizations",
    },
    {
      label: organization?.name ?? organizationId,
    },
  ];

  if (!session || !organization) notFound();

  return (
    <Page
      breadcrumbs={breadcrumbs}
      header={{
        title: organization.name!,
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
      <OrganizationOverview organizationId={organizationId} />
    </Page>
  );
};

export default OrganizationPage;
