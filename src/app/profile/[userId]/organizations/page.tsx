import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound, redirect } from "next/navigation";

import { auth } from "auth";
import { Page } from "components/layout";
import { CreateOrganization } from "components/organization";
import { UserOrganizations } from "components/profile";
import {
  OrganizationOrderBy,
  Role,
  useOrganizationsQuery,
} from "generated/graphql";
import { getCustomer, getPrices } from "lib/actions";
import { app } from "lib/config";
import { getQueryClient } from "lib/util";

import type { Price } from "components/pricing/PricingOverview/PricingOverview";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: app.profileOrganizationsPage.breadcrumb,
};

/**
 * Profile subscriptions page. Manage organization subscriptions.
 */
const ProfileSubscriptionsPage = async ({
  params,
}: PageProps<"/profile/[userId]/organizations">) => {
  const { userId } = await params;

  const [session, customer, prices] = await Promise.all([
    auth(),
    getCustomer(),
    getPrices(),
  ]);

  if (!session) redirect("/");

  if (session?.user?.hidraId !== userId) notFound();

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: useOrganizationsQuery.getKey({
      userId: session.user.rowId!,
      excludeRoles: [Role.Member, Role.Admin],
      orderBy: OrganizationOrderBy.CreatedAtAsc,
    }),
    queryFn: useOrganizationsQuery.fetcher({
      userId: session.user.rowId!,
      excludeRoles: [Role.Member, Role.Admin],
      orderBy: OrganizationOrderBy.CreatedAtAsc,
    }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page
        header={{
          title: app.profileOrganizationsPage.breadcrumb,
          description: app.profileOrganizationsPage.description,
        }}
        pt={0}
      >
        <UserOrganizations
          user={session.user}
          customer={customer}
          prices={prices as Price[]}
        />

        <CreateOrganization />
      </Page>
    </HydrationBoundary>
  );
};

export default ProfileSubscriptionsPage;
