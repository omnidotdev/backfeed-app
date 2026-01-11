import { Dialog, Stack, TagsInput, Text, sigil } from "@omnidev/sigil";
import { useAsyncQueuer } from "@tanstack/react-pacer/async-queuer";
import { useRateLimiter } from "@tanstack/react-pacer/rate-limiter";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouteContext } from "@tanstack/react-router";
import ms from "ms";
import { useRef, useState } from "react";
import { z } from "zod";

import { useCreateInvitationMutation } from "@/generated/graphql";
import { token } from "@/generated/panda/tokens";
import app from "@/lib/config/app.config";
import { isDevEnv } from "@/lib/config/env.config";
import DEBOUNCE_TIME from "@/lib/constants/debounceTime.constant";
import { uuidSchema } from "@/lib/constants/schema.constant";
import getSdk from "@/lib/graphql/getSdk";
import useForm from "@/lib/hooks/useForm";
import useViewportSize from "@/lib/hooks/useViewportSize";
import { invitationsOptions } from "@/lib/options/invitations";
import { workspaceOptions } from "@/lib/options/workspaces";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";
import toaster from "@/lib/util/toaster";
import { fetchSession } from "@/server/functions/auth";

const MAX_NUMBER_OF_INVITES = 10;

const inviteMemberDetails = app.workspaceInvitationsPage.cta.inviteMember;

/** Schema for defining the shape of the invite member form fields. */
const baseSchema = z.object({
  email: z.email().trim(),
  workspaceId: uuidSchema,
  inviterEmail: z.email().trim(),
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
    const { session } = await fetchSession();

    if (!invites.length || !session) return z.NEVER;

    const sdk = await getSdk();

    const validateInvite = async ({ email, workspaceId }: Invite) => {
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
        workspaceId,
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

      // If user exists, check workspace membership
      if (userId) {
        const { memberByUserIdAndWorkspaceId } = await sdk.WorkspaceRole({
          userId,
          workspaceId,
        });

        if (memberByUserIdAndWorkspaceId) {
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

const InviteMember = () => {
  const { session, workspaceId, queryClient } = useRouteContext({
    from: "/_public/workspaces/$workspaceSlug/_layout/_manage/invitations",
  });
  const { workspaceSlug } = useParams({
    from: "/_public/workspaces/$workspaceSlug/_layout/_manage/invitations",
  });

  const { data: workspace } = useQuery({
    ...workspaceOptions({ name: workspaceSlug }),
    select: (data) => data?.workspaceByName,
  });

  const toastId = useRef<string>(undefined);

  const [isSendingInvite, setIsSendingInvite] = useState(false);
  const [numberOfToasts, setNumberOfToasts] = useState(0);
  const isSmallViewport = useViewportSize({
    minWidth: token("breakpoints.sm"),
  });

  const { isOpen, setIsOpen } = useDialogStore({
    type: DialogType.InviteMember,
  });

  const rateLimiter = useRateLimiter(setNumberOfToasts, {
    limit: 2,
    window: ms("1s"),
  });

  const { mutateAsync: inviteToWorkspace } = useCreateInvitationMutation({
    onMutate: () => {
      if (!queuer.peekPendingItems().length) {
        setIsSendingInvite(false);
      }
    },
    onSettled: () => {
      if (!isSendingInvite) {
        return queryClient.invalidateQueries({
          queryKey: invitationsOptions({ workspaceId }).queryKey,
        });
      }
    },
    onSuccess: () => {
      // Wait until the queue is done processing all requests
      if (!queuer.peekPendingItems().length) {
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
            workspaceName: workspace?.name!,
          }),
        }),
        inviteToWorkspace({
          input: {
            invitation: {
              email: invite.email,
              workspaceId,
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

  // NB: Resend's default rate limit is 2 requests per second. So we run 2 invites concurrently, and wait a second in between
  const queuer = useAsyncQueuer(sendInvite, {
    concurrency: 2,
    started: false,
    wait: ms("1s"),
    maxSize: MAX_NUMBER_OF_INVITES,
  });

  const { handleSubmit, Field, AppForm, SubmitForm, reset } = useForm({
    defaultValues: {
      invites: [
        {
          email: "",
          workspaceId,
          inviterEmail: session?.user.email ?? "",
          inviterUsername: session?.user.name ?? "",
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
        value.invites.map((invite) => queuer.addItem(invite));

        queuer.start();
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
                  app.workspaceInvitationsPage.cta.inviteMember.form.email.label
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
                        title: `${app.workspaceInvitationsPage.cta.inviteMember.toast.errors.maxEmails1} ${MAX_NUMBER_OF_INVITES} ${app.workspaceInvitationsPage.cta.inviteMember.toast.errors.maxEmails2}`,
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
                          app.workspaceInvitationsPage.cta.inviteMember.toast
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
                      workspaceId,
                      inviterEmail: session?.user.email ?? "",
                      inviterUsername: session?.user.name ?? "",
                    })),
                  )
                }
                borderColor="border.subtle"
                inputProps={{
                  placeholder:
                    app.workspaceInvitationsPage.cta.inviteMember.form.email
                      .placeholder,
                  w: "full",
                  disabled: state.value.length >= MAX_NUMBER_OF_INVITES,
                }}
              />

              {!!state.meta.errorMap.onSubmit?.length && (
                <Text
                  position="absolute"
                  top={0}
                  right={0}
                  h={5}
                  fontSize="sm"
                  color="red"
                >
                  {state.meta.errorMap.onSubmit[0].message}
                </Text>
              )}
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
