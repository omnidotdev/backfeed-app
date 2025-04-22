"use client";

import { Dialog, sigil } from "@omnidev/sigil";
import { z } from "zod";

import {
  useCreateInvitationMutation,
  useInvitationsQuery,
} from "generated/graphql";
import { app, isDevEnv } from "lib/config";
import { DEBOUNCE_TIME, uuidSchema } from "lib/constants";
import { getSdk } from "lib/graphql";
import { useAuth, useForm, useViewportSize } from "lib/hooks";
import { useDialogStore } from "lib/hooks/store";
import { getQueryClient } from "lib/util";
import { getAuthSession, toaster } from "lib/util";
import { DialogType } from "store";

import type { Organization } from "generated/graphql";

const inviteMemberDetails = app.organizationInvitationsPage.cta.inviteMember;

interface Props {
  /** Organization name. */
  organizationName: Organization["name"];
  /** Organization ID. */
  organizationId: Organization["rowId"];
}

/** Schema for defining the shape of the invite member form fields. */
const baseSchema = z.object({
  email: z.string().email().trim(),
  organizationId: uuidSchema,
  inviterEmail: z.string().email().trim(),
  inviterUsername: z.string().trim(),
});

/** Schema for validation of the invite member form. */
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
  },
);

const InviteMember = ({ organizationName, organizationId }: Props) => {
  const { user } = useAuth();
  const isSmallViewport = useViewportSize({ minWidth: "40em" });

  const { isOpen, setIsOpen } = useDialogStore({
    type: DialogType.InviteMember,
  });

  const queryClient = getQueryClient();

  const onSettled = () =>
    queryClient.invalidateQueries({
      queryKey: useInvitationsQuery.getKey({
        organizationId,
      }),
    });

  const { mutateAsync: inviteToOrganization } = useCreateInvitationMutation({
    onSettled,
    onSuccess: () => {
      reset();
      setIsOpen(false);
    },
  });

  const { handleSubmit, AppField, AppForm, SubmitForm, reset } = useForm({
    defaultValues: {
      email: "",
      organizationId,
      inviterEmail: user?.email ?? "",
      inviterUsername: user?.name ?? "",
    },
    asyncDebounceMs: DEBOUNCE_TIME,
    validators: {
      onChange: baseSchema,
      onSubmitAsync: createInvitationSchema,
    },
    onSubmit: async ({ value }) => {
      toaster.promise(
        async () => {
          try {
            const [sendEmailResponse] = await Promise.all([
              fetch("/api/invite", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  inviterEmail: value.inviterEmail,
                  inviterUsername: value.inviterUsername,
                  recipientEmail: value.email,
                  organizationName,
                }),
              }),
              inviteToOrganization({
                input: {
                  invitation: {
                    email: value.email,
                    organizationId,
                  },
                },
              }),
            ]);

            if (!sendEmailResponse.ok) {
              throw new Error(inviteMemberDetails.toast.errors.default);
            }

            reset();
          } catch (error) {
            if (isDevEnv) {
              console.error("Error sending email:", error);
            }
            throw error;
          }
        },
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
        },
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
      // TODO: adjust minW upstream in Sigil for mobile viewports
      contentProps={{
        style: {
          minWidth: isSmallViewport ? undefined : 0,
        },
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
          <SubmitForm action={inviteMemberDetails.form} flex={{ sm: 1 }} />
        </AppForm>
      </sigil.form>
    </Dialog>
  );
};

export default InviteMember;
