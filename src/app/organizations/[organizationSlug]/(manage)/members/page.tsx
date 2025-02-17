import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { Page } from "components/layout";
import { Members, MembershipFilters, Owners } from "components/organization";
import {
  Role,
  useMembersQuery,
  useOrganizationRoleQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { getSdk } from "lib/graphql";
import { getAuthSession, getQueryClient, getSearchParams } from "lib/util";

import type { Metadata } from "next";
import type { SearchParams } from "nuqs/server";

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { organizationSlug } = await params;

  const sdk = await getSdk();

  const { organizationBySlug: organization } = await sdk.Organization({
    slug: organizationSlug,
  });

  return {
    title: `${organization?.name} ${app.organizationMembersPage.breadcrumb} | ${app.name}`,
  };
};

interface Props {
  /** Organization members page parameters. */
  params: Promise<{ organizationSlug: string }>;
  /** Organization members page search parameters. */
  searchParams: Promise<SearchParams>;
}

const OrganizationMembersPage = async ({ params, searchParams }: Props) => {
  const { organizationSlug } = await params;

  const [session, sdk] = await Promise.all([getAuthSession(), getSdk()]);

  if (!session || !sdk) notFound();

  const { organizationBySlug: organization } = await sdk.Organization({
    slug: organizationSlug,
  });

  if (!organization) notFound();

  const queryClient = getQueryClient();

  const { search, roles } = await getSearchParams.parse(searchParams);

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: useMembersQuery.getKey({
        organizationId: organization.rowId,
        roles: [Role.Owner],
      }),
      queryFn: useMembersQuery.fetcher({
        organizationId: organization.rowId,
        roles: [Role.Owner],
      }),
    }),
    queryClient.prefetchQuery({
      queryKey: useMembersQuery.getKey({
        organizationId: organization.rowId,
        roles: roles ?? undefined,
        search,
        excludeRoles: [Role.Owner],
      }),
      queryFn: useMembersQuery.fetcher({
        organizationId: organization.rowId,
        roles: roles ?? undefined,
        search,
        excludeRoles: [Role.Owner],
      }),
    }),
    queryClient.prefetchQuery({
      queryKey: useOrganizationRoleQuery.getKey({
        organizationId: organization.rowId,
        userId: session.user.rowId!,
      }),
      queryFn: useOrganizationRoleQuery.fetcher({
        organizationId: organization.rowId,
        userId: session.user.rowId!,
      }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page
        header={{
          title: `${organization.name} ${app.organizationMembersPage.breadcrumb}`,
          description: app.organizationMembersPage.description,
        }}
      >
        <Owners organizationId={organization.rowId} />

        <MembershipFilters />

        <Members organizationId={organization.rowId} />
      </Page>
    </HydrationBoundary>
  );
};

export default OrganizationMembersPage;
