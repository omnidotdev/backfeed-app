"use client";

import { Button, Flex, Grid, Icon, Stack, Text } from "@omnidev/sigil";
import { useRouter } from "next/navigation";
import { LuBuilding2 } from "react-icons/lu";

import { SkeletonArray } from "components/core";
import { OrganizationCard } from "components/dashboard";
import { ErrorBoundary } from "components/layout";
import { OrganizationOrderBy, useOrganizationsQuery } from "generated/graphql";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

import type { Organization } from "generated/graphql";

/**
 * Pinned organizations section.
 */
const PinnedOrganizations = () => {
  const router = useRouter();
  const { user } = useAuth();

  const {
    data: pinnedOrganizations,
    isLoading,
    isError,
  } = useOrganizationsQuery(
    {
      first: 3,
      orderBy: [OrganizationOrderBy.UserOrganizationsCountDesc],
      userId: user?.id!,
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

        <Button
          variant="outline"
          color="brand.primary"
          borderColor="brand.primary"
          // TODO: discuss wrapping this in a `Link` instead. Big thing is discussing best way to style the `a` tag.
          onClick={() => router.push("/organizations")}
        >
          {app.dashboardPage.cta.viewOrganizations.label}
        </Button>
      </Flex>

      {isError ? (
        <ErrorBoundary message="Error fetching organizations" h={48} />
      ) : (
        <Grid
          gap={6}
          columns={{
            base: 1,
            md: pinnedOrganizations?.length
              ? Math.min(pinnedOrganizations.length, 3)
              : // TODO: discuss case where a user is not part of any organizations.
                1,
          }}
        >
          {isLoading ? (
            <SkeletonArray count={3} h={48} />
          ) : (
            pinnedOrganizations?.map((organization) => (
              <OrganizationCard
                key={organization?.rowId}
                organization={organization as Partial<Organization>}
                // ! NB: explicitly set the height of the card to prevent CLS issues with loading and error states.
                h={48}
              />
            ))
          )}
        </Grid>
      )}
    </Flex>
  );
};

export default PinnedOrganizations;
