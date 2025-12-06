import { useMutation } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";

import {
  Role,
  useCreateMemberMutation,
  useCreateOrganizationMutation as useGeneratedCreateOrganizationMutation,
} from "@/generated/graphql";

import type { UseMutationOptions } from "@tanstack/react-query";
import type {
  CreateOrganizationMutationVariables,
  CreateOrganizationPayload,
} from "@/generated/graphql";

/**
 * Create a new organization.
 */
const useCreateOrganizationMutation = (
  options?: UseMutationOptions<
    CreateOrganizationPayload,
    Error,
    CreateOrganizationMutationVariables
  >,
) => {
  const { session } = useRouteContext({ strict: false });

  const { mutateAsync: createOrganization } =
    useGeneratedCreateOrganizationMutation();
  const { mutateAsync: createMember } = useCreateMemberMutation();

  return useMutation<
    CreateOrganizationPayload,
    Error,
    CreateOrganizationMutationVariables
  >({
    mutationFn: async (variables) => {
      const { createOrganization: createOrganizationResponse } =
        await createOrganization(variables);

      if (!createOrganizationResponse?.organization) {
        throw new Error("Failed to create organization");
      }

      const { createMember: createMemberResponse } = await createMember({
        input: {
          member: {
            userId: session?.user?.rowId!,
            organizationId: createOrganizationResponse?.organization?.rowId!,
            role: Role.Owner,
          },
        },
      });

      if (!createMemberResponse) {
        throw new Error("Failed to add member to organization");
      }

      return Promise.resolve(
        createOrganizationResponse as CreateOrganizationPayload,
      );
    },
    ...options,
  });
};

export default useCreateOrganizationMutation;
