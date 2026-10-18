import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
} from "@omnidotdev/thornberry/avatar";
import { LuBuilding2, LuChevronDown, LuPlus, LuUser } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuPositioner,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import { AUTH_BASE_URL } from "@/lib/config/env.config";
import { useWorkspace } from "@/providers/WorkspaceProvider";

/**
 * Workspace switcher component.
 * Only renders when user has multiple workspaces.
 * Safe to use outside WorkspaceProvider (renders nothing).
 */
const WorkspaceSwitcher = () => {
  const workspaceContext = useWorkspace();

  // Not in auth context or no workspaces
  if (!workspaceContext) return null;

  const {
    organizations: workspaces,
    currentOrganization: currentWorkspace,
    setCurrentOrganization: setCurrentWorkspace,
    hasMultipleOrgs: hasMultipleWorkspaces,
  } = workspaceContext;

  // Only show switcher when user has multiple workspaces
  if (!hasMultipleWorkspaces) return null;

  return (
    <MenuRoot
      onSelect={(details) => {
        const workspaceId = details.value;
        if (workspaceId) setCurrentWorkspace(workspaceId);
      }}
    >
      <MenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <AvatarRoot size="xs" className="size-5">
            <AvatarImage
              src={currentWorkspace.logo ?? undefined}
              alt={currentWorkspace.slug}
            />
            <AvatarFallback>
              {currentWorkspace.type === "personal" ? (
                <LuUser />
              ) : (
                <LuBuilding2 />
              )}
            </AvatarFallback>
          </AvatarRoot>
          {currentWorkspace.slug}
          <LuChevronDown />
        </Button>
      </MenuTrigger>

      <MenuPositioner>
        <MenuContent>
          <MenuItemGroup>
            {workspaces.map((workspace) => (
              <MenuItem
                key={workspace.id}
                value={workspace.id}
                disabled={workspace.id === currentWorkspace.id}
              >
                <AvatarRoot size="xs" className="size-5">
                  <AvatarImage
                    src={workspace.logo ?? undefined}
                    alt={workspace.slug}
                  />
                  <AvatarFallback>
                    {workspace.type === "personal" ? (
                      <LuUser />
                    ) : (
                      <LuBuilding2 />
                    )}
                  </AvatarFallback>
                </AvatarRoot>
                {workspace.slug}
                {workspace.type === "personal" && " (Personal)"}
              </MenuItem>
            ))}
          </MenuItemGroup>

          <MenuSeparator />

          {/* TODO: Implement in-app organization creation once Gatekeeper API supports it */}
          <MenuItemGroup>
            <MenuItem value="manage-orgs" asChild>
              <a href={AUTH_BASE_URL}>
                <LuPlus />
                Manage Workspaces
              </a>
            </MenuItem>
          </MenuItemGroup>
        </MenuContent>
      </MenuPositioner>
    </MenuRoot>
  );
};

export default WorkspaceSwitcher;
