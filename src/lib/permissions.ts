/** @knipignore */

/**
 * UI-level permission helpers for role-based access control.
 *
 * IMPORTANT: These functions are for UI/UX purposes only (e.g., hiding buttons, disabling actions).
 * Actual authorization is enforced server-side via the PDP.
 * The API is the security boundary - these checks simply provide a better user experience
 * by preventing users from attempting actions they cannot perform.
 */

import { Role } from "@/generated/graphql";

/**
 * Check if user has admin or owner role.
 */
export const isAdminOrOwner = (role: Role): boolean =>
  role === Role.Admin || role === Role.Owner;

/**
 * Check if user is the workspace owner.
 */
export const isOwner = (role: Role): boolean => role === Role.Owner;
