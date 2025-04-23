import { notFound, redirect } from "next/navigation";

import { auth } from "auth";
import { Await } from "components/core";
import { Page } from "components/layout";
import { Subscription } from "components/profile";
import { app } from "lib/config";
import { subscriptionOptions } from "lib/options";
import { polar } from "lib/polar";

export const metadata = {
  title: app.profileSubscriptionPage.breadcrumb,
};

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

  return (
    <Await
      prefetch={
        customer.status !== "rejected"
          ? [
              subscriptionOptions({
                hidraId: userId,
              }),
            ]
          : undefined
      }
    >
      <Page
        header={{
          title: app.profileSubscriptionPage.breadcrumb,
          description: app.profileSubscriptionPage.description,
        }}
        pt={0}
      >
        <Subscription customer={customer} />
      </Page>
    </Await>
  );
};

export default ProfileSubscriptionPage;
