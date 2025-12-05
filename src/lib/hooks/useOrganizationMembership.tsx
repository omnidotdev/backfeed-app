import { useQuery } from "@tanstack/react-query";

import { Role } from "@/generated/graphql";
import { organizationRoleOptions } from "../options/organizations";

interface Options {
  /** User ID. */
  userId: string | undefined;
  /** Organization ID. */
  organizationId: string | undefined;
}

/**
 * Check organization membership details of a user.
 */
const useOrganizationMembership = ({ userId, organizationId }: Options) => {
  const { data } = useQuery({
    ...organizationRoleOptions({
      userId: userId!,
      organizationId: organizationId!,
    }),
    enabled: !!userId && !!organizationId,
    select: (data) => data.memberByUserIdAndOrganizationId,
  });

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
