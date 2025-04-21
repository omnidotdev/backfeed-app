import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound, redirect } from "next/navigation";

import { auth } from "auth";
import { Page } from "components/layout";
import { Subscription } from "components/profile";

import { app } from "lib/config";
import { getQueryClient } from "lib/util";
import { polar } from "lib/polar";

interface Props {
  /** Params for the profile subscription page. */
  params: Promise<{ userId: string }>;
}

/**
 * Profile subscription page.
 */
const ProfileSubscriptionPage = async ({ params }: Props) => {
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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page
        metadata={{
          title: app.profileSubscriptionPage.breadcrumb,
        }}
        header={{
          title: app.profileSubscriptionPage.breadcrumb,
          description: app.profileSubscriptionPage.description,
        }}
        pt={0}
      >
        <Subscription customer={customer} />
      </Page>
    </HydrationBoundary>
  );
};

export default ProfileSubscriptionPage;
