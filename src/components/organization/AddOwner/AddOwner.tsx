"use client";

import { Dialog, sigil } from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import {
  Role,
  useMembersQuery,
  useUpdateMemberMutation,
} from "generated/graphql";
import { app } from "lib/config";
import { DEBOUNCE_TIME, uuidSchema } from "lib/constants";
import { useForm } from "lib/hooks";
import { useDialogStore } from "lib/hooks/store";
import { DialogType } from "store";

const addOwnerDetails = app.organizationMembersPage.cta.addOwner;

/** Schema for defining the shape of the add owner form fields. */
const baseSchema = z.object({
  rowId: uuidSchema,
});

interface Props {
  /** Organization ID. */
  organizationId: string;
}

/**
 * Dialog for adding an owner to an organization.
 */
const AddOwner = ({ organizationId }: Props) => {
  const queryClient = useQueryClient();

  const { isOpen, setIsOpen } = useDialogStore({
    type: DialogType.AddOwner,
  });

  const { mutateAsync: addOwner, isPending } = useUpdateMemberMutation({
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: useMembersQuery.getKey({
            organizationId,
            excludeRoles: [Role.Owner],
          }),
        }),
        queryClient.invalidateQueries({
          queryKey: useMembersQuery.getKey({
            organizationId,
            roles: [Role.Owner],
          }),
        }),
      ]);

      setIsOpen(false);
      reset();
    },
  });

  const { data: members } = useMembersQuery(
    {
      organizationId,
      excludeRoles: [Role.Owner],
    },
    {
      select: (data) =>
        data.members?.nodes?.map((member) => ({
          label: `${member?.user?.firstName} ${member?.user?.lastName}`,
          value: member?.rowId,
        })),
    },
  );

  const { handleSubmit, AppField, AppForm, SubmitForm, reset } = useForm({
    defaultValues: {
      rowId: "",
    },
    asyncDebounceMs: DEBOUNCE_TIME,
    validators: {
      onChange: baseSchema,
    },
    onSubmit: async ({ value }) => {
      await addOwner({
        rowId: value.rowId,
        patch: {
          role: Role.Owner,
        },
      });
    },
  });

  return (
    <Dialog
      title={addOwnerDetails.title}
      description={addOwnerDetails.description}
      open={isOpen}
      onOpenChange={({ open }) => {
        reset();
        setIsOpen(open);
      }}
    >
      <sigil.form
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={8}
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await handleSubmit();
        }}
      >
        {members?.length ? (
          <AppField name="rowId">
            {({ SingularComboboxField }) => (
              <SingularComboboxField
                label={{
                  id: "member",
                  singular: addOwnerDetails.comboboxLabel.singular,
                  plural: addOwnerDetails.comboboxLabel.plural,
                }}
                items={members ?? []}
                placeholder={addOwnerDetails.form.rowId.placeholder}
              />
            )}
          </AppField>
        ) : (
          // TODO: discuss refactoring this when organization invites are implemented. We could implement a way to invite a new member as an owner.
          addOwnerDetails.noMembersFound
        )}

        <AppForm>
          <SubmitForm
            action={addOwnerDetails.form}
            isPending={isPending}
            flex={1}
            containerProps={{
              w: "full",
            }}
          />
        </AppForm>
      </sigil.form>
    </Dialog>
  );
};

export default AddOwner;
