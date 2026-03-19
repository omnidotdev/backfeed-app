import { Flex, Grid, Icon, Text } from "@omnidev/sigil";
import { useQueries } from "@tanstack/react-query";
import { Link, getRouteApi } from "@tanstack/react-router";
import { LuBuilding2, LuPlus } from "react-icons/lu";

import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import app from "@/lib/config/app.config";
import { AUTH_BASE_URL } from "@/lib/config/env.config";
import { workspaceMetricsOptions } from "@/lib/options/workspaces";

const dashboardRoute = getRouteApi("/_app/dashboard");

/**
 * Pinned workspaces section.
 *
 * Shows the user's organizations from JWT claims. Organizations are managed
 * by Gatekeeper (IDP), not the local database.
 */
const PinnedWorkspaces = () => {
  const { session } = dashboardRoute.useRouteContext();

  // Organizations come from JWT claims, not a local workspace table
  const organizations = session?.organizations ?? [];

  // Fetch project counts for each organization in parallel
  const metricsQueries = useQueries({
    queries: organizations.map((org) =>
      workspaceMetricsOptions({ organizationId: org.id }),
    ),
  });

  // Create a map of organization ID to project count
  const projectCountsByOrgId = organizations.reduce<Record<string, number>>(
    (acc, org, index) => {
      const data = metricsQueries[index]?.data;
      acc[org.id] = data?.projects?.totalCount ?? 0;
      return acc;
    },
    {},
  );

  // Take first 4 organizations to display in 2x2 grid
  const pinnedOrgs = organizations.slice(0, 4);

  if (!pinnedOrgs.length) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        textAlign="center"
        borderRadius="xl"
        borderWidth="1px"
        borderStyle="dashed"
        borderColor="border.subtle"
        gap={3}
        p={8}
      >
        <Icon src={LuBuilding2} w={8} h={8} color="foreground.subtle" />

        <Text color="foreground.subtle" fontSize="sm">
          {app.dashboardPage.workspaces.emptyState.message}
        </Text>

        <a href={AUTH_BASE_URL}>
          <Flex
            align="center"
            gap={1.5}
            color="foreground.default"
            fontSize="sm"
            fontWeight="medium"
            mt={1}
            _hover={{ textDecoration: "underline" }}
          >
            <Icon src={LuPlus} w={4} h={4} />
            Create Organization
          </Flex>
        </a>
      </Flex>
    );
  }

  const hasMore = organizations.length > 4;

  return (
    <Flex direction="column" gap={3}>
      <Grid gap={4} columns={{ base: 1, sm: 2 }}>
        {pinnedOrgs.map((org) => (
          <Link
            key={org.id}
            to="/workspaces/$workspaceSlug"
            params={{ workspaceSlug: org.slug }}
            role="group"
          >
            <WorkspaceCard
              workspace={{
                rowId: org.id,
                name: org.name ?? org.slug,
                slug: org.slug,
                organizationId: org.id,
                type: org.type,
                projects: {
                  totalCount: projectCountsByOrgId[org.id],
                },
              }}
              minH={32}
            />
          </Link>
        ))}

        {pinnedOrgs.length < 4 && (
          <a href={AUTH_BASE_URL}>
            <Flex
              direction="column"
              align="center"
              justify="center"
              textAlign="center"
              borderRadius="xl"
              borderWidth="1px"
              borderStyle="dashed"
              borderColor="border.subtle"
              gap={2}
              p={5}
              minH={32}
              color="foreground.subtle"
              transition="all 0.15s ease"
              _hover={{
                borderColor: "border.default",
                color: "foreground.default",
              }}
            >
              <Icon src={LuPlus} w={5} h={5} />
              <Text fontSize="sm" fontWeight="medium">
                Add Workspace
              </Text>
              <Text fontSize="xs" color="foreground.muted">
                via Omni Organizations
              </Text>
            </Flex>
          </a>
        )}
      </Grid>

      {hasMore && session?.user?.identityProviderId && (
        <Link
          to="/profile/$userId/workspaces"
          params={{ userId: session.user.identityProviderId }}
        >
          <Flex
            align="center"
            justify="center"
            gap={1.5}
            color="foreground.subtle"
            fontSize="sm"
            fontWeight="medium"
            _hover={{ color: "foreground.default" }}
          >
            View all {organizations.length} workspaces
          </Flex>
        </Link>
      )}
    </Flex>
  );
};

export default PinnedWorkspaces;
