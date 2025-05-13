"use client";

import { Grid } from "@omnidev/sigil";
import { LuBuilding2, LuCirclePlus } from "react-icons/lu";

import { Link, SkeletonArray } from "components/core";
import { OrganizationCard } from "components/dashboard";
import { EmptyState, ErrorBoundary, SectionContainer } from "components/layout";
import { OrganizationOrderBy, useOrganizationsQuery } from "generated/graphql";
import { app } from "lib/config";
import { useDialogStore } from "lib/hooks/store";
import { DialogType } from "store";

import type { Organization } from "generated/graphql";
import type { Session } from "next-auth";

interface Props {
  /** Authenticated user. */
  user: Session["user"];
  /** Whether the authenticated user can create an organizations. */
  canCreateOrganizations: boolean;
  /** Whether the authenticated user is subscribed. */
  isSubscribed: boolean;
}

/**
 * Pinned organizations section.
 */
const PinnedOrganizations = ({
  user,
  canCreateOrganizations,
  isSubscribed,
}: Props) => {
  const { setIsOpen: setIsCreateOrganizationDialogOpen } = useDialogStore({
    type: DialogType.CreateOrganization,
  });

  const {
    data: pinnedOrganizations,
    isLoading,
    isError,
  } = useOrganizationsQuery(
    {
      pageSize: 3,
      offset: 0,
      orderBy: [OrganizationOrderBy.MembersCountDesc],
      userId: user.rowId!,
      isMember: true,
    },
    {
      select: (data) => data?.organizations?.nodes,
    },
  );

  return (
    <SectionContainer
      title={app.dashboardPage.organizations.title}
      description={app.dashboardPage.organizations.description}
      icon={LuBuilding2}
    >
      {isError ? (
        <ErrorBoundary message="Error fetching organizations" h={48} />
      ) : (
        <Grid
          gap={6}
          columns={{
            base: 1,
            md: isLoading
              ? 3
              : pinnedOrganizations?.length
                ? Math.min(3, pinnedOrganizations.length)
                : 1,
          }}
        >
          {isLoading ? (
            <SkeletonArray count={3} h={48} />
          ) : pinnedOrganizations?.length ? (
            pinnedOrganizations?.map((organization) => (
              <Link
                key={organization?.rowId}
                href={`/organizations/${organization?.slug}`}
                role="group"
              >
                <OrganizationCard
                  organization={organization as Partial<Organization>}
                />
              </Link>
            ))
          ) : (
            <EmptyState
              message={app.dashboardPage.organizations.emptyState.message}
              action={{
                label: app.dashboardPage.organizations.emptyState.cta.label,
                onClick: () => setIsCreateOrganizationDialogOpen(true),
                icon: LuCirclePlus,
                disabled: !canCreateOrganizations,
                tooltip: isSubscribed
                  ? app.dashboardPage.organizations.emptyState.subscribedTooltip
                  : app.dashboardPage.organizations.emptyState
                      .noSubscriptionTooltip,
              }}
              h={48}
            />
          )}
        </Grid>
      )}
    </SectionContainer>
  );
};

export default PinnedOrganizations;
