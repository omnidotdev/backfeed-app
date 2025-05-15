import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { auth } from "auth";
import { OrganizationsOverview } from "components/organization";
import {
  OrganizationOrderBy,
  Role,
  useOrganizationsQuery,
  useUserQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { getQueryClient, getSearchParams } from "lib/util";

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

  const queryClient = getQueryClient();

  const { page, pageSize, search } = await getSearchParams.parse(searchParams);

  const organizationsQueryVariables: OrganizationsQueryVariables = {
    pageSize: pageSize,
    offset: (page - 1) * pageSize,
    orderBy: [OrganizationOrderBy.MembersCountDesc],
    search,
    isMember: false,
  };

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: useOrganizationsQuery.getKey(organizationsQueryVariables),
      queryFn: useOrganizationsQuery.fetcher(organizationsQueryVariables),
    }),
    ...(session
      ? [
          queryClient.prefetchQuery({
            queryKey: useOrganizationsQuery.getKey({
              pageSize: 1,
              userId: session?.user.rowId,
              excludeRoles: [Role.Member, Role.Admin],
            }),
            queryFn: useOrganizationsQuery.fetcher({
              pageSize: 1,
              userId: session?.user.rowId,
              excludeRoles: [Role.Member, Role.Admin],
            }),
          }),
          queryClient.prefetchQuery({
            queryKey: useUserQuery.getKey({ hidraId: session?.user.hidraId! }),
            queryFn: useUserQuery.fetcher({ hidraId: session?.user.hidraId! }),
          }),
        ]
      : []),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrganizationsOverview user={session?.user} />
    </HydrationBoundary>
  );
};

export default OrganizationsPage;
