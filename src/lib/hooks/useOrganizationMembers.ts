/**
 * Hooks for organization member management via IDP.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeMember, updateMemberRole } from "@/lib/idp";

import type { RemoveMemberParams, UpdateMemberRoleParams } from "@/lib/idp";

/**
 * Hook to update a member's role via IDP.
 */
export function useUpdateMemberRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateMemberRoleParams) => updateMemberRole(params),
    onSuccess: (_data, variables) => {
      // Invalidate the organization members query
      queryClient.invalidateQueries({
        queryKey: ["organizationMembers", variables.organizationId],
      });
    },
  });
}

/**
 * Hook to remove a member via IDP.
 */
export function useRemoveMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: RemoveMemberParams) => removeMember(params),
    onSuccess: (_data, variables) => {
      // Invalidate the organization members query
      queryClient.invalidateQueries({
        queryKey: ["organizationMembers", variables.organizationId],
      });
    },
  });
}
