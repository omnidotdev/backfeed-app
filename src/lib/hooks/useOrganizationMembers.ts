/**
 * Hooks for organization member management via IDP
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeMember, updateMemberRole } from "@/lib/idp";
import {
  cancelOrganizationInvitation,
  inviteOrganizationMember,
  resendOrganizationInvitation,
} from "@/server/functions/organizations";

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

/**
 * Hook to invite a member via server function.
 * Uses a server function to avoid CORS issues with the IDP's Better Auth endpoint
 */
export function useInviteMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      organizationId: string;
      email: string;
      role: "admin" | "member";
    }) => inviteOrganizationMember({ data: params }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["organizationMembers", variables.organizationId],
      });
      queryClient.invalidateQueries({
        queryKey: ["organizationInvitations", variables.organizationId],
      });
    },
  });
}

/**
 * Hook to resend an invitation (active or expired).
 * Uses dedicated server function that skips active-pending validation
 */
export function useResendInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      organizationId: string;
      email: string;
      role: "admin" | "member";
    }) => resendOrganizationInvitation({ data: params }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["organizationInvitations", variables.organizationId],
      });
    },
  });
}

/**
 * Hook to cancel an organization invitation via server function
 */
export function useCancelInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { invitationId: string; organizationId: string }) =>
      cancelOrganizationInvitation({
        data: { invitationId: params.invitationId },
      }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["organizationInvitations", variables.organizationId],
      });
    },
  });
}
