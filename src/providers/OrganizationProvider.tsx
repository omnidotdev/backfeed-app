import { createContext, use, useMemo, useState } from "react";

import type { PropsWithChildren } from "react";
import type { OrganizationClaim } from "@/lib/auth/getAuth";

interface OrganizationContext {
  organizations: OrganizationClaim[];
  currentOrganization: OrganizationClaim;
  setCurrentOrganization: (orgId: string) => void;
  hasMultipleOrgs: boolean;
  /** Resolve organization details by ID. Returns undefined if not found. */
  getOrganizationById: (orgId: string) => OrganizationClaim | undefined;
}

const OrganizationContext = createContext<OrganizationContext | null>(null);

/**
 * Get the default organization from the list.
 * Priority: personal org first, then first available org.
 */
function getDefaultOrganization(
  organizations: OrganizationClaim[],
): OrganizationClaim {
  const personalOrg = organizations.find((org) => org.type === "personal");
  if (personalOrg) return personalOrg;
  return organizations[0];
}

/**
 * Global organization context provider.
 * Manages the current organization selection for multi-org users.
 */
const OrganizationProvider = ({
  children,
  organizations,
}: PropsWithChildren<{ organizations: OrganizationClaim[] }>) => {
  const defaultOrg = useMemo(
    () => getDefaultOrganization(organizations),
    [organizations],
  );

  const [currentOrganization, setCurrentOrgState] =
    useState<OrganizationClaim>(defaultOrg);

  const setCurrentOrganization = (orgId: string) => {
    const org = organizations.find((o) => o.id === orgId);
    if (org) setCurrentOrgState(org);
  };

  const getOrganizationById = (orgId: string) => {
    return organizations.find((o) => o.id === orgId);
  };

  const hasMultipleOrgs = organizations.length > 1;

  return (
    <OrganizationContext
      value={{
        organizations,
        currentOrganization,
        setCurrentOrganization,
        hasMultipleOrgs,
        getOrganizationById,
      }}
    >
      {children}
    </OrganizationContext>
  );
};

/**
 * Hook to access organization context.
 * Returns null if used outside OrganizationProvider.
 */
export const useOrganization = () => {
  return use(OrganizationContext);
};

export default OrganizationProvider;
