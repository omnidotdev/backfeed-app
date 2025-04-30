"use client";

import { Grid } from "@omnidev/sigil";
import { LuBuilding2, LuCirclePlus } from "react-icons/lu";

import { Link, SkeletonArray } from "components/core";
import { OrganizationCard } from "components/dashboard";
import { EmptyState, ErrorBoundary, SectionContainer } from "components/layout";
import { OrganizationOrderBy, useOrganizationsQuery } from "generated/graphql";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";
import { useDialogStore } from "lib/hooks/store";
import { DialogType } from "store";

import type { Organization } from "generated/graphql";

interface Props {
  /** Whether the user has basic tier subscription permissions. */
  isBasicTier: boolean;
}

/**
 * Pinned organizations section.
 */
const PinnedOrganizations = ({ isBasicTier }: Props) => {
  const { user } = useAuth();

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
      userId: user?.rowId!,
      isMember: true,
    },
    {
      enabled: !!user?.rowId,
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
              tooltip={app.dashboardPage.organizations.emptyState.tooltip}
              action={{
                label: app.dashboardPage.organizations.emptyState.cta.label,
                icon: LuCirclePlus,
                actionProps: {
                  variant: "outline",
                  color: "brand.primary",
                  borderColor: "brand.primary",
                  bgColor: {
                    _hover: { base: "brand.primary.50", _dark: "neutral.900" },
                  },
                  onClick: () => setIsCreateOrganizationDialogOpen(true),
                  disabled: !isBasicTier,
                  _disabled: {
                    color: "foreground.disabled",
                    borderColor: "border.disabled",
                  },
                },
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
