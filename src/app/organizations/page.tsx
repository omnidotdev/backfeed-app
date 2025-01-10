import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { OrganizationsOverview } from "components/organization";
import { OrganizationOrderBy, useOrganizationsQuery } from "generated/graphql";
import { app } from "lib/config";
import { getAuthSession, getQueryClient, getSearchParams } from "lib/util";

import type { OrganizationsQueryVariables } from "generated/graphql";
import type { SearchParams } from "nuqs/server";

export const metadata = {
  title: `${app.organizationsPage.breadcrumb} | ${app.name}`,
};

interface Props {
  /** Organizations page search params. */
  searchParams: Promise<SearchParams>;
}

/**
 * Organizations overview page.
 */
const OrganizationsPage = async ({ searchParams }: Props) => {
  const queryClient = getQueryClient();

  const session = await getAuthSession();

  const { page, pageSize, search } = await getSearchParams(searchParams);

  if (session) {
    const variables: OrganizationsQueryVariables = {
      pageSize: pageSize,
      offset: (page - 1) * pageSize,
      orderBy: [OrganizationOrderBy.UserOrganizationsCountDesc],
      userId: session.user.rowId!,
      search,
    };

    await queryClient.prefetchQuery({
      queryKey: useOrganizationsQuery.getKey(variables),
      queryFn: useOrganizationsQuery.fetcher(variables),
    });
  }

  if (!session) notFound();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrganizationsOverview />
    </HydrationBoundary>
  );
};

export default OrganizationsPage;
