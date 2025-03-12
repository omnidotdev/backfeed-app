import { redirect } from "next/navigation";

import { Page } from "components/layout";
import { CustomerPortal } from "components/profile";
import { app } from "lib/config";
import { polar } from "lib/polar";
import { getAuthSession } from "lib/util";

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

  // TODO: redirect if userId from `params` does not match session (left unhandled for testing purposes)
  if (!session) redirect("/");

  // TODO: populate the profile page with customer data / handlers
  return (
    <Page
      header={{
        title: app.profilePage.header.title,
        description: app.profilePage.header.description,
      }}
    >
      <CustomerPortal customer={customer} />
    </Page>
  );
};

export default ProfilePage;
