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
   * Auth-presence signal used to gate the query. The IDP call uses the server
   * session access token, not this value.
   */
  accessToken: string;
}

/**
 * Query options for fetching organization members from IDP.
 */
export const organizationMembersOptions = ({
  organizationId,
  accessToken,
}: OrganizationMembersVariables) =>
  queryOptions({
    queryKey: ["organizationMembers", organizationId],
    queryFn: () => listOrganizationMembers({ data: { organizationId } }),
    enabled: !!organizationId && !!accessToken,
  });
