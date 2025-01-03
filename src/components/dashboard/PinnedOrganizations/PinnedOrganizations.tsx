"use client";

import { Button, Flex, Grid, Icon, Stack, Text } from "@omnidev/sigil";
import { useState } from "react";
import { LuBuilding2, LuPlusCircle } from "react-icons/lu";

import { Link, SkeletonArray } from "components/core";
import { OrganizationCard } from "components/dashboard";
import { EmptyState, ErrorBoundary } from "components/layout";
import { CreateOrganization } from "components/organization";
import { OrganizationOrderBy, useOrganizationsQuery } from "generated/graphql";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

import type { Organization } from "generated/graphql";

/**
 * Pinned organizations section.
 */
const PinnedOrganizations = () => {
  const { user } = useAuth();

  const [isCreateOrganizationDialogOpen, setIsCreateOrganizationDialogOpen] =
    useState(false);

  const {
    data: pinnedOrganizations,
    isLoading,
    isError,
  } = useOrganizationsQuery(
    {
      pageSize: 3,
      offset: 0,
      orderBy: [OrganizationOrderBy.UserOrganizationsCountDesc],
      userId: user?.hidraId!,
    },
    {
      enabled: !!user,
      select: (data) => data?.organizations?.nodes,
    }
  );

  return (
    <Flex
      direction="column"
      bgColor="background.default"
      w="100%"
      borderRadius="lg"
      boxShadow="lg"
      borderColor="border.subtle"
      p={6}
      gap={6}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        gap={4}
      >
        <Stack>
          <Flex align="center" gap={2}>
            <Icon src={LuBuilding2} w={5} h={5} color="foreground.subtle" />

            <Text fontSize="2xl" fontWeight="semibold" lineHeight={1.2}>
              {app.dashboardPage.organizations.title}
            </Text>
          </Flex>

          <Text color="foreground.subtle" fontSize="sm">
            {app.dashboardPage.organizations.description}
          </Text>
        </Stack>

        <Link href="/organizations" disabled={!pinnedOrganizations?.length}>
          <Button
            variant="outline"
            color="brand.primary"
            borderColor="brand.primary"
            opacity={{ base: 1, _disabled: 0.5 }}
            disabled={!pinnedOrganizations?.length}
          >
            {app.dashboardPage.cta.viewOrganizations.label}
          </Button>
        </Link>
      </Flex>

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
              <OrganizationCard
                key={organization?.rowId}
                organization={organization as Partial<Organization>}
                // ! NB: explicitly set the height of the card to prevent CLS issues with loading and error states.
                h={48}
              />
            ))
          ) : (
            <EmptyState
              message={app.dashboardPage.organizations.emptyState.message}
              action={{
                label: app.dashboardPage.organizations.emptyState.cta.label,
                icon: LuPlusCircle,
                actionProps: {
                  variant: "outline",
                  color: "brand.primary",
                  borderColor: "brand.primary",
                  onClick: () => setIsCreateOrganizationDialogOpen(true),
                },
              }}
              h={48}
            />
          )}
        </Grid>
      )}

      <CreateOrganization
        isOpen={isCreateOrganizationDialogOpen}
        setIsOpen={setIsCreateOrganizationDialogOpen}
      />
    </Flex>
  );
};

export default PinnedOrganizations;
