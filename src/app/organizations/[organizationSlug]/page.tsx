import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { OrganizationOverview } from "components/organization";
import { useOrganizationQuery } from "generated/graphql";
import { app } from "lib/config";
import { sdk } from "lib/graphql";
import { getAuthSession, getQueryClient } from "lib/util";

import type { Organization } from "generated/graphql";
import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { organizationSlug } = await params;

  const { organizationBySlug: organization } = await sdk.Organization({
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
  const queryClient = getQueryClient();

  const { organizationSlug } = await params;

  const [session, { organizationBySlug: organization }] = await Promise.all([
    getAuthSession(),
    // NB: using `fetchQuery` as the partial organization is required for prop drilling.
    queryClient.fetchQuery({
      queryKey: useOrganizationQuery.getKey({ slug: organizationSlug }),
      queryFn: useOrganizationQuery.fetcher({ slug: organizationSlug }),
      retry: false,
    }),
  ]);

  if (!session || !organization) notFound();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrganizationOverview
        organization={organization as Partial<Organization>}
      />
    </HydrationBoundary>
  );
};

export default OrganizationPage;
