import { Button, Flex, Grid, Icon } from "@omnidev/sigil";
import { Link, useRouteContext } from "@tanstack/react-router";
import { LuBuilding2, LuPlus } from "react-icons/lu";

import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import SectionContainer from "@/components/layout/SectionContainer";
import app from "@/lib/config/app.config";
import { AUTH_BASE_URL } from "@/lib/config/env.config";

/**
 * Pinned workspaces section.
 *
 * Shows the user's organizations from JWT claims. Organizations are managed
 * by Gatekeeper (IDP), not the local database.
 */
const PinnedWorkspaces = () => {
  const { session } = useRouteContext({ from: "/_auth/dashboard" });

  // Organizations come from JWT claims, not a local workspace table
  const organizations = session?.organizations ?? [];

  // Take first 3 organizations to display
  const pinnedOrgs = organizations.slice(0, 3);

  return (
    <SectionContainer
      title={app.dashboardPage.workspaces.title}
      description={app.dashboardPage.workspaces.description}
      icon={LuBuilding2}
    >
      <Grid
        // NB: The padding is necessary to prevent clipping of the card borders/box shadows
        p="1px"
        gap={6}
        columns={{
          base: 1,
          md: pinnedOrgs.length ? Math.min(3, pinnedOrgs.length) : 1,
        }}
      >
        {pinnedOrgs.length ? (
          pinnedOrgs.map((org) => (
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
                }}
                // NB: min height ensures consistent card sizing while allowing growth for longer content
                minH={48}
              />
            </Link>
          ))
        ) : (
          <Flex
            direction="column"
            align="center"
            justify="center"
            textAlign="center"
            borderRadius="md"
            borderWidth="1px"
            borderStyle="dashed"
            gap={4}
            p={6}
            h={48}
          >
            {app.dashboardPage.workspaces.emptyState.message}

            {/* TODO: Implement in-app organization creation once Gatekeeper API supports it */}
            <Button variant="outline" size="sm" asChild>
              <a href={AUTH_BASE_URL}>
                <Icon src={LuPlus} />
                Manage Organizations
              </a>
            </Button>
          </Flex>
        )}
      </Grid>
    </SectionContainer>
  );
};

export default PinnedWorkspaces;
