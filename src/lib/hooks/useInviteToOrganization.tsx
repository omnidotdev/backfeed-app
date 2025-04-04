"use client";

import { useState } from "react";

import {
  useCreateInvitationMutation,
  useInvitationsQuery,
  useOrganizationRoleQuery,
  useUserByEmailQuery,
} from "generated/graphql";

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
      if (inviterEmail === recipientEmail) {
        return Promise.reject(
          new Error("You are already a member of this organization.")
        );
      }

      // Check if an invitation has already been sent
      const invitationDetailsResponse = await useInvitationsQuery.fetcher({
        email: recipientEmail,
        organizationId,
      })();

      const existingInvitations =
        invitationDetailsResponse?.invitations?.nodes.length;

      if (existingInvitations && existingInvitations > 0) {
        return Promise.reject(
          new Error("An invitation has already been sent to this email.")
        );
      }

      // Check if recipient is already a user
      const userDetailsResponse = await useUserByEmailQuery.fetcher({
        email: recipientEmail,
      })();

      const userId = userDetailsResponse?.userByEmail?.hidraId;

      // If user exists, check their organization membership
      if (userId) {
        const organizationRoleDetailsResponse =
          await useOrganizationRoleQuery.fetcher({
            userId,
            organizationId,
          })();

        if (
          organizationRoleDetailsResponse?.memberByUserIdAndOrganizationId !=
          null
        ) {
          return Promise.reject(
            new Error("This user is already a member of this organization.")
          );
        }
      }

      // // Send the invitation email
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
