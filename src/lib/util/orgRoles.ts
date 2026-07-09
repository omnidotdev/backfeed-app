import type { GatekeeperMember } from "@omnidotdev/providers/auth";

/** A privileged (badge-worthy) organization role. Ordinary members are omitted. */
export type PrivilegedRole = "owner" | "admin";

/** Minimal, PII-free role entry for public author badges. */
export interface MemberRole {
  /** The IDP user id, equal to a backfeed user's `identityProviderId`. */
  userId: string;
  role: PrivilegedRole;
}

/**
 * Project a Gatekeeper member roster to the minimal `{ userId, role }` entries
 * that drive public author badges: only owner/admin are kept (ordinary reporters
 * stay unbadged) and all member PII (names, emails) is dropped. Safe to expose to
 * unauthenticated board viewers.
 */
export const toPrivilegedMemberRoles = (
  members: readonly Pick<GatekeeperMember, "userId" | "role">[],
): MemberRole[] =>
  members
    .filter((member) => member.role === "owner" || member.role === "admin")
    .map((member) => ({
      userId: member.userId,
      role: member.role as PrivilegedRole,
    }));
