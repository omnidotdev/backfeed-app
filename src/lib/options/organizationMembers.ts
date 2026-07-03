/**
 * Query options for organization members from IDP.
 *
 * Fetches through a server function (never the browser): Gatekeeper's member API
 * is server-side only, so the call runs under the caller's session on the server
 * and the IDP authorizes it by membership. The IDP is the single source of truth
 * for organization membership.
 */

import { queryOptions } from "@tanstack/react-query";

import { listOrganizationMembers } from "@/server/functions/organizations";

export interface OrganizationMembersVariables {
  organizationId: string;
  /**
   * Auth-presence gate: the roster is only readable for a signed-in caller. The
   * IDP call authenticates server-side, so gate on a stable signed-in signal
   * rather than the (transient) client access token.
   */
  enabled?: boolean;
}

/**
 * Query options for fetching organization members from IDP.
 */
export const organizationMembersOptions = ({
  organizationId,
  enabled = true,
}: OrganizationMembersVariables) =>
  queryOptions({
    queryKey: ["organizationMembers", organizationId],
    queryFn: () => listOrganizationMembers({ data: { organizationId } }),
    enabled: !!organizationId && enabled,
  });
