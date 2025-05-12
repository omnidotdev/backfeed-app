"use client";

import { Dialog, Stack, TagsInput, sigil } from "@omnidev/sigil";
import { useAsyncQueuer } from "@tanstack/react-pacer/async-queuer";
import { useRateLimiter } from "@tanstack/react-pacer/rate-limiter";
import ms from "ms";
import { useRef, useState } from "react";
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
import { useForm, useViewportSize } from "lib/hooks";
import { useDialogStore } from "lib/hooks/store";
import { getQueryClient } from "lib/util";
import { getAuthSession, toaster } from "lib/util";
import { DialogType } from "store";

import type { Organization } from "generated/graphql";
import type { Session } from "next-auth";

const MAX_NUMBER_OF_INVITES = 10;

const inviteMemberDetails = app.organizationInvitationsPage.cta.inviteMember;

/** Schema for defining the shape of the invite member form fields. */
const baseSchema = z.object({
  email: z.string().trim().email(),
  organizationId: uuidSchema,
  inviterEmail: z.string().trim().email(),
  inviterUsername: z.string().trim(),
});

/** Inferred type of a singular invite. */
type Invite = z.infer<typeof baseSchema>;

/** Schema for defining the shape of the invites array. */
const invitesSchema = z.object({
  invites: z.array(baseSchema).min(1).max(MAX_NUMBER_OF_INVITES),
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

interface Props {
  /* Authenticated user. */
  user: Session["user"];
  /** Organization name. */
  organizationName: Organization["name"];
  /** Organization ID. */
  organizationId: Organization["rowId"];
}

const InviteMember = ({ user, organizationName, organizationId }: Props) => {
  const toastId = useRef<string>(undefined);

  const [isSendingInvite, setIsSendingInvite] = useState(false);
  const [numberOfToasts, setNumberOfToasts] = useState(0);
  const isSmallViewport = useViewportSize({
    minWidth: token("breakpoints.sm"),
  });

  const { isOpen, setIsOpen } = useDialogStore({
    type: DialogType.InviteMember,
  });

  // NB: Resend's default rate limit is 2 requests per second. So we run 2 invites concurrently, and wait a second in between
  const queuer = useAsyncQueuer({
    concurrency: 2,
    started: false,
    wait: ms("1s"),
    maxSize: MAX_NUMBER_OF_INVITES,
  });

  const rateLimiter = useRateLimiter(setNumberOfToasts, {
    limit: 2,
    window: ms("1s"),
  });

  const queryClient = getQueryClient();

  const { mutateAsync: inviteToOrganization } = useCreateInvitationMutation({
    onMutate: () => {
      if (!queuer.getPendingItems().length) {
        setIsSendingInvite(false);
      }
    },
    onSettled: () => {
      if (!isSendingInvite) {
        return queryClient.invalidateQueries({
          queryKey: useInvitationsQuery.getKey({
            organizationId,
          }),
        });
      }
    },
    onSuccess: () => {
      // Wait until the queue is done processing all requests
      if (!queuer.getPendingItems().length) {
        reset();
        setIsOpen(false);

        if (toastId.current) {
          toaster.update(toastId.current, {
            title: inviteMemberDetails.toast.success.title,
            description: inviteMemberDetails.toast.success.description,
            type: "success",
          });
        }
      }
    },
  });

  const sendInvite = async (invite: Invite) => {
    try {
      const responses = await Promise.allSettled([
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

      if (!responses.every((res) => res.status === "fulfilled")) {
        setIsSendingInvite(false);

        if (toastId.current) {
          toaster.update(toastId.current, {
            title: inviteMemberDetails.toast.errors.title,
            description: `${inviteMemberDetails.toast.errors.default} to ${invite.email}`,
            type: "error",
          });
        }
      }
    } catch (error) {
      setIsSendingInvite(false);

      if (isDevEnv) {
        console.error(error);
      }
    }
  };

  const { handleSubmit, Field, AppForm, SubmitForm, reset } = useForm({
    defaultValues: {
      invites: [
        {
          email: "",
          organizationId,
          inviterEmail: user.email ?? "",
          inviterUsername: user.name ?? "",
        },
      ],
    },
    asyncDebounceMs: DEBOUNCE_TIME,
    validators: {
      onChange: invitesSchema,
      onSubmitAsync: createInvitationsSchema,
    },
    onSubmit: async ({ value }) => {
      setIsSendingInvite(true);

      toastId.current = toaster.create({
        title: inviteMemberDetails.toast.loading.title,
        type: "loading",
      });

      try {
        value.invites.map((invite) =>
          queuer.addItem(async () => await sendInvite(invite)),
        );

        await queuer.start();
      } catch (error) {
        if (toastId.current) {
          toaster.update(toastId.current, {
            title: inviteMemberDetails.toast.errors.title,
            description:
              error instanceof Error && error.message
                ? error.message
                : inviteMemberDetails.toast.errors.default,
            type: "error",
          });
        }
      }
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
      contentProps={{
        style: {
          // TODO: adjust minW upstream in Sigil for mobile viewports
          minWidth: isSmallViewport ? undefined : "80%",
          maxWidth: token("sizes.md"),
        },
      }}
    >
      <sigil.form
        display="flex"
        flexDirection="column"
        gap={8}
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
                label={
                  app.organizationInvitationsPage.cta.inviteMember.form.email
                    .label
                }
                addOnPaste
                delimiter=","
                max={MAX_NUMBER_OF_INVITES}
                validate={(details) => {
                  const emails = details.inputValue.split(",");

                  // fail if more than max number of invites
                  if (emails.length > MAX_NUMBER_OF_INVITES) {
                    rateLimiter.maybeExecute(numberOfToasts + 1);

                    if (rateLimiter.getRemainingInWindow()) {
                      toaster.error({
                        title: `${app.organizationInvitationsPage.cta.inviteMember.toast.errors.maxEmails1} ${MAX_NUMBER_OF_INVITES} ${app.organizationInvitationsPage.cta.inviteMember.toast.errors.maxEmails2}`,
                      });
                    }

                    return false;
                  }

                  // fail if email that is currently being pasted or added is a duplicate
                  if (emails.some((email) => details.value.includes(email))) {
                    rateLimiter.maybeExecute(numberOfToasts + 1);

                    if (rateLimiter.getRemainingInWindow()) {
                      toaster.error({
                        title:
                          app.organizationInvitationsPage.cta.inviteMember.toast
                            .errors.alreadyInList,
                      });
                    }

                    return false;
                  }

                  return emails.every(
                    (email) => baseSchema.shape.email.safeParse(email).success,
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
                      inviterEmail: user.email ?? "",
                      inviterUsername: user.name ?? "",
                    })),
                  )
                }
                borderColor="border.subtle"
                inputProps={{
                  placeholder:
                    app.organizationInvitationsPage.cta.inviteMember.form.email
                      .placeholder,
                  w: "full",
                  disabled: state.value.length >= MAX_NUMBER_OF_INVITES,
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
