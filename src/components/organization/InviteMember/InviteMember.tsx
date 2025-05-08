"use client";

import { Dialog, Stack, TagsInput, sigil } from "@omnidev/sigil";
import { z } from "zod";

import { FormFieldError } from "components/form";
import {
  useCreateInvitationMutation,
  useInvitationsQuery,
} from "generated/graphql";
import { token } from "generated/panda/tokens";
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

type Invite = z.infer<typeof baseSchema>;

const invitesSchema = z.object({
  invites: z.array(baseSchema).min(1),
});

/** Schema for validation of the invite member form. */
const createInvitationsSchema = invitesSchema.superRefine(
  async ({ invites }, ctx) => {
    const session = await getAuthSession();

    if (!invites.length || !session) return z.NEVER;

    const sdk = getSdk({ session });

    const validateInvite = async ({ email, organizationId }: Invite) => {
      // Prevent self-invitation
      if (email === session.user.email) {
        ctx.addIssue({
          code: "custom",
          message: inviteMemberDetails.toast.errors.currentOwner,
          path: ["invites"],
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
          path: ["invites"],
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
            path: ["invites"],
          });
        }
      }
    };

    await Promise.all(invites.map((invite) => validateInvite(invite)));
  },
);

const InviteMember = ({ organizationName, organizationId }: Props) => {
  const { user } = useAuth();
  const isSmallViewport = useViewportSize({
    minWidth: token("breakpoints.sm"),
  });

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

  const { handleSubmit, Field, AppForm, SubmitForm, reset } = useForm({
    defaultValues: {
      invites: [
        {
          email: "",
          organizationId,
          inviterEmail: user?.email ?? "",
          inviterUsername: user?.name ?? "",
        },
      ],
    },
    asyncDebounceMs: DEBOUNCE_TIME,
    validators: {
      onChange: invitesSchema,
      onSubmitAsync: createInvitationsSchema,
    },
    onSubmit: async ({ value }) => {
      toaster.promise(
        async () => {
          const sendInvite = async (invite: Invite) => {
            const [sendEmailResponse] = await Promise.all([
              fetch("/api/invite", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  inviterEmail: invite.inviterEmail,
                  inviterUsername: invite.inviterUsername,
                  recipientEmail: invite.email,
                  organizationName,
                }),
              }),
              inviteToOrganization({
                input: {
                  invitation: {
                    email: invite.email,
                    organizationId,
                  },
                },
              }),
            ]);

            if (!sendEmailResponse.ok) {
              throw new Error(inviteMemberDetails.toast.errors.default);
            }
          };

          try {
            // TODO: run these through a tanstack pacer queue. Resend default rate limit is 2 requests per second.
            await Promise.all(
              value.invites.map((invite) => sendInvite(invite)),
            );

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
          minWidth: isSmallViewport ? undefined : "80%",
          maxWidth: token("sizes.md"),
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
        <Field name="invites">
          {({ state, handleChange }) => (
            <Stack position="relative" gap={1.5}>
              <TagsInput
                label="Emails"
                addOnPaste
                delimiter=","
                validate={(details) => {
                  const emails = details.inputValue.split(",");

                  return (
                    !emails.some((email) => details.value.includes(email)) &&
                    emails.every(
                      (email) =>
                        baseSchema.shape.email.safeParse(email).success,
                    )
                  );
                }}
                value={state.value
                  // NB: the filter is simply here to remove the default value when email is still an empty string
                  .filter((invite) => !!invite.email)
                  .map((invite) => invite.email)}
                onValueChange={({ value }) =>
                  handleChange(
                    value.map((email) => ({
                      email,
                      organizationId,
                      inviterEmail: user?.email ?? "",
                      inviterUsername: user?.name ?? "",
                    })),
                  )
                }
                borderColor="border.subtle"
                controlProps={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
                inputProps={{
                  placeholder: "hello@omni.dev",
                }}
              />

              <FormFieldError errors={state.meta.errorMap.onSubmit} />
            </Stack>
          )}
        </Field>

        <AppForm>
          <SubmitForm action={inviteMemberDetails.form} flex={{ sm: 1 }} />
        </AppForm>
      </sigil.form>
    </Dialog>
  );
};

export default InviteMember;
