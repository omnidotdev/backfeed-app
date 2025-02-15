import { notFound } from "next/navigation";

import { Page } from "components/layout";
import { MembershipFilters } from "components/organization";
import { app } from "lib/config";
import { getSdk } from "lib/graphql";
import { getAuthSession } from "lib/util";

import type { Metadata } from "next";

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
}

const OrganizationMembersPage = async ({ params }: Props) => {
  const { organizationSlug } = await params;

  const [session, sdk] = await Promise.all([getAuthSession(), getSdk()]);

  if (!session || !sdk) notFound();

  const { organizationBySlug: organization } = await sdk.Organization({
    slug: organizationSlug,
  });

  if (!organization) notFound();

  return (
    <Page
      header={{
        title: `${organization.name} ${app.organizationMembersPage.breadcrumb}`,
        description: app.organizationMembersPage.description,
      }}
    >
      <MembershipFilters />
    </Page>
  );
};

export default OrganizationMembersPage;
