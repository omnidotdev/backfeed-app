import { notFound } from "next/navigation";

import { SectionContainer, Page } from "components/layout";
import { sdk } from "lib/graphql";
import { getAuthSession } from "lib/util";
import { app } from "lib/config";
import { OrganizationSettings } from "components/organization";

import type { Organization } from "generated/graphql";
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
    <Page breadcrumbs={breadcrumbs}>
      <SectionContainer
        title={app.organizationSettingsPage.breadcrumb}
        description={app.organizationSettingsPage.description}
      >
        <OrganizationSettings
          organization={organization as Partial<Organization>}
        />
      </SectionContainer>
    </Page>
  );
};

export default OrganizationSettingsPage;
