import { useQuery } from "@tanstack/react-query";

import { Role } from "generated/graphql";
import { organizationRoleQueryOptions } from "lib/react-query/options";

interface Options {
  userId: string | undefined;
  organizationId: string | undefined;
}

/**
 * Check organization membership details of a user.
 */
const useOrganizationMembership = ({ userId, organizationId }: Options) => {
  const { data } = useQuery(
    organizationRoleQueryOptions({
      userId: userId!,
      organizationId: organizationId!,
    })
  );

  return {
    /**
     * Organization membership ID for the user. If the user is not a member, this will be undefined.
     */
    membershipId: data?.rowId,
    /**
     * Boolean indicating if the user has ownership permissions for the organization (owner role only).
     */
    isOwner: data?.role === Role.Owner,
    /**
     * Boolean indicating if the user has admin permissions for the organization (admin or owner role).
     */
    isAdmin: data?.role === Role.Admin || data?.role === Role.Owner,
    /**
     * Boolean indicating if the user is a member of the organization.
     */
    isMember: data != null,
  };
};

export default useOrganizationMembership;
