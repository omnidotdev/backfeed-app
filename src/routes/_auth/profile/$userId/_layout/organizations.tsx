import { createFileRoute } from "@tanstack/react-router";

import Page from "@/components/layout/Page";
import CreateOrganization from "@/components/organization/CreateOrganization";
import UserOrganizations from "@/components/profile/UserOrganizations";
import { OrganizationOrderBy, Role } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import { organizationsOptions } from "@/lib/options/organizations";
import createMetaTags from "@/lib/util/createMetaTags";
import { getPrices } from "@/server/functions/prices";
import { getSubscriptions } from "@/server/functions/subscriptions";

export const Route = createFileRoute(
  "/_auth/profile/$userId/_layout/organizations",
)({
  loader: async ({ context: { queryClient, session } }) => {
    const [prices, subscriptions] = await Promise.all([
      getPrices(),
      getSubscriptions(),
      queryClient.ensureQueryData({
        ...organizationsOptions({
          userId: session?.user?.rowId!,
          excludeRoles: [Role.Member, Role.Admin],
          orderBy: OrganizationOrderBy.CreatedAtAsc,
        }),
        revalidateIfStale: true,
      }),
    ]);

    return { prices, subscriptions };
  },
  head: () => ({ meta: createMetaTags({ title: "User Organizations" }) }),
  component: UserOrganizationsPage,
});

function UserOrganizationsPage() {
  return (
    <Page
      header={{
        title: app.profileOrganizationsPage.breadcrumb,
        description: app.profileOrganizationsPage.description,
      }}
      pt={0}
    >
      <UserOrganizations />

      <CreateOrganization />
    </Page>
  );
}
