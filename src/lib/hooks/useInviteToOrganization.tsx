"use client";

import { useState } from "react";

import {
  useCreateInvitationMutation,
  useInvitationsQuery,
  useOrganizationRoleQuery,
  useUserByEmailQuery,
} from "generated/graphql";
import { app } from "lib/config";

const inviteMemberErrors =
  app.organizationMembersPage.cta.inviteMember.toast.errors;

interface CreateInvitation {
  /** Username of the person sending the invite. */
  inviterUsername: string;
  /** Email of the person sending the invite. */
  inviterEmail: string;
  /** Name of the organization the invite is for. */
  organizationName: string;
  /** Email of the person receiving the invite. */
  recipientEmail: string;
}

interface Props {
  /** Organization ID. */
  organizationId: string;
}

const useInviteToOrganization = ({ organizationId }: Props) => {
  const [isPending, setIsPending] = useState(false);

  const { mutateAsync: inviteToOrganization } = useCreateInvitationMutation();

  const createInvitation = async ({
    inviterEmail,
    inviterUsername,
    recipientEmail,
    organizationName,
  }: CreateInvitation) => {
    setIsPending(true);

    try {
      // Prevent self-invitation
      if (inviterEmail === recipientEmail) {
        return Promise.reject(new Error(inviteMemberErrors.currentOwner));
      }

      // Check if an invitation has already been sent
      const { invitations } = await useInvitationsQuery.fetcher({
        email: recipientEmail,
        organizationId,
      })();

      if (invitations?.nodes.length) {
        return Promise.reject(new Error(inviteMemberErrors.duplicateInvite));
      }

      // Check if recipient is already a registered user
      const { userByEmail } = await useUserByEmailQuery.fetcher({
        email: recipientEmail,
      })();

      const userId = userByEmail?.hidraId;

      // If user exists, check organization membership
      if (userId) {
        const { memberByUserIdAndOrganizationId } =
          await useOrganizationRoleQuery.fetcher({
            userId,
            organizationId,
          })();

        if (memberByUserIdAndOrganizationId != null) {
          return Promise.reject(new Error(inviteMemberErrors.currentMember));
        }
      }

      // Send the invitation email
      await Promise.all([
        fetch("/api/invite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            inviterEmail,
            inviterUsername,
            recipientEmail,
            organizationName,
          }),
        }),
        inviteToOrganization({
          input: {
            invitation: {
              email: recipientEmail,
              organizationId,
            },
          },
        }),
      ]);
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return { createInvitation, isPending };
};

export default useInviteToOrganization;
