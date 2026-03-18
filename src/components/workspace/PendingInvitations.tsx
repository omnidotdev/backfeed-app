import { Badge, Button, Flex, HStack, Icon, Stack, Text } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { LuRefreshCw, LuX } from "react-icons/lu";

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

  const accentColor =
    invitation.role === "admin" ? "brand.secondary" : "brand.tertiary";

  return (
    <Flex
      justify="space-between"
      align="center"
      py={3}
      px={4}
      borderBottomWidth="1px"
      borderColor="border.subtle"
      _last={{ borderBottomWidth: 0 }}
    >
      <Stack gap={1}>
        <Text fontSize="sm" fontWeight="medium">
          {invitation.email}
        </Text>

        <HStack gap={2}>
          <Badge
            variant="outline"
            w={18}
            justifyContent="center"
            color={accentColor}
            borderColor={accentColor}
            fontWeight="semibold"
          >
            {capitalizeFirstLetter(invitation.role)}
          </Badge>

          <Text
            fontSize="xs"
            color={timeInfo.isExpired ? "red.500" : "foreground.subtle"}
          >
            Sent {timeInfo.sentAgo} ago
          </Text>

          <Text
            fontSize="xs"
            color={timeInfo.isExpired ? "red.500" : "foreground.subtle"}
          >
            {timeInfo.expiresLabel}
          </Text>
        </HStack>
      </Stack>

      <HStack gap={1}>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleResend}
          disabled={isResending}
          aria-label={`Resend invitation to ${invitation.email}`}
        >
          <Icon src={LuRefreshCw} w={4} h={4} />
          Resend
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleRevoke}
          disabled={isCancelling}
          aria-label={`Revoke invitation for ${invitation.email}`}
        >
          <Icon src={LuX} w={4} h={4} />
          Revoke
        </Button>
      </HStack>
    </Flex>
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
    <Stack gap={2}>
      <Text fontSize="lg" fontWeight="bold" px={4}>
        Pending Invitations
      </Text>

      <Stack
        borderWidth="1px"
        borderColor="border.subtle"
        borderRadius="md"
        overflow="hidden"
      >
        {allInvitations.map((invitation) => (
          <InvitationRow
            key={invitation.id}
            invitation={invitation}
            organizationId={organizationId!}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default PendingInvitations;
