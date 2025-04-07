"use client";

import { Dialog, sigil, HStack, Button } from "@omnidev/sigil";
import { z } from "zod";

import { app } from "lib/config";
import { DEBOUNCE_TIME } from "lib/constants";
import { useAuth, useForm, useInviteToOrganization } from "lib/hooks";
import { useDialogStore } from "lib/hooks/store";
import { toaster } from "lib/util";
import { DialogType } from "store";

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

  const { isOpen, setIsOpen } = useDialogStore({
    type: DialogType.InviteMember,
  });

  const { createInvitation, isPending } = useInviteToOrganization({
    organizationId,
  });

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
        createInvitation({
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
