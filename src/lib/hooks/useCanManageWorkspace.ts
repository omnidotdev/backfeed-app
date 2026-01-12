/** @knipignore */

import { Role } from "@/generated/graphql";
import { isAdminOrOwner, isOwner } from "@/lib/permissions";

/**
 * Hook for workspace management permission checks.
 * Returns permission flags for workspace-related actions based on role.
 */
export const useCanManageWorkspace = (role: Role | null | undefined) => {
  if (!role) {
    return {
      canInvite: false,
      canChangeRoles: false,
      canRemoveMembers: false,
      canDeleteWorkspace: false,
    };
  }

  return {
    /** admin+ can invite new members */
    canInvite: isAdminOrOwner(role),
    /** admin+ can change member roles (except owners) */
    canChangeRoles: isAdminOrOwner(role),
    /** admin+ can remove members (except owners) */
    canRemoveMembers: isAdminOrOwner(role),
    /** only owner can delete workspace */
    canDeleteWorkspace: isOwner(role),
  };
};

/**
 * Check if a target member can be modified by the current user.
 * Admins cannot modify owners.
 */
export const canModifyMember = (
  currentUserRole: Role,
  targetMemberRole: Role,
): boolean => {
  // owners can modify anyone except other owners
  if (isOwner(currentUserRole)) return targetMemberRole !== Role.Owner;

  // admins can only modify members (not other admins or owners)
  if (currentUserRole === Role.Admin) return targetMemberRole === Role.Member;

  // members cannot modify anyone
  return false;
};
