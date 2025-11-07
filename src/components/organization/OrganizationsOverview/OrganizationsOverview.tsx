"use client";

import { Page } from "components/layout";
import {
  CreateOrganization,
  OrganizationFilters,
  OrganizationList,
} from "components/organization";
import {
  Role,
  Tier,
  useOrganizationsQuery,
  useUserQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { LuCirclePlus } from "react-icons/lu";
import { DialogType } from "store";

import type { BreadcrumbRecord } from "components/core";
import type { Session } from "next-auth";

const breadcrumbs: BreadcrumbRecord[] = [
  {
    label: app.organizationsPage.breadcrumb,
  },
];

interface Props {
  /** Authenticated user. */
  user: Session["user"];
}

/**
 * Organizations page overview.
 */
const OrganizationsOverview = ({ user }: Props) => {
  const { data: organizations } = useOrganizationsQuery(
    {
      pageSize: 1,
      userId: user.rowId,
      excludeRoles: [Role.Member, Role.Admin],
    },
    {
      select: (data) => data?.organizations,
    },
  );

  const { data: tierRestrictions } = useUserQuery(
    {
      hidraId: user.hidraId!,
    },
    {
      enabled: !!organizations,
      select: (data) => {
        const userTier = data?.userByHidraId?.tier;

        const isTeamTier =
          userTier && ![Tier.Free, Tier.Basic].includes(userTier);
        const isFreeTier = !!userTier;

        return {
          isSubscribed: isFreeTier,
          // NB: if the user is not subscribed to a team tier subscription or higher, limit the number of organizations they can create to just one.
          canCreateOrganizations:
            isTeamTier || (isFreeTier && !organizations?.totalCount),
        };
      },
    },
  );

  return (
    <Page
      breadcrumbs={breadcrumbs}
      header={{
        title: app.organizationsPage.header.title,
        cta: [
          {
            label: app.organizationsPage.header.cta.newOrganization.label,
            // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
            icon: <LuCirclePlus />,
            dialogType: DialogType.CreateOrganization,
            disabled: !tierRestrictions?.canCreateOrganizations,
            tooltip: tierRestrictions?.isSubscribed
              ? app.organizationsPage.header.cta.newOrganization
                  .subscribedTooltip
              : app.organizationsPage.header.cta.newOrganization
                  .noSubscriptionTooltip,
          },
        ],
      }}
    >
      <OrganizationFilters />

      <OrganizationList
        canCreateOrganization={tierRestrictions?.canCreateOrganizations}
        isSubscribed={tierRestrictions?.isSubscribed}
      />

      {/* dialogs */}
      {tierRestrictions?.canCreateOrganizations && <CreateOrganization />}
    </Page>
  );
};

export default OrganizationsOverview;
