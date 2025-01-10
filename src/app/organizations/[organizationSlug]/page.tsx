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
  const { organizationSlug } = await params;

  const { organizationBySlug: organization } = await sdk.Organization({
    slug: organizationSlug,
  });

  return {
    title: `${organization?.name} | ${app.name}`,
  };
};

interface Props {
  /** Organization page params. */
  params: Promise<{ organizationSlug: string }>;
}

/**
 * Organization overview page.
 */
const OrganizationPage = async ({ params }: Props) => {
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
            href: `/organizations/${organizationSlug}/projects`,
          },
          {
            label: app.organizationPage.header.cta.newProject.label,
            // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
            icon: <LuPlusCircle />,
          },
        ],
      }}
    >
      <OrganizationOverview
        organizationId={organization?.rowId}
        organizationSlug={organizationSlug}
      />
    </Page>
  );
};

export default OrganizationPage;
