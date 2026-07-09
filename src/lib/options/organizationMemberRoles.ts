/**
 * Query options for an organization's public author role badges.
 *
 * Unlike {@link organizationMembersOptions} (the member-gated roster used by the
 * management UI, which carries member PII), this reads the unauthenticated,
 * owner/admin-only `{ userId, role }` projection so the public feedback board can
 * badge staff replies for signed-out visitors and non-members. The IDP remains
 * the single source of truth for membership.
 */

import { queryOptions } from "@tanstack/react-query";

import { fetchOrganizationMemberRoles } from "@/server/functions/organizations";

export interface OrganizationMemberRolesVariables {
  organizationId: string;
}

/**
 * Query options for fetching an organization's owner/admin roles (public).
 */
export const organizationMemberRolesOptions = ({
  organizationId,
}: OrganizationMemberRolesVariables) =>
  queryOptions({
    queryKey: ["organizationMemberRoles", organizationId],
    queryFn: () => fetchOrganizationMemberRoles({ data: { organizationId } }),
    enabled: !!organizationId,
  });
