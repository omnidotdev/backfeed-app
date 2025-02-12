import { Role, useOrganizationRoleQuery } from "generated/graphql";

interface Options {
  userId: string | undefined;
  organizationId: string | undefined;
}

/**
 * Check organization membership details of a user.
 */
const useOrganizationMembership = ({ userId, organizationId }: Options) => {
  const { data } = useOrganizationRoleQuery(
    {
      userId: userId!,
      organizationId: organizationId!,
    },
    {
      enabled: !!userId && !!organizationId,
      select: (data) => data.memberByUserIdAndOrganizationId,
    }
  );

  return {
    membershipId: data?.rowId,
    isOwner: data?.role === Role.Owner,
    isAdmin: data?.role === Role.Admin || data?.role === Role.Owner,
    isMember: data != null,
  };
};

export default useOrganizationMembership;
