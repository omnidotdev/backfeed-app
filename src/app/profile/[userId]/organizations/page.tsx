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
import { getCustomer, getProducts } from "lib/actions";
import { app } from "lib/config";
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

  const [session, customer, products] = await Promise.all([
    auth(),
    getCustomer(),
    getProducts(),
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
        <Subscriptions user={session.user} customer={customer} />

        <CreateOrganization />
      </Page>
    </HydrationBoundary>
  );
};

export default ProfileOrganizationsPage;
