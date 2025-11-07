import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Role,
  useOrganizationRoleQuery,
  useUpdateMemberMutation,
} from "generated/graphql";
import { useAuth, useOrganizationMembership } from "lib/hooks";

import type { UseMutationOptions } from "@tanstack/react-query";
import type {
  OrganizationRoleQuery,
  UpdateMemberMutationVariables,
  UpdateMemberPayload,
} from "generated/graphql";

interface Options {
  /** Organization ID */
  organizationId: string | undefined;
  /** Mutation options */
  mutationOptions?: UseMutationOptions<
    UpdateMemberPayload,
    Error,
    UpdateMemberMutationVariables
  >;
}

/**
 * Transfer ownership of an organization to another member.
 */
const useTransferOwnershipMutation = ({
  organizationId,
  mutationOptions,
}: Options) => {
  const queryClient = useQueryClient();

  const { user } = useAuth();

  const { membershipId } = useOrganizationMembership({
    userId: user?.rowId,
    organizationId,
  });

  const { mutateAsync: updateMembership } = useUpdateMemberMutation();

  return useMutation<UpdateMemberPayload, Error, UpdateMemberMutationVariables>(
    {
      mutationKey: ["transferOwnership"],
      mutationFn: async (variables) => {
        const { updateMember } = await updateMembership(variables);

        await updateMembership({
          rowId: membershipId!,
          patch: {
            role: Role.Member,
          },
        });

        return Promise.resolve(updateMember as UpdateMemberPayload);
      },
      onMutate: () => {
        const snapshot = queryClient.getQueryData(
          useOrganizationRoleQuery.getKey({
            userId: user?.rowId!,
            organizationId: organizationId!,
          }),
        ) as OrganizationRoleQuery;

        queryClient.setQueryData(
          useOrganizationRoleQuery.getKey({
            userId: user?.rowId!,
            organizationId: organizationId!,
          }),
          {
            memberByUserIdAndOrganizationId: {
              ...snapshot?.memberByUserIdAndOrganizationId,
              role: Role.Member,
            },
          },
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: useOrganizationRoleQuery.getKey({
            userId: user?.rowId!,
            organizationId: organizationId!,
          }),
        });
      },
      ...mutationOptions,
    },
  );
};

export default useTransferOwnershipMutation;
