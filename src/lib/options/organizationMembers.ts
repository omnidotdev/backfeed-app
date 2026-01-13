/**
 * Query options for organization members from IDP.
 *
 * This replaces the local database member queries with IDP API calls.
 * The IDP is the single source of truth for organization membership.
 */

import { queryOptions } from "@tanstack/react-query";

import { fetchOrganizationMembers } from "@/lib/idp";

export interface OrganizationMembersVariables {
  organizationId: string;
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
    queryFn: () => fetchOrganizationMembers(organizationId, accessToken),
    enabled: !!organizationId && !!accessToken,
  });
