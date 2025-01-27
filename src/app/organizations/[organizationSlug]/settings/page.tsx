import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { Page } from "components/layout";
import { OrganizationSettings } from "components/organization";
import {
  useOrganizationQuery,
  useOrganizationRoleQuery,
} from "generated/graphql";
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
    title: `${organization?.name} Settings | ${app.name}`,
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
      label: organization.name ?? organizationSlug,
      href: `/organizations/${organizationSlug}`,
    },
    {
      label: app.organizationSettingsPage.breadcrumb,
    },
  ];

  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: useOrganizationQuery.getKey({
        slug: organizationSlug,
      }),
      queryFn: useOrganizationQuery.fetcher({
        slug: organizationSlug,
      }),
    }),
    queryClient.prefetchQuery({
      queryKey: useOrganizationRoleQuery.getKey({
        userId: session.user.rowId!,
        organizationId: organization.rowId,
      }),
      queryFn: useOrganizationRoleQuery.fetcher({
        userId: session.user.rowId!,
        organizationId: organization.rowId,
      }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page
        breadcrumbs={breadcrumbs}
        header={{
          title: `${organization.name} ${app.organizationSettingsPage.breadcrumb}`,
          description: app.organizationSettingsPage.description,
        }}
      >
        <OrganizationSettings />
      </Page>
    </HydrationBoundary>
  );
};

export default OrganizationSettingsPage;
