import type { GatekeeperInvitation } from "@omnidotdev/providers/auth";

type ValidationResult = { valid: true } | { valid: false; reason: string };

type InviteTimeInfo = {
  sentAgo: string;
  expiresLabel: string;
  isExpired: boolean;
};

interface ValidateInvitationParams {
  email: string;
  pendingInvitations: GatekeeperInvitation[];
  memberEmails: string[];
}

/**
 * Check whether an invitation has expired based on its `expiresAt` timestamp
 */
const isInvitationExpired = (invitation: GatekeeperInvitation): boolean =>
  new Date(invitation.expiresAt) < new Date();

/**
 * Validate that an invitation email doesn't conflict with existing
 * active (non-expired) pending invitations or current org members
 */
const validateInvitation = ({
  email,
  pendingInvitations,
  memberEmails,
}: ValidateInvitationParams): ValidationResult => {
  const normalizedEmail = email.toLowerCase();

  const hasActivePendingInvite = pendingInvitations.some(
    (inv) =>
      inv.status === "pending" &&
      !isInvitationExpired(inv) &&
      inv.email.toLowerCase() === normalizedEmail,
  );

  if (hasActivePendingInvite) {
    return {
      valid: false,
      reason: "An invitation is already pending for this email",
    };
  }

  const isExistingMember = memberEmails.some(
    (memberEmail) => memberEmail.toLowerCase() === normalizedEmail,
  );

  if (isExistingMember) {
    return {
      valid: false,
      reason: "This email is already a member of the organization",
    };
  }

  return { valid: true };
};

/**
 * Format a millisecond duration as a human-readable relative time string
 */
const formatRelativeTime = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;
  if (minutes > 0) return `${minutes}m`;
  return "just now";
};

/**
 * Derive human-readable time info for an invitation
 * @param invitation - Gatekeeper invitation with `createdAt` and `expiresAt`
 */
const getInviteTimeInfo = (
  invitation: GatekeeperInvitation,
): InviteTimeInfo => {
  const now = Date.now();
  const created = new Date(invitation.createdAt).getTime();
  const expires = new Date(invitation.expiresAt).getTime();
  const expired = expires < now;

  return {
    sentAgo: formatRelativeTime(now - created),
    expiresLabel: expired
      ? `Expired ${formatRelativeTime(now - expires)} ago`
      : `Expires in ${formatRelativeTime(expires - now)}`,
    isExpired: expired,
  };
};

export {
  formatRelativeTime,
  getInviteTimeInfo,
  isInvitationExpired,
  validateInvitation,
};

export type { InviteTimeInfo, ValidateInvitationParams, ValidationResult };
