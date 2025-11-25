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
import { getCustomer, getOrganization, getProducts } from "lib/actions";
import { app } from "lib/config";
import { getSdk } from "lib/graphql";
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

  const [organization, customer, products] = await Promise.all([
    getOrganization({ organizationSlug }),
    getCustomer(),
    getProducts(),
  ]);

  if (!organization) notFound();

  const currentSubscription = customer?.subscriptions.find(
    (sub) => sub.id === organization.subscriptionId,
  );

  const sdk = getSdk({ session });

  const { memberByUserIdAndOrganizationId } = await sdk.OrganizationRole({
    userId: session.user.rowId!,
    organizationId: organization.rowId,
  });

  if (!memberByUserIdAndOrganizationId) notFound();

  const queryClient = getQueryClient();

  await Promise.all([
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
          organization={{
            ...organization,
            subscriptionStatus: currentSubscription?.status ?? "canceled",
            toBeCanceled: currentSubscription?.cancel_at_period_end ?? false,
            currentPeriodEnd:
              currentSubscription?.items.data[0].price.unit_amount === 0
                ? null
                : new Date(
                    currentSubscription?.items.data[0].current_period_end! *
                      1000,
                  ),
          }}
          customer={customer}
          products={products}
        />
      </Page>
    </HydrationBoundary>
  );
};

export default OrganizationSettingsPage;
