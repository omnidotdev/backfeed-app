/** @knipignore */

import { isAdminOrOwner, isOwner } from "@/lib/permissions";

import type { IdpRole } from "@/lib/permissions";

/**
 * Hook for workspace management permission checks.
 * Returns permission flags for workspace-related actions based on role.
 */
export const useCanManageWorkspace = (role: IdpRole | null | undefined) => {
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
  currentUserRole: IdpRole,
  targetMemberRole: IdpRole,
): boolean => {
  // owners can modify anyone except other owners
  if (isOwner(currentUserRole)) return targetMemberRole !== "owner";

  // admins can only modify members (not other admins or owners)
  if (currentUserRole === "admin") return targetMemberRole === "member";

  // members cannot modify anyone
  return false;
};
