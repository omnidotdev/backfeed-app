import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound, redirect } from "next/navigation";

import { auth } from "auth";
import { Page } from "components/layout";
import { Subscription } from "components/profile";
import { getSubscription } from "lib/actions";
import { app } from "lib/config";
import { polar } from "lib/polar";
import { getQueryClient } from "lib/util";

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
    auth(),
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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page
        header={{
          title: app.profilePage.header.title,
          description: app.profilePage.header.description,
        }}
      >
        <Subscription customer={customer} />
      </Page>
    </HydrationBoundary>
  );
};

export default ProfilePage;
