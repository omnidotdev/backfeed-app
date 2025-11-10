import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound, redirect } from "next/navigation";

import { auth } from "auth";
import { Page } from "components/layout";
import { Subscriptions } from "components/profile";
import { app } from "lib/config";
import { subscriptionOptions } from "lib/options";
import { polar } from "lib/polar";
import { getQueryClient } from "lib/util";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: app.profileSubscriptionsPage.breadcrumb,
};

/**
 * Profile subscriptions page.
 */
const ProfileSubscriptionsPage = async ({
  params,
}: PageProps<"/profile/[userId]/subscriptions">) => {
  const { userId } = await params;

  const [session, customer] = await Promise.allSettled([
    auth(),
    polar.customers.getStateExternal({
      externalId: userId,
    }),
  ]);

  if (session.status === "rejected") redirect("/");

  if (session?.value?.user?.hidraId !== userId) notFound();

  const queryClient = getQueryClient();

  // If the customer exists (i.e. has an active subscription or has subscribed in the past), prefetch the subscription data.
  if (customer.status !== "rejected") {
    await queryClient.prefetchQuery(
      subscriptionOptions({
        hidraId: userId,
      }),
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page
        header={{
          title: app.profileSubscriptionsPage.breadcrumb,
          description: app.profileSubscriptionsPage.description,
        }}
        pt={0}
      >
        <Subscriptions customer={customer} />
      </Page>
    </HydrationBoundary>
  );
};

export default ProfileSubscriptionsPage;
