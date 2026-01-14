import { Stack } from "@omnidev/sigil";
import { useRouteContext } from "@tanstack/react-router";

import EmptyState from "@/components/layout/EmptyState";
import WorkspaceListItem from "@/components/workspace/WorkspaceListItem";
import app from "@/lib/config/app.config";

/**
 * User workspaces list for profile page.
 * Shows workspaces (organizations) the user has access to from JWT claims.
 */
const UserWorkspaces = () => {
  const { session } = useRouteContext({ from: "__root__" });

  // Organizations come from JWT claims, not a database query
  const organizations = session?.organizations ?? [];

  if (!organizations.length) {
    return (
      <EmptyState
        message={app.profileWorkspacesPage.table.emptyState.label}
        minH={48}
      />
    );
  }

  return (
    <Stack gap={4} w="100%">
      {organizations.map((org) => (
        <WorkspaceListItem
          key={org.id}
          workspace={{
            rowId: org.id,
            name: org.name,
            slug: org.slug,
            updatedAt: new Date().toISOString(),
          }}
        />
      ))}
    </Stack>
  );
};

export default UserWorkspaces;
