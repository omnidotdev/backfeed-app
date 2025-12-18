import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { OrganizationsOverview } from "components/organization";
import {
  OrganizationOrderBy,
  Role,
  useOrganizationsQuery,
  useUserQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { getAuthSession, getQueryClient, getSearchParams } from "lib/util";

import type { OrganizationsQueryVariables } from "generated/graphql";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: app.organizationsPage.breadcrumb,
};

/**
 * Organizations overview page.
 */
const OrganizationsPage = async ({
  searchParams,
}: PageProps<"/organizations">) => {
  const session = await getAuthSession();

  if (!session) notFound();

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
    queryClient.prefetchQuery({
      queryKey: useOrganizationsQuery.getKey({
        pageSize: 1,
        userId: organizationsQueryVariables.userId,
        excludeRoles: [Role.Member, Role.Admin],
      }),
      queryFn: useOrganizationsQuery.fetcher({
        pageSize: 1,
        userId: organizationsQueryVariables.userId,
        excludeRoles: [Role.Member, Role.Admin],
      }),
    }),
    queryClient.prefetchQuery({
      queryKey: useUserQuery.getKey({
        identityProviderId: session.user.identityProviderId!,
      }),
      queryFn: useUserQuery.fetcher({
        identityProviderId: session.user.identityProviderId!,
      }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrganizationsOverview />
    </HydrationBoundary>
  );
};

export default OrganizationsPage;
