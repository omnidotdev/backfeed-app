"use client";

import { Dialog, sigil } from "@omnidev/sigil";
import { z } from "zod";

import { app } from "lib/config";
import { DEBOUNCE_TIME } from "lib/constants";
import { getSdk } from "lib/graphql";
import { useAuth, useForm } from "lib/hooks";
import { useDialogStore } from "lib/hooks/store";
import { getAuthSession, toaster } from "lib/util";
import { DialogType } from "store";
import { useState } from "react";
import { useCreateInvitationMutation } from "generated/graphql";

const inviteMemberDetails = app.organizationMembersPage.cta.inviteMember;

interface Props {
  /** Organization name. */
  organizationName: string;
  /** Organization ID. */
  organizationId: string;
}

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

/** Schema for defining the shape of the invite member form fields. */
const baseSchema = z.object({
  email: z.string().email(),
  organizationId: z.string(),
});

const createInvitationSchema = baseSchema.superRefine(
  async ({ email, organizationId }, ctx) => {
    const session = await getAuthSession();

    if (!email.length || !session) return z.NEVER;

    const sdk = getSdk({ session });

    // Prevent self-invitation
    if (email === session.user.email) {
      ctx.addIssue({
        code: "custom",
        message: inviteMemberDetails.toast.errors.currentOwner,
        path: ["email"],
      });
    }

    // Check if an invitation has already been sent
    const { invitations } = await sdk.Invitations({
      email,
      organizationId,
    });

    if (invitations?.nodes.length) {
      ctx.addIssue({
        code: "custom",
        message: inviteMemberDetails.toast.errors.duplicateInvite,
        path: ["email"],
      });
    }

    // Check if recipient is already a registered user
    const { userByEmail } = await sdk.userByEmail({
      email,
    });

    const userId = userByEmail?.rowId;

    // If user exists, check organization membership
    if (userId) {
      const { memberByUserIdAndOrganizationId } = await sdk.OrganizationRole({
        userId,
        organizationId,
      });

      if (memberByUserIdAndOrganizationId) {
        ctx.addIssue({
          code: "custom",
          message: inviteMemberDetails.toast.errors.currentMember,
          path: ["email"],
        });
      }
    }
  }
);

const InviteMember = ({ organizationName, organizationId }: Props) => {
  const { user } = useAuth();
  const [isPending, setIsPending] = useState(false);

  const { isOpen, setIsOpen } = useDialogStore({
    type: DialogType.InviteMember,
  });

  const { mutateAsync: inviteToOrganization } = useCreateInvitationMutation();

  const handleCreateInvitation = async ({
    inviterEmail,
    inviterUsername,
    recipientEmail,
    organizationName,
  }: CreateInvitation) => {
    setIsPending(true);

    try {
      const response = await fetch("/api/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inviterEmail,
          inviterUsername,
          recipientEmail,
          organizationName,
        }),
      });

      if (!response.ok) {
        throw new Error(inviteMemberDetails.toast.errors.default);
      }

      await inviteToOrganization({
        input: {
          invitation: {
            email: recipientEmail,
            organizationId,
          },
        },
      });

      reset();
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  const { handleSubmit, AppField, AppForm, SubmitForm, reset } = useForm({
    defaultValues: {
      email: "",
      organizationId,
    },
    asyncDebounceMs: DEBOUNCE_TIME,
    validators: {
      onChange: baseSchema,
      onSubmitAsync: createInvitationSchema,
    },
    onSubmit: async ({ value }) => {
      toaster.promise(
        handleCreateInvitation({
          inviterEmail: user?.email!,
          inviterUsername: user?.name!,
          recipientEmail: value.email,
          organizationName,
        }),
        {
          loading: {
            title: inviteMemberDetails.toast.loading.title,
          },
          success: {
            title: inviteMemberDetails.toast.success.title,
            description: inviteMemberDetails.toast.success.description,
          },
          error: (error) => {
            return {
              title: inviteMemberDetails.toast.errors.title,
              description:
                error instanceof Error && error.message
                  ? error.message
                  : inviteMemberDetails.toast.errors.default,
            };
          },
        }
      );
    },
  });

  return (
    <Dialog
      title={inviteMemberDetails.title}
      description={inviteMemberDetails.description}
      open={isOpen}
      onOpenChange={({ open }) => {
        reset();
        setIsOpen(open);
      }}
    >
      <sigil.form
        display="flex"
        flexDirection="column"
        gap={4}
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await handleSubmit();
        }}
      >
        <AppField name="email">
          {({ InputField }) => (
            <InputField
              label={inviteMemberDetails.form.email.label}
              placeholder={inviteMemberDetails.form.email.placeholder}
            />
          )}
        </AppField>

        <AppForm>
          <SubmitForm
            action={inviteMemberDetails.form}
            isPending={isPending}
            flex={1}
          />
        </AppForm>
      </sigil.form>
    </Dialog>
  );
};

export default InviteMember;
