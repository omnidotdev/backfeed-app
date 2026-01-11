import { Button, Icon, Menu, MenuItem, MenuItemGroup } from "@omnidev/sigil";
import { LuBuilding2, LuChevronDown, LuUser } from "react-icons/lu";

import { useOrganizationSafe } from "@/providers/OrganizationProvider";

/**
 * Organization switcher component.
 * Only renders when user has multiple organizations.
 * Safe to use outside OrganizationProvider (renders nothing).
 */
const OrganizationSwitcher = () => {
  const orgContext = useOrganizationSafe();

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
    <Menu
      trigger={
        <Button variant="ghost" size="sm">
          <Icon
            src={currentOrganization.type === "personal" ? LuUser : LuBuilding2}
          />
          {currentOrganization.slug}
          <Icon src={LuChevronDown} />
        </Button>
      }
      onSelect={(details) => {
        const orgId = details.value;
        if (orgId) setCurrentOrganization(orgId);
      }}
    >
      <MenuItemGroup>
        {organizations.map((org) => (
          <MenuItem
            key={org.id}
            value={org.id}
            disabled={org.id === currentOrganization.id}
          >
            <Icon src={org.type === "personal" ? LuUser : LuBuilding2} />
            {org.slug}
            {org.type === "personal" && " (Personal)"}
          </MenuItem>
        ))}
      </MenuItemGroup>
    </Menu>
  );
};

export default OrganizationSwitcher;
