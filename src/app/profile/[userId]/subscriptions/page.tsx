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
import { getQueryClient } from "lib/util";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: app.profileSubscriptionsPage.breadcrumb,
};

/**
 * Profile subscriptions page. Manage organization subscriptions.
 */
const ProfileSubscriptionsPage = async ({
  params,
}: PageProps<"/profile/[userId]/subscriptions">) => {
  const { userId } = await params;

  const [session, customer] = await Promise.all([auth(), getCustomer()]);

  if (!session) redirect("/");

  if (session?.user?.hidraId !== userId) notFound();

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: useOrganizationsQuery.getKey({
      userId: session.user.rowId!,
      excludeRoles: [Role.Member, Role.Admin],
      orderBy: OrganizationOrderBy.CreatedAtAsc,
      isFreeTier: false,
    }),
    queryFn: useOrganizationsQuery.fetcher({
      userId: session.user.rowId!,
      excludeRoles: [Role.Member, Role.Admin],
      orderBy: OrganizationOrderBy.CreatedAtAsc,
      isFreeTier: false,
    }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page
        header={{
          title: app.profileSubscriptionsPage.breadcrumb,
          description: app.profileSubscriptionsPage.description,
        }}
        pt={0}
      >
        <Subscriptions user={session.user} customer={customer} />

        <CreateOrganization />
      </Page>
    </HydrationBoundary>
  );
};

export default ProfileSubscriptionsPage;
