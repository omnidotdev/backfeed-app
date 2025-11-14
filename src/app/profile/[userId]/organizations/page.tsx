import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound, redirect } from "next/navigation";

import { auth } from "auth";
import { Page } from "components/layout";
import { CreateOrganization } from "components/organization";
import { Subscriptions } from "components/profile";
import {
  OrganizationOrderBy,
  Role,
  useOrganizationsQuery,
} from "generated/graphql";
import { getCustomer } from "lib/actions";
import { app } from "lib/config";
import { BACKFEED_PRODUCT_IDS, polar } from "lib/polar";
import { getQueryClient } from "lib/util";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: app.profileOrganizationsPage.breadcrumb,
};

/**
 * Profile organizations page. Manage organization subscriptions.
 */
const ProfileOrganizationsPage = async ({
  params,
}: PageProps<"/profile/[userId]/organizations">) => {
  const { userId } = await params;

  const [session, customer] = await Promise.allSettled([
    auth(),
    getCustomer({ userId }),
  ]);

  if (session.status === "rejected") redirect("/");

  if (session?.value?.user?.hidraId !== userId) notFound();

  const {
    result: { items: products },
  } = await polar.products.list({
    id: BACKFEED_PRODUCT_IDS,
    // Enterprise products are currently archived, but there is no need to display them as options within this route
    isArchived: false,
    sorting: ["price_amount"],
  });

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: useOrganizationsQuery.getKey({
      userId: session.value.user.rowId!,
      excludeRoles: [Role.Member, Role.Admin],
      orderBy: OrganizationOrderBy.CreatedAtAsc,
    }),
    queryFn: useOrganizationsQuery.fetcher({
      userId: session.value.user.rowId!,
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
        <Subscriptions
          user={session.value.user}
          products={products}
          customer={customer.status !== "rejected" ? customer.value : undefined}
        />

        <CreateOrganization />
      </Page>
    </HydrationBoundary>
  );
};

export default ProfileOrganizationsPage;
