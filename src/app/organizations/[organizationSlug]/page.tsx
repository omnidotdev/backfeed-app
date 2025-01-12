import { notFound } from "next/navigation";

import { OrganizationOverview } from "components/organization";
import { app } from "lib/config";
import { sdk } from "lib/graphql";
import { getAuthSession } from "lib/util";

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

  return (
    <OrganizationOverview
      organization={organization as Partial<Organization>}
    />
  );
};

export default OrganizationPage;
