"use client";

import { createListCollection } from "@ark-ui/react";
import { Button, Combobox, Dialog, HStack, sigil } from "@omnidev/sigil";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import {
  Role,
  useMembersQuery,
  useUpdateMemberMutation,
} from "generated/graphql";
import { app } from "lib/config";
import { standardSchemaValidator } from "lib/constants";
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
  const { isOpen, setIsOpen } = useDialogStore({
    type: DialogType.AddOwner,
  });

  const { mutateAsync: addOwner } = useUpdateMemberMutation({
    onSuccess: () => {
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

  const { handleSubmit, Field, Subscribe, reset } = useForm({
    defaultValues: {
      rowId: "",
    },
    asyncDebounceMs: 300,
    validatorAdapter: standardSchemaValidator,
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
        gap={4}
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await handleSubmit();
        }}
      >
        <Field name="rowId">
          {({ handleChange, state }) => (
            <Combobox
              label={{ id: "member", singular: "Member", plural: "Members" }}
              collection={createListCollection({ items: members ?? [] })}
              placeholder={addOwnerDetails.form.rowId.placeholder}
              clearTriggerProps={{
                display: state.value.length ? "block" : "none",
              }}
              value={[state.value]}
              onValueChange={({ value }) => {
                value.length ? handleChange(value[0]) : handleChange("");
              }}
            />
          )}
        </Field>

        <HStack>
          <Subscribe
            selector={(state) => [
              state.canSubmit,
              state.isSubmitting,
              state.isDirty,
            ]}
          >
            {([canSubmit, isSubmitting, isDirty]) => (
              <Button
                type="submit"
                flex={1}
                disabled={!canSubmit || !isDirty || isSubmitting}
              >
                {isSubmitting
                  ? addOwnerDetails.form.pending
                  : addOwnerDetails.title}
              </Button>
            )}
          </Subscribe>

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
