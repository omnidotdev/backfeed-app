import { createListCollection } from "@ark-ui/react";
import { Dialog, Select, Stack, Text, sigil } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { z } from "zod";

import useForm from "@/lib/hooks/useForm";
import { useInviteMember } from "@/lib/hooks/useOrganizationMembers";
import organizationInvitationsOptions from "@/lib/options/organizationInvitations.options";
import { organizationMembersOptions } from "@/lib/options/organizationMembers";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";
import toaster from "@/lib/util/toaster";
import { validateInvitation } from "@/lib/validation/invitation";

const membersRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout/_manage/members",
);

const inviteSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["admin", "member"]),
});

const roleCollection = createListCollection({
  items: [
    { label: "Member", value: "member" },
    { label: "Admin", value: "admin" },
  ],
});

/**
 * Dialog for inviting a new member to the workspace
 */
const InviteMemberDialog = () => {
  const { organizationId, session } = membersRoute.useRouteContext();

  const { isOpen, setIsOpen } = useDialogStore({
    type: DialogType.InviteMember,
  });

  const { data: membersData } = useQuery({
    ...organizationMembersOptions({
      organizationId: organizationId!,
      accessToken: session?.accessToken!,
    }),
  });

  const memberEmails = membersData?.data?.map((m) => m.user.email) ?? [];

  const { data: invitationsData } = useQuery({
    ...organizationInvitationsOptions({ organizationId: organizationId! }),
    enabled: !!organizationId,
  });

  const pendingInvitations = invitationsData?.active ?? [];

  const { mutateAsync: inviteMember, isPending } = useInviteMember();

  const form = useForm({
    defaultValues: {
      email: "",
      role: "member" as "admin" | "member",
    },
    validators: {
      onSubmitAsync: inviteSchema,
    },
    onSubmit: async ({ value }) =>
      toaster.promise(
        async () => {
          const result = validateInvitation({
            email: value.email,
            pendingInvitations,
            memberEmails,
          });

          if (!result.valid) {
            throw new Error(result.reason);
          }

          await inviteMember({
            organizationId: organizationId!,
            email: value.email,
            role: value.role,
          });

          form.reset();
          setIsOpen(false);
        },
        {
          loading: {
            title: "Sending invitation...",
          },
          success: {
            title: "Invitation sent successfully",
          },
          error: (error) => ({
            title: (error as Error).message || "Failed to send invitation",
          }),
        },
      ),
  });

  return (
    <Dialog
      title="Invite Member"
      description="Send an invitation to join this workspace"
      open={isOpen}
      onOpenChange={({ open }) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <sigil.form
        onSubmit={async (evt) => {
          evt.preventDefault();
          evt.stopPropagation();
          await form.handleSubmit();
        }}
      >
        <Stack gap={4}>
          <form.AppField name="email">
            {({ InputField }) => (
              <InputField
                label="Email Address"
                placeholder="user@example.com"
                type="email"
              />
            )}
          </form.AppField>

          <form.AppField name="role">
            {({ state, handleChange }) => (
              <Select
                label={{ id: "Role", singular: "Role", plural: "Roles" }}
                collection={roleCollection}
                value={[state.value]}
                onValueChange={({ value }) =>
                  handleChange(value[0] as "admin" | "member")
                }
                clearTrigger={null}
              />
            )}
          </form.AppField>

          <Text fontSize="sm" color="foreground.subtle">
            The invited user will receive an email with instructions to join the
            workspace
          </Text>
        </Stack>

        <form.AppForm>
          <form.SubmitForm
            action={{
              pending: "Sending Invitation...",
              submit: "Send Invitation",
            }}
            isPending={isPending}
            w="full"
          />
        </form.AppForm>
      </sigil.form>
    </Dialog>
  );
};

export default InviteMemberDialog;
