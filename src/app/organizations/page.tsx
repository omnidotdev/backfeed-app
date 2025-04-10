import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { LuCirclePlus } from "react-icons/lu";

import { auth } from "auth";
import { Page } from "components/layout";
import { OrganizationFilters, OrganizationList } from "components/organization";
import {
  OrganizationOrderBy,
  Role,
  useOrganizationsQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { hasBasicTierPrivileges, hasTeamTierPrivileges } from "lib/flags";
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

  if (!session) notFound();

  const sdk = getSdk({ session });

  const [isBasicTier, isTeamTier, { organizations }] = await Promise.all([
    hasBasicTierPrivileges(),
    hasTeamTierPrivileges(),
    sdk.Organizations({
      userId: session?.user.rowId!,
      isMember: true,
      excludeRoles: [Role.Member],
    }),
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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page
        breadcrumbs={breadcrumbs}
        header={{
          title: app.organizationsPage.header.title,
          description: app.organizationsPage.header.description,
          cta: [
            {
              label: app.organizationsPage.header.cta.newOrganization.label,
              // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
              icon: <LuCirclePlus />,
              dialogType: DialogType.CreateOrganization,
              disabled:
                !isBasicTier || (!isTeamTier && !!organizations?.totalCount),
            },
          ],
        }}
      >
        <OrganizationFilters />

        <OrganizationList />
      </Page>
    </HydrationBoundary>
  );
};

export default OrganizationsPage;
