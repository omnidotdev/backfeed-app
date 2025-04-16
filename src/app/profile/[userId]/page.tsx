import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound, redirect } from "next/navigation";
import { after } from "next/server";
import { match } from "ts-pattern";

import { auth } from "auth";
import { Page } from "components/layout";
import { OrganizationInvites, Subscription } from "components/profile";
import { useInvitationsQuery } from "generated/graphql";
import { Tier } from "generated/graphql.sdk";
import { getProduct } from "lib/actions";
import { app } from "lib/config";
import { getSdk } from "lib/graphql";
import { subscriptionOptions } from "lib/options";
import { polar } from "lib/polar";
import { getQueryClient } from "lib/util";

export const metadata = {
  title: app.profilePage.breadcrumb,
};

interface Props {
  /** Params for the profile page. */
  params: Promise<{ userId: string }>;
}

/**
 * User profile page.
 */
const ProfilePage = async ({ params }: Props) => {
  const { userId } = await params;

  const [session, customer] = await Promise.allSettled([
    auth(),
    polar.customers.getStateExternal({
      externalId: userId,
    }),
  ]);

  if (session.status === "rejected") redirect("/");

  if (session.value?.user?.hidraId !== userId) notFound();

  const queryClient = getQueryClient();

  // NB: This is used to appropriately update `tier` for users that have recently signed up, or changed their subscriptions
  // NOTE: handling changed subscriptions is still not appropriately handled as we have not integrated redirects from the polar portal. When integrated, they should be redirected to this route
  // See https://nextjs.org/docs/app/api-reference/functions/after for details about the `after` API
  after(async () => {
    if (
      session.value &&
      customer.status === "fulfilled" &&
      customer.value.activeSubscriptions.length
    ) {
      const sdk = getSdk({ session: session.value });

      const productId = customer.value.activeSubscriptions[0].productId;

      const product = await getProduct(productId);

      const tier = match(product.metadata?.title as Tier)
        .with(Tier.Basic, () => Tier.Basic)
        .with(Tier.Team, () => Tier.Team)
        .with(Tier.Enterprise, () => Tier.Enterprise)
        .otherwise(() => null);

      // If the user has an active subscription update the tier accordingly
      await sdk.UpdateUser({
        rowId: session.value.user.rowId!,
        patch: {
          tier,
          updatedAt: new Date(),
        },
      });
    }
  });

  await Promise.all([
    // If the customer exists (i.e. has an active subscription or has subscribed in the past), prefetch the subscription data.
    customer.status !== "rejected" &&
      queryClient.prefetchQuery(subscriptionOptions({ hidraId: userId })),
    queryClient.prefetchQuery({
      queryKey: useInvitationsQuery.getKey({
        email: session.value?.user?.email!,
      }),
      queryFn: useInvitationsQuery.fetcher({
        email: session.value?.user?.email!,
      }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page
        header={{
          title: app.profilePage.header.title,
          description: app.profilePage.header.description,
        }}
      >
        <Subscription customer={customer} />

        <OrganizationInvites />
      </Page>
    </HydrationBoundary>
  );
};

export default ProfilePage;
