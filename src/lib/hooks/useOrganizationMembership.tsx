import { Role, useOrganizationRoleQuery } from "generated/graphql";

interface Options {
  userId: string | undefined;
  organizationId: string | undefined;
}

const useOrganizationMembership = ({ userId, organizationId }: Options) => {
  const { data: role } = useOrganizationRoleQuery(
    {
      userId: userId!,
      organizationId: organizationId!,
    },
    {
      enabled: !!userId && !!organizationId,
      select: (data) => data.userOrganizationByUserIdAndOrganizationId?.role,
    }
  );

  return {
    isOwner: role === Role.Owner,
    isAdmin: role === Role.Admin || role === Role.Owner,
    isMember: role != null,
  };
};

export default useOrganizationMembership;
