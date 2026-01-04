import { useMutation } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";

import {
  Role,
  useCreateMemberMutation,
  useCreateWorkspaceMutation as useGeneratedCreateWorkspaceMutation,
} from "@/generated/graphql";

import type { UseMutationOptions } from "@tanstack/react-query";
import type {
  CreateWorkspaceMutationVariables,
  CreateWorkspacePayload,
} from "@/generated/graphql";

/**
 * Create a new workspace.
 */
const useCreateWorkspaceMutation = (
  options?: UseMutationOptions<
    CreateWorkspacePayload,
    Error,
    CreateWorkspaceMutationVariables
  >,
) => {
  const { session } = useRouteContext({ from: "__root__" });

  const { mutateAsync: createWorkspace } =
    useGeneratedCreateWorkspaceMutation();
  const { mutateAsync: createMember } = useCreateMemberMutation();

  return useMutation<
    CreateWorkspacePayload,
    Error,
    CreateWorkspaceMutationVariables
  >({
    mutationFn: async (variables) => {
      const { createWorkspace: createWorkspaceResponse } =
        await createWorkspace(variables);

      if (!createWorkspaceResponse?.workspace) {
        throw new Error("Failed to create workspace");
      }

      const { createMember: createMemberResponse } = await createMember({
        input: {
          member: {
            userId: session?.user?.rowId!,
            workspaceId: createWorkspaceResponse?.workspace?.rowId!,
            role: Role.Owner,
          },
        },
      });

      if (!createMemberResponse) {
        throw new Error("Failed to add member to workspace");
      }

      return Promise.resolve(createWorkspaceResponse as CreateWorkspacePayload);
    },
    ...options,
  });
};

export default useCreateWorkspaceMutation;
