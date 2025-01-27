import { Role, useOrganizationRoleQuery } from "generated/graphql";

interface Options {
  userId: string | undefined;
  organizationId: string | undefined;
}

const useIsOrganizationOwner = ({ userId, organizationId }: Options) =>
  useOrganizationRoleQuery(
    {
      userId: userId!,
      organizationId: organizationId!,
    },
    {
      enabled: !!userId && !!organizationId,
      select: (data) =>
        data.userOrganizationByUserIdAndOrganizationId?.role === Role.Owner,
    }
  );

export default useIsOrganizationOwner;
