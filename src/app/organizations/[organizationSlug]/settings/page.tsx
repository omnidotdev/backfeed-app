import { notFound } from "next/navigation";

import { Page } from "components/layout";
import { OrganizationSettings } from "components/organization";
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

/** Organization settings page. */
const OrganizationSettingsPage = async ({ params }: Props) => {
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
      label: organization?.name ?? organization?.slug!,
      href: `/organizations/${organization?.slug}`,
    },
    {
      label: app.organizationSettingsPage.breadcrumb,
    },
  ];

  if (!session || !organization) notFound();

  return (
    <Page
      breadcrumbs={breadcrumbs}
      header={{
        title: `${organization.name} ${app.organizationSettingsPage.breadcrumb}`,
        description: app.organizationSettingsPage.description,
        cta: [],
      }}
    >
      <OrganizationSettings organizationSlug={organizationSlug} />
    </Page>
  );
};

export default OrganizationSettingsPage;
