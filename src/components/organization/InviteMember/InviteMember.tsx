"use client";

import { Dialog, sigil, HStack, Button } from "@omnidev/sigil";
import { z } from "zod";
import { useState } from "react";

import { app } from "lib/config";
import { DEBOUNCE_TIME } from "lib/constants";
import { useAuth, useForm } from "lib/hooks";
import { useDialogStore } from "lib/hooks/store";
import { toaster } from "lib/util";
import { DialogType } from "store";

import type { OrganizationInvitation } from "components/organization";
import { useCreateInvitationMutation } from "generated/graphql";

const inviteMemberDetails = app.organizationMembersPage.cta.inviteMember;

interface Props {
  /** Organization name. */
  organizationName: string;
  /** Organization ID. */
  organizationId: string;
}

/** Schema for defining the shape of the invite member form fields. */
const baseSchema = z.object({
  email: z.string().email(),
});

const InviteMember = ({ organizationName, organizationId }: Props) => {
  const { user } = useAuth();
  const [isPending, setIsPending] = useState(false);

  const { isOpen, setIsOpen } = useDialogStore({
    type: DialogType.InviteMember,
  });

  const { mutateAsync: addInvitation } = useCreateInvitationMutation();

  const handleOrganizationInvitation = async ({
    inviterEmail,
    inviterUsername,
    recipientEmail,
    organizationName,
  }: OrganizationInvitation) => {
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

      const result = await response.json();

      await addInvitation({
        input: {
          invitation: {
            email: recipientEmail,
            organizationId,
            resendId: result.data.id,
          },
        },
      });
    } catch (error) {
      console.error("Error resending email:", error);
    } finally {
      setIsPending(false);
    }
  };

  const { handleSubmit, AppField, AppForm, SubmitForm, reset } = useForm({
    defaultValues: {
      email: "",
    },
    asyncDebounceMs: DEBOUNCE_TIME,
    validators: {
      onChange: baseSchema,
    },
    onSubmit: async ({ value }) => {
      toaster.promise(
        handleOrganizationInvitation({
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
          error: {
            title: inviteMemberDetails.toast.error.title,
            description: inviteMemberDetails.toast.error.description,
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
        gap={8}
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

        <HStack w="full">
          <AppForm>
            <SubmitForm
              action={inviteMemberDetails.form}
              isPending={isPending}
              flex={1}
            />
          </AppForm>

          <Button
            variant="outline"
            flex={1}
            onClick={() => {
              reset();
              setIsOpen(false);
            }}
          >
            {inviteMemberDetails.form.cancel}
          </Button>
        </HStack>
      </sigil.form>
    </Dialog>
  );
};

export default InviteMember;
