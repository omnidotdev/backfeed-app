import { useQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import { useMemo } from "react";

import { organizationMembersOptions } from "@/lib/options/organizationMembers";

/** An organization member's role, as owned by the IDP. */
export type OrgRole = "owner" | "admin" | "member";

/**
 * Map an organization's members to their roles, keyed by `identityProviderId`
 * (the IDP user id, which equals a backfeed user's `identityProviderId`). Lets a
 * card resolve an author's role for a {@link RoleBadge}. Sourced from the IDP
 * (the membership SSOT), so it is empty for signed-out viewers (not signed in)
 * and for non-members.
 */
const useOrgRoleMap = (organizationId?: string): Map<string, OrgRole> => {
  const { session } = useRouteContext({ from: "__root__" });

  const { data } = useQuery(
    organizationMembersOptions({
      organizationId: organizationId ?? "",
      enabled: !!session?.user,
    }),
  );

  return useMemo(() => {
    const roles = new Map<string, OrgRole>();
    for (const member of data?.data ?? [])
      roles.set(member.userId, member.role);
    return roles;
  }, [data]);
};

export default useOrgRoleMap;
