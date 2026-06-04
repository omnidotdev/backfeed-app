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
import { useOrganization } from "@/providers/OrganizationProvider";

/**
 * Organization switcher component.
 * Only renders when user has multiple organizations.
 * Safe to use outside OrganizationProvider (renders nothing).
 */
const OrganizationSwitcher = () => {
  const orgContext = useOrganization();

  // Not in auth context or no organizations
  if (!orgContext) return null;

  const {
    organizations,
    currentOrganization,
    setCurrentOrganization,
    hasMultipleOrgs,
  } = orgContext;

  // Only show switcher when user has multiple orgs
  if (!hasMultipleOrgs) return null;

  return (
    <MenuRoot
      onSelect={(details) => {
        const orgId = details.value;
        if (orgId) setCurrentOrganization(orgId);
      }}
    >
      <MenuTrigger asChild>
        <Button variant="ghost" size="sm">
          {currentOrganization.type === "personal" ? (
            <LuUser />
          ) : (
            <LuBuilding2 />
          )}
          {currentOrganization.slug}
          <LuChevronDown />
        </Button>
      </MenuTrigger>

      <MenuPositioner>
        <MenuContent>
          <MenuItemGroup>
            {organizations.map((org) => (
              <MenuItem
                key={org.id}
                value={org.id}
                disabled={org.id === currentOrganization.id}
              >
                {org.type === "personal" ? <LuUser /> : <LuBuilding2 />}
                {org.slug}
                {org.type === "personal" && " (Personal)"}
              </MenuItem>
            ))}
          </MenuItemGroup>

          <MenuSeparator />

          {/* TODO: Implement in-app organization creation once Gatekeeper API supports it */}
          <MenuItemGroup>
            <MenuItem value="manage-orgs" asChild>
              <a href={AUTH_BASE_URL}>
                <LuPlus />
                Manage Organizations
              </a>
            </MenuItem>
          </MenuItemGroup>
        </MenuContent>
      </MenuPositioner>
    </MenuRoot>
  );
};

export default OrganizationSwitcher;
