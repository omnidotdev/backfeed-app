"use client";

import { Button, Flex, Grid } from "@omnidev/sigil";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LuBuilding2, LuCirclePlus } from "react-icons/lu";

import { Link } from "components/core";
import { OrganizationCard } from "components/dashboard";
import { EmptyState, ErrorBoundary, SectionContainer } from "components/layout";
import { OrganizationOrderBy } from "generated/graphql";
import { app } from "lib/config";
import { useDialogStore } from "lib/hooks/store";
import { organizationsQueryOptions } from "lib/react-query/options";
import { DialogType } from "store";

import type { Organization, User } from "generated/graphql";

interface Props {
  userId: User["rowId"];
}

/**
 * Pinned organizations section.
 */
const PinnedOrganizations = ({ userId }: Props) => {
  const { setIsOpen: setIsCreateOrganizationDialogOpen } = useDialogStore({
    type: DialogType.CreateOrganization,
  });

  const { data: pinnedOrganizations, isError } = useSuspenseQuery({
    ...organizationsQueryOptions({
      pageSize: 3,
      offset: 0,
      orderBy: [OrganizationOrderBy.MembersCountDesc],
      userId,
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
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        gap={4}
      >
        <Flex
          direction="column"
          position={{ md: "absolute" }}
          top={{ md: 6 }}
          right={{ md: 6 }}
        >
          <Link href="/organizations">
            <Button
              variant="outline"
              color="brand.primary"
              borderColor="brand.primary"
              bgColor={{
                _hover: { base: "brand.primary.50", _dark: "neutral.900" },
              }}
              w={{ base: "full", md: "auto" }}
            >
              {app.dashboardPage.cta.viewOrganizations.label}
            </Button>
          </Link>
        </Flex>
      </Flex>

      {isError ? (
        <ErrorBoundary message="Error fetching organizations" h={48} />
      ) : (
        <Grid
          gap={6}
          columns={{
            base: 1,
            md: pinnedOrganizations?.length
              ? Math.min(3, pinnedOrganizations.length)
              : 1,
          }}
        >
          {pinnedOrganizations?.length ? (
            pinnedOrganizations?.map((organization) => (
              <Link
                key={organization?.rowId}
                href={`/organizations/${organization?.slug}`}
                role="group"
              >
                <OrganizationCard
                  organization={organization as Partial<Organization>}
                  // ! NB: explicitly set the height of the card to prevent CLS issues with loading and error states.
                  h={48}
                />
              </Link>
            ))
          ) : (
            <EmptyState
              message={app.dashboardPage.organizations.emptyState.message}
              action={{
                label: app.dashboardPage.organizations.emptyState.cta.label,
                icon: LuCirclePlus,
                actionProps: {
                  variant: "outline",
                  color: "brand.primary",
                  borderColor: "brand.primary",
                  onMouseDown: () => setIsCreateOrganizationDialogOpen(true),
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
