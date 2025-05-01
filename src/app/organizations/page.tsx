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
  enableBasicTierPrivilegesFlag,
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

  const [{ organizations }, isBasicTier, isTeamTier] = await Promise.all([
    sdk.Organizations({
      userId: session?.user.rowId,
      isMember: true,
      excludeRoles: [Role.Member],
      // NB: only need to determine in there are any number of orgs given the other variables.
      pageSize: 1,
    }),
    enableBasicTierPrivilegesFlag(),
    enableTeamTierPrivilegesFlag(),
  ]);

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

  // NB: To create an organization, user must be subscribed. If they are subscribed, we validate that they are either on the team tier subscription (unlimited organizations) or that they are not currently an owner/admin of another organization
  const canCreateOrganization =
    isBasicTier && (isTeamTier || !organizations?.totalCount);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page
        breadcrumbs={breadcrumbs}
        header={{
          title: app.organizationsPage.header.title,
          cta: [
            ...(session
              ? [
                  {
                    label:
                      app.organizationsPage.header.cta.newOrganization.label,
                    // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
                    icon: <LuCirclePlus />,
                    dialogType: DialogType.CreateOrganization,
                    disabled: !canCreateOrganization,
                  },
                ]
              : []),
          ],
        }}
      >
        <OrganizationFilters />

        <OrganizationList canCreateOrganization={canCreateOrganization} />

        {/* dialogs */}
        {canCreateOrganization && (
          <CreateOrganization
            isBasicTier={isBasicTier}
            isTeamTier={isTeamTier}
          />
        )}
      </Page>
    </HydrationBoundary>
  );
};

export default OrganizationsPage;
