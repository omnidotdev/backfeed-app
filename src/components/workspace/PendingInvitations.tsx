import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { LuRefreshCw, LuX } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import {
  useCancelInvitation,
  useResendInvitation,
} from "@/lib/hooks/useOrganizationMembers";
import organizationInvitationsOptions from "@/lib/options/organizationInvitations.options";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";
import toaster from "@/lib/util/toaster";
import { getInviteTimeInfo } from "@/lib/validation/invitation";

import type { GatekeeperInvitation } from "@omnidotdev/providers/auth";

const membersRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout/_manage/members",
);

interface InvitationRowProps {
  invitation: GatekeeperInvitation;
  organizationId: string;
}

/**
 * Single invitation row with actions
 */
const InvitationRow = ({ invitation, organizationId }: InvitationRowProps) => {
  const timeInfo = getInviteTimeInfo(invitation);

  const { mutateAsync: resendInvitation, isPending: isResending } =
    useResendInvitation();
  const { mutateAsync: cancelInvitation, isPending: isCancelling } =
    useCancelInvitation();

  const handleResend = () =>
    toaster.promise(
      () =>
        resendInvitation({
          organizationId,
          email: invitation.email,
          role: invitation.role as "admin" | "member",
        }),
      {
        loading: { title: "Resending invitation..." },
        success: { title: `Invitation resent to ${invitation.email}` },
        error: (error) => ({
          title: (error as Error).message || "Failed to resend invitation",
        }),
      },
    );

  const handleRevoke = () =>
    toaster.promise(
      () =>
        cancelInvitation({
          invitationId: invitation.id,
          organizationId,
        }),
      {
        loading: { title: "Revoking invitation..." },
        success: { title: "Invitation revoked" },
        error: (error) => ({
          title: (error as Error).message || "Failed to revoke invitation",
        }),
      },
    );

  const accentVar =
    invitation.role === "admin"
      ? "var(--colors-brand-secondary)"
      : "var(--colors-brand-tertiary)";

  const timeColor = timeInfo.isExpired
    ? "text-red-500"
    : "text-foreground-subtle";

  return (
    <div className="flex items-center justify-between border-border-subtle border-b px-4 py-3 last:border-b-0">
      <div className="flex flex-col gap-1">
        <p className="font-medium text-sm">{invitation.email}</p>

        <div className="flex items-center gap-2">
          <span
            className="inline-flex w-[4.5rem] items-center justify-center rounded-md border px-2 py-0.5 font-semibold text-xs"
            style={{ color: accentVar, borderColor: accentVar }}
          >
            {capitalizeFirstLetter(invitation.role)}
          </span>

          <span className={`text-xs ${timeColor}`}>
            Sent {timeInfo.sentAgo} ago
          </span>

          <span className={`text-xs ${timeColor}`}>
            {timeInfo.expiresLabel}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleResend}
          disabled={isResending}
          aria-label={`Resend invitation to ${invitation.email}`}
        >
          <LuRefreshCw className="size-4" />
          Resend
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleRevoke}
          disabled={isCancelling}
          aria-label={`Revoke invitation for ${invitation.email}`}
        >
          <LuX className="size-4" />
          Revoke
        </Button>
      </div>
    </div>
  );
};

/**
 * Pending invitations list for the workspace members page
 */
const PendingInvitations = () => {
  const { organizationId, isOwner } = membersRoute.useRouteContext();

  const { data: invitationsData } = useQuery({
    ...organizationInvitationsOptions({ organizationId: organizationId! }),
    enabled: !!organizationId,
  });

  const activeInvitations = invitationsData?.active ?? [];
  const expiredInvitations = invitationsData?.expired ?? [];
  const allInvitations = [...activeInvitations, ...expiredInvitations];

  if (!isOwner || allInvitations.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <p className="px-4 font-bold text-lg">Pending Invitations</p>

      <div className="flex flex-col overflow-hidden rounded-md border border-border-subtle">
        {allInvitations.map((invitation) => (
          <InvitationRow
            key={invitation.id}
            invitation={invitation}
            organizationId={organizationId!}
          />
        ))}
      </div>
    </div>
  );
};

export default PendingInvitations;
