import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { LuCirclePlus } from "react-icons/lu";

import { auth } from "auth";
import { Page } from "components/layout";
import {
  CreateOrganization,
  OrganizationFilters,
  OrganizationList,
} from "components/organization";
import {
  OrganizationOrderBy,
  Role,
  useOrganizationsQuery,
} from "generated/graphql";
import { app } from "lib/config";
import {
  enableFreeTierPrivilegesFlag,
  enableTeamTierPrivilegesFlag,
} from "lib/flags";
import { getSdk } from "lib/graphql";
import { getQueryClient, getSearchParams } from "lib/util";
import { DialogType } from "store";

import type { BreadcrumbRecord } from "components/core";
import type { OrganizationsQueryVariables } from "generated/graphql";
import type { SearchParams } from "nuqs/server";

export const dynamic = "force-dynamic";

export const metadata = {
  title: app.organizationsPage.breadcrumb,
};

interface Props {
  /** Organizations page search params. */
  searchParams: Promise<SearchParams>;
}

/**
 * Organizations overview page.
 */
const OrganizationsPage = async ({ searchParams }: Props) => {
  const session = await auth();

  const sdk = getSdk({ session });

  const [{ organizations }, isFreeTier, isTeamTier] = await Promise.all([
    sdk.Organizations({
      pageSize: 1,
      userId: session?.user.rowId,
      excludeRoles: [Role.Member, Role.Admin],
    }),
    enableFreeTierPrivilegesFlag(),
    enableTeamTierPrivilegesFlag(),
  ]);

  // NB: if the user is not subscribed to a team tier subscription or higher, limit the number of organizations they can create to just one.
  const canCreateOrganization =
    isTeamTier || (isFreeTier && !!organizations && !organizations?.totalCount);

  const breadcrumbs: BreadcrumbRecord[] = [
    {
      label: app.organizationsPage.breadcrumb,
    },
  ];

  const queryClient = getQueryClient();

  const { page, pageSize, search } = await getSearchParams.parse(searchParams);

  const variables: OrganizationsQueryVariables = {
    pageSize: pageSize,
    offset: (page - 1) * pageSize,
    orderBy: [OrganizationOrderBy.MembersCountDesc],
    search,
    isMember: false,
  };

  await queryClient.prefetchQuery({
    queryKey: useOrganizationsQuery.getKey(variables),
    queryFn: useOrganizationsQuery.fetcher(variables),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page
        breadcrumbs={breadcrumbs}
        header={{
          title: app.organizationsPage.header.title,
          cta: [
            {
              label: app.organizationsPage.header.cta.newOrganization.label,
              // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
              icon: <LuCirclePlus />,
              dialogType: DialogType.CreateOrganization,
              disabled: !canCreateOrganization,
              tooltip: isFreeTier
                ? app.organizationsPage.header.cta.newOrganization
                    .subscribedTooltip
                : app.organizationsPage.header.cta.newOrganization
                    .noSubscriptionTooltip,
            },
          ],
        }}
      >
        <OrganizationFilters />

        <OrganizationList
          canCreateOrganization={canCreateOrganization}
          isSubscribed={isFreeTier}
        />

        {/* dialogs */}
        {canCreateOrganization && <CreateOrganization />}
      </Page>
    </HydrationBoundary>
  );
};

export default OrganizationsPage;
