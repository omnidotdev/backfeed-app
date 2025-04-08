import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { LuCirclePlus } from "react-icons/lu";

import { auth } from "auth";
import { Page } from "components/layout";
import {
  CreateOrganization,
  OrganizationFilters,
  OrganizationList,
} from "components/organization";
import { OrganizationOrderBy } from "generated/graphql";
import { app } from "lib/config";
import { organizationsQueryOptions } from "lib/react-query/options";
import { getQueryClient, getSearchParams } from "lib/util";
import { DialogType } from "store";

import type { BreadcrumbRecord } from "components/core";
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

  const breadcrumbs: BreadcrumbRecord[] = [
    {
      label: app.organizationsPage.breadcrumb,
    },
  ];

  const queryClient = getQueryClient();

  const { page, pageSize, search } = await getSearchParams.parse(searchParams);

  // NB: due to the need to refetch (update) this query frequently from the client, we should avoid suspense and to prevent loading indicators just await the prefetch here
  await queryClient.prefetchQuery(
    organizationsQueryOptions({
      pageSize: pageSize,
      offset: (page - 1) * pageSize,
      orderBy: [OrganizationOrderBy.MembersCountDesc],
      search,
      isMember: false,
    })
  );

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
            },
          ],
        }}
      >
        <OrganizationFilters />

        <OrganizationList />

        {/* dialogs */}
        <CreateOrganization />
      </Page>
    </HydrationBoundary>
  );
};

export default OrganizationsPage;
