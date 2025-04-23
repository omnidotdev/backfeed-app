import { notFound } from "next/navigation";
import { LuCirclePlus } from "react-icons/lu";

import { auth } from "auth";
import { Await } from "components/core";
import { Page } from "components/layout";
import {
  CreateOrganization,
  OrganizationFilters,
  OrganizationList,
} from "components/organization";
import { OrganizationOrderBy, Role } from "generated/graphql";
import { app } from "lib/config";
import { hasBasicTierPrivileges, hasTeamTierPrivileges } from "lib/flags";
import { getSdk } from "lib/graphql";
import { organizationsOptions } from "lib/options";
import { getSearchParams } from "lib/util";
import { DialogType } from "store";

import type { BreadcrumbRecord } from "components/core";
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

  if (!session) notFound();

  const sdk = getSdk({ session });

  const [{ organizations }, isBasicTier, isTeamTier] = await Promise.all([
    sdk.Organizations({
      userId: session?.user.rowId!,
      isMember: true,
      excludeRoles: [Role.Member],
    }),
    hasBasicTierPrivileges(),
    hasTeamTierPrivileges(),
  ]);

  const breadcrumbs: BreadcrumbRecord[] = [
    {
      label: app.organizationsPage.breadcrumb,
    },
  ];

  const { page, pageSize, search } = await getSearchParams.parse(searchParams);

  const variables: OrganizationsQueryVariables = {
    pageSize: pageSize,
    offset: (page - 1) * pageSize,
    orderBy: [OrganizationOrderBy.MembersCountDesc],
    search,
    isMember: false,
  };

  // TODO: discuss the below. Should the check be strictly scoped to ownership??
  // NB: To create an organization, user must be subscribed. If they are subscribed, we validate that they are either on the team tier subscription (unlimited organizations) or that they are not currently an owner/admin of another organization
  const canCreateOrganization =
    isBasicTier && (isTeamTier || !organizations?.totalCount);

  return (
    <Await prefetch={[organizationsOptions(variables)]}>
      <Page
        breadcrumbs={breadcrumbs}
        header={{
          title: app.organizationsPage.header.title,
          description: app.organizationsPage.header.description,
          cta: [
            {
              label: app.organizationsPage.header.cta.newOrganization.label,
              // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
              icon: <LuCirclePlus />,
              dialogType: DialogType.CreateOrganization,
              disabled: !canCreateOrganization,
            },
          ],
        }}
      >
        <OrganizationFilters />

        <OrganizationList />

        {/* dialogs */}
        {canCreateOrganization && (
          <CreateOrganization
            isBasicTier={isBasicTier}
            isTeamTier={isTeamTier}
          />
        )}
      </Page>
    </Await>
  );
};

export default OrganizationsPage;
