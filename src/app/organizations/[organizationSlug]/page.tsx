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
  const { organizationSlug } = await params;

  const [session, { organizationBySlug: organization }] = await Promise.all([
    getAuthSession(),
    sdk.Organization({ slug: organizationSlug }),
  ]);

  if (!session || !organization) notFound();

  const queryClient = getQueryClient();

  // This pattern is used (rather than `fetchQuery` in replace of the sdk implementation) to avoid having out of sync state. See: https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#data-ownership-and-revalidation for more details.
  await queryClient.prefetchQuery({
    queryKey: useOrganizationQuery.getKey({ slug: organizationSlug }),
    queryFn: useOrganizationQuery.fetcher({ slug: organizationSlug }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrganizationOverview
        organization={organization as Partial<Organization>}
      />
    </HydrationBoundary>
  );
};

export default OrganizationPage;
