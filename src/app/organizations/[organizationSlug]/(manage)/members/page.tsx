import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { Page } from "components/layout";
import { Members, MembershipFilters } from "components/organization";
import { useMembersQuery } from "generated/graphql";
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
  /** Organization page params. */
  params: Promise<{ organizationSlug: string }>;
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

  const { search } = await getSearchParams.parse(searchParams);

  await queryClient.prefetchQuery({
    queryKey: useMembersQuery.getKey({
      organizationId: organization.rowId,
      username: search,
    }),
    queryFn: useMembersQuery.fetcher({
      organizationId: organization.rowId,
      username: search,
    }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page
        header={{
          title: `${organization.name} ${app.organizationMembersPage.breadcrumb}`,
          description: app.organizationMembersPage.description,
        }}
      >
        <MembershipFilters />

        <Members organizationId={organization.rowId} />
      </Page>
    </HydrationBoundary>
  );
};

export default OrganizationMembersPage;
