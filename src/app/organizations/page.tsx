import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { OrganizationsOverview } from "components/organization";
import { OrganizationOrderBy, useOrganizationsQuery } from "generated/graphql";
import type { OrganizationsQueryVariables } from "generated/graphql";
import { app } from "lib/config";
import { getAuthSession, getQueryClient } from "lib/server";
import { getSearchParams } from "lib/util";
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
  const session = await getAuthSession();

  if (!session) notFound();

  const queryClient = getQueryClient();

  const { page, pageSize, search } = await getSearchParams.parse(searchParams);

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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrganizationsOverview />
    </HydrationBoundary>
  );
};

export default OrganizationsPage;
