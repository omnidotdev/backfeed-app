"use client";

import { Button, Dialog, HStack, sigil } from "@omnidev/sigil";
import { z } from "zod";

import { useQueryClient } from "@tanstack/react-query";
import {
  Role,
  useMembersQuery,
  useUpdateMemberMutation,
} from "generated/graphql";
import { app } from "lib/config";
import { useForm } from "lib/hooks";
import { useDialogStore } from "lib/hooks/store";
import { DialogType } from "store";

const addOwnerDetails = app.organizationMembersPage.cta.addOwner;

/** Schema for defining the shape of the add owner form fields. */
const baseSchema = z.object({
  rowId: z.string().uuid(),
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
    }
  );

  const { handleSubmit, AppField, AppForm, SubmitForm, reset } = useForm({
    defaultValues: {
      rowId: "",
    },
    asyncDebounceMs: 300,
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
                label={{ id: "member", singular: "Member", plural: "Members" }}
                items={members ?? []}
                placeholder={addOwnerDetails.form.rowId.placeholder}
              />
            )}
          </AppField>
        ) : (
          // TODO: discuss refactoring this when organization invites are implemented. We could implement a way to invite a new member as an owner.
          addOwnerDetails.noMembersFound
        )}

        <HStack w="full">
          <AppForm>
            <SubmitForm
              action={addOwnerDetails.form}
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
            {addOwnerDetails.form.cancel}
          </Button>
        </HStack>
      </sigil.form>
    </Dialog>
  );
};

export default AddOwner;
