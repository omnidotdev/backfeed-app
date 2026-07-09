import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { organizationMemberRolesOptions } from "@/lib/options/organizationMemberRoles";

/** An organization member's role, as owned by the IDP. */
export type OrgRole = "owner" | "admin" | "member";

/**
 * Map an organization's owner/admin members to their roles, keyed by
 * `identityProviderId` (the IDP user id, which equals a backfeed user's
 * `identityProviderId`). Lets a card resolve an author's role for a
 * {@link RoleBadge}. Sourced from the IDP (the membership SSOT) via the public,
 * owner/admin-only projection, so staff badges render for every viewer including
 * signed-out visitors and non-members. Ordinary reporters (members) are omitted
 * and stay unbadged.
 */
const useOrgRoleMap = (organizationId?: string): Map<string, OrgRole> => {
  const { data } = useQuery(
    organizationMemberRolesOptions({ organizationId: organizationId ?? "" }),
  );

  return useMemo(() => {
    const roles = new Map<string, OrgRole>();
    for (const member of data?.data ?? [])
      roles.set(member.userId, member.role);
    return roles;
  }, [data]);
};

export default useOrgRoleMap;
