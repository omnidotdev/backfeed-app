import { Grid } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { Link, useRouteContext } from "@tanstack/react-router";
import { LuBuilding2, LuCirclePlus } from "react-icons/lu";

import SkeletonArray from "@/components/core/SkeletonArray";
import OrganizationCard from "@/components/dashboard/OrganizationCard";
import EmptyState from "@/components/layout/EmptyState";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import SectionContainer from "@/components/layout/SectionContainer";
import { OrganizationOrderBy } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import { organizationsOptions } from "@/lib/options/organizations";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";

import type { Organization } from "@/generated/graphql";

/**
 * Pinned organizations section.
 */
const PinnedOrganizations = () => {
  const { session } = useRouteContext({ from: "/_auth/dashboard" });
  const { setIsOpen: setIsCreateOrganizationDialogOpen } = useDialogStore({
    type: DialogType.CreateOrganization,
  });

  const {
    data: pinnedOrganizations,
    isLoading,
    isError,
  } = useQuery({
    ...organizationsOptions({
      pageSize: 3,
      offset: 0,
      orderBy: [OrganizationOrderBy.MembersCountDesc],
      userId: session?.user.rowId!,
      isMember: true,
    }),
    select: (data) => data?.organizations?.nodes,
  });

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
                to="/organizations/$organizationSlug"
                params={{ organizationSlug: organization?.slug! }}
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
