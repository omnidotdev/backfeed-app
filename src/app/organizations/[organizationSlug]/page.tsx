import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { RefreshTokenError } from "components/layout";
import { OrganizationOverview } from "components/organization";
import {
  useOrganizationMetricsQuery,
  useOrganizationQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { sdk } from "lib/graphql";
import { getAuthSession, getQueryClient } from "lib/util";

import type { Organization } from "generated/graphql";
import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { organizationSlug } = await params;

  const session = await getAuthSession();

  const { organizationBySlug: organization } = await sdk({
    headers: { Authorization: `Bearer ${session?.accessToken}` },
  }).Organization({
    slug: organizationSlug,
  });

  return {
    title: `${organization?.name} | ${app.name}`,
  };
};

interface Props {
  /** Organization page params. */
  params: Promise<{ organizationSlug: string }>;
}

/**
 * Organization overview page.
 */
const OrganizationPage = async ({ params }: Props) => {
  const { organizationSlug } = await params;

  const session = await getAuthSession();

  if (session?.error) return <RefreshTokenError />;

  const { organizationBySlug: organization } = await sdk({
    headers: { Authorization: `Bearer ${session?.accessToken}` },
  }).Organization({ slug: organizationSlug });

  if (!session || !organization) notFound();

  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: useOrganizationQuery.getKey({ slug: organizationSlug }),
      queryFn: useOrganizationQuery.fetcher({ slug: organizationSlug }),
    }),
    queryClient.prefetchQuery({
      queryKey: useOrganizationMetricsQuery.getKey({
        organizationId: organization.rowId,
      }),
      queryFn: useOrganizationMetricsQuery.fetcher({
        organizationId: organization.rowId,
      }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrganizationOverview
        organization={organization as Partial<Organization>}
      />
    </HydrationBoundary>
  );
};

export default OrganizationPage;
