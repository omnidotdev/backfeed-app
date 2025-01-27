import { notFound } from "next/navigation";

import { Page } from "components/layout";
import { OrganizationSettings } from "components/organization";
import { useOrganizationQuery } from "generated/graphql";
import { app } from "lib/config";
import { getSdk } from "lib/graphql";
import { getAuthSession, getQueryClient } from "lib/util";

import type { BreadcrumbRecord } from "components/core";
import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { organizationSlug } = await params;

  const sdk = await getSdk();

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

  const [session, sdk] = await Promise.all([getAuthSession(), getSdk()]);

  if (!session || !sdk) notFound();

  const { organizationBySlug: organization } = await sdk.Organization({
    slug: organizationSlug,
  });

  if (!organization) notFound();

  const breadcrumbs: BreadcrumbRecord[] = [
    {
      label: app.organizationsPage.breadcrumb,
      href: "/organizations",
    },
    {
      label: organization.name ?? organization.slug!,
      href: `/organizations/${organization.slug}`,
    },
    {
      label: app.organizationSettingsPage.breadcrumb,
    },
  ];

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: useOrganizationQuery.getKey({
      slug: organizationSlug,
    }),
    queryFn: useOrganizationQuery.fetcher({
      slug: organizationSlug,
    }),
  });

  return (
    <Page
      breadcrumbs={breadcrumbs}
      header={{
        title: `${organization.name} ${app.organizationSettingsPage.breadcrumb}`,
        description: app.organizationSettingsPage.description,
      }}
    >
      <OrganizationSettings />
    </Page>
  );
};

export default OrganizationSettingsPage;
