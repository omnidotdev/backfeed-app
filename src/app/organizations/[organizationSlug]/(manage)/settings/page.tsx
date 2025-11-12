import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { auth } from "auth";
import { Page } from "components/layout";
import { OrganizationSettings } from "components/organization";
import {
  Role,
  useMembersQuery,
  useOrganizationRoleQuery,
} from "generated/graphql";
import { getCustomer, getOrganization } from "lib/actions";
import { app } from "lib/config";
import { getSdk } from "lib/graphql";
import { BACKFEED_PRODUCT_IDS, polar } from "lib/polar";
import { getQueryClient } from "lib/util";

import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: PageProps<"/organizations/[organizationSlug]/settings">): Promise<Metadata> => {
  const { organizationSlug } = await params;

  const organization = await getOrganization({
    organizationSlug,
  });

  return {
    title: `${organization?.name} ${app.organizationSettingsPage.breadcrumb}`,
  };
};

/**
 * Organization settings page.
 */
const OrganizationSettingsPage = async ({
  params,
}: PageProps<"/organizations/[organizationSlug]/settings">) => {
  const { organizationSlug } = await params;

  const session = await auth();

  if (!session) notFound();

  const [organizationResponse, customerResponse] = await Promise.allSettled([
    getOrganization({ organizationSlug }),
    getCustomer(session.user.hidraId!),
  ]);

  if (organizationResponse.status === "rejected" || !organizationResponse.value)
    notFound();

  const organization = organizationResponse.value;

  const sdk = getSdk({ session });

  const { memberByUserIdAndOrganizationId } = await sdk.OrganizationRole({
    userId: session.user.rowId!,
    organizationId: organization.rowId,
  });

  if (!memberByUserIdAndOrganizationId) notFound();

  const queryClient = getQueryClient();

  const [
    {
      result: { items: products },
    },
  ] = await Promise.all([
    polar.products.list({
      id: BACKFEED_PRODUCT_IDS,
      sorting: ["price_amount"],
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
    queryClient.prefetchQuery({
      queryKey: useMembersQuery.getKey({
        organizationId: organization.rowId,
        roles: [Role.Owner],
      }),
      queryFn: useMembersQuery.fetcher({
        organizationId: organization.rowId,
        roles: [Role.Owner],
      }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page
        header={{
          title: `${organization.name} ${app.organizationSettingsPage.breadcrumb}`,
        }}
        pt={0}
      >
        <OrganizationSettings
          user={session.user}
          organization={organization}
          customer={
            customerResponse.status === "fulfilled"
              ? customerResponse.value
              : undefined
          }
          products={products}
        />
      </Page>
    </HydrationBoundary>
  );
};

export default OrganizationSettingsPage;
