import { gatekeeperDashboardUrl } from "@omnidotdev/providers/react";
import { WorkspaceSwitcher as SharedWorkspaceSwitcher } from "@omnidotdev/thornberry/workspace-switcher";

import { AUTH_BASE_URL } from "@/lib/config/env.config";
import { useWorkspace } from "@/providers/WorkspaceProvider";

/**
 * Workspace (organization) switcher shown in the header.
 *
 * Membership comes from the signed-in user's identity claims; selecting a
 * workspace updates the in-memory active organization. Presentation is the
 * shared thornberry switcher, and creating/managing workspaces is delegated to
 * the identity dashboard. A single-workspace user sees a static label.
 */
const WorkspaceSwitcher = () => {
  const workspaceContext = useWorkspace();

  if (!workspaceContext) return null;

  const {
    organizations: workspaces,
    currentOrganization: currentWorkspace,
    setCurrentOrganization: setCurrentWorkspace,
  } = workspaceContext;

  if (!currentWorkspace) return null;

  const handleSelect = (id: string) => {
    if (id === currentWorkspace.id) return;
    setCurrentWorkspace(id);
  };

  return (
    <SharedWorkspaceSwitcher
      workspaces={workspaces.map((workspace) => ({
        id: workspace.id,
        name: workspace.name,
        logo: workspace.logo,
      }))}
      currentWorkspaceId={currentWorkspace.id}
      onSelect={handleSelect}
      {...(AUTH_BASE_URL && {
        manageUrl: gatekeeperDashboardUrl(AUTH_BASE_URL),
      })}
    />
  );
};

export default WorkspaceSwitcher;
