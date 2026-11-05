import { workspacesUrl } from "@omnidotdev/providers/react";
import { WorkspaceSwitcher as SharedWorkspaceSwitcher } from "@omnidotdev/thornberry/workspace-switcher";

import { ACCOUNT_URL } from "@/lib/config/env.config";
import { useWorkspace } from "@/providers/WorkspaceProvider";

/**
 * Workspace (organization) switcher shown in the header.
 *
 * Membership comes from the signed-in user's identity claims; selecting a
 * workspace updates the in-memory active organization. Presentation is the
 * shared thornberry switcher, and creating/managing workspaces is delegated to
 * the account hub workspaces console. A single-workspace user sees a static label.
 */
const WorkspaceSwitcher = () => {
  const workspaceContext = useWorkspace();

  if (!workspaceContext) return null;

  const { workspaces, currentWorkspace, setCurrentWorkspace } =
    workspaceContext;

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
      {...(ACCOUNT_URL && {
        manageUrl: workspacesUrl(ACCOUNT_URL),
      })}
    />
  );
};

export default WorkspaceSwitcher;
