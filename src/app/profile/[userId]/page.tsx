import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound, redirect } from "next/navigation";

import { Page } from "components/layout";
import { OrganizationInvites, Subscription } from "components/profile";
import { useInvitationsQuery } from "generated/graphql";
import { getSubscription } from "lib/actions";
import { app } from "lib/config";
import { polar } from "lib/polar";
import { getAuthSession, getQueryClient } from "lib/util";

export const metadata = {
  title: `${app.profilePage.breadcrumb} | ${app.name}`,
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
    getAuthSession(),
    polar.customers.getStateExternal({
      externalId: userId,
    }),
  ]);

  if (session.status === "rejected") redirect("/");

  if (session.value?.user?.hidraId !== userId) notFound();

  const queryClient = getQueryClient();

  // If the customer exists (i.e. has an active subscription or has subscribed in the past), prefetch the subscription data.
  if (customer.status !== "rejected") {
    await queryClient.prefetchQuery({
      queryKey: ["Subscription", userId],
      queryFn: async () => await getSubscription(userId),
    });
  }

  await queryClient.prefetchQuery({
    queryKey: useInvitationsQuery.getKey({
      email: session.value?.user?.email!,
    }),
    queryFn: useInvitationsQuery.fetcher({
      email: session.value?.user?.email!,
    }),
  });

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
