import type { GatekeeperInvitation } from "@omnidotdev/providers/auth";

type InviteTimeInfo = {
  sentAgo: string;
  expiresLabel: string;
  isExpired: boolean;
};

/**
 * Check whether an invitation has expired based on its `expiresAt` timestamp
 */
const isInvitationExpired = (invitation: GatekeeperInvitation): boolean =>
  new Date(invitation.expiresAt) < new Date();

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

export { formatRelativeTime, getInviteTimeInfo, isInvitationExpired };

export type { InviteTimeInfo };
