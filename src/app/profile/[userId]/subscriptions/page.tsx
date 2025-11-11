import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound, redirect } from "next/navigation";

import { auth } from "auth";
import { Page } from "components/layout";
import { Subscriptions } from "components/profile";
import { Role, useOrganizationsQuery } from "generated/graphql";
import { getCustomer } from "lib/actions";
import { API_BASE_URL, app } from "lib/config";
import { subscriptionOptions } from "lib/options";
import { BACKFEED_PRODUCT_IDS, polar } from "lib/polar";
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
    getCustomer(userId),
  ]);

  if (session.status === "rejected") redirect("/");

  if (session?.value?.user?.hidraId !== userId) notFound();

  const {
    result: { items: products },
  } = await polar.products.list({
    id: BACKFEED_PRODUCT_IDS,
    sorting: ["price_amount"],
  });

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: useOrganizationsQuery.getKey({
      userId: session.value.user.rowId!,
      excludeRoles: [Role.Member, Role.Admin],
    }),
    queryFn: useOrganizationsQuery.fetcher({
      userId: session.value.user.rowId!,
      excludeRoles: [Role.Member, Role.Admin],
    }),
  });

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
          cta:
            // NB: if the status is rejected, the user has not subscribed ever. If there is no default payment method ID, then the user does not have a payment method on file to upgrade subscriptions
            customer.status === "rejected" ||
            !customer.value.defaultPaymentMethodId
              ? [
                  ...(customer.status === "fulfilled"
                    ? [
                        {
                          label: "Update Billing Information",
                          href: `${API_BASE_URL}/portal?customerId=${customer.value.id}`,
                        },
                      ]
                    : [
                        {
                          label: "Add Billing Information",
                          href: undefined,
                        },
                      ]),
                ]
              : undefined,
        }}
        pt={0}
      >
        <Subscriptions
          user={session.value.user}
          products={products}
          customer={customer.status !== "rejected" ? customer.value : undefined}
        />
      </Page>
    </HydrationBoundary>
  );
};

export default ProfileSubscriptionsPage;
