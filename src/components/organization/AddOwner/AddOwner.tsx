"use client";

import { createListCollection } from "@ark-ui/react";
import {
  Button,
  Combobox,
  Dialog,
  HStack,
  Icon,
  sigil,
  useDisclosure,
} from "@omnidev/sigil";
import { useForm } from "@tanstack/react-form";
import { LuCirclePlus } from "react-icons/lu";
import { z } from "zod";

import {
  Role,
  useMembersQuery,
  useUpdateMemberMutation,
} from "generated/graphql";
import { standardSchemaValidator } from "lib/constants";

/** Schema for defining the shape of the add owner form fields. */
const baseSchema = z.object({
  rowId: z.string().uuid(),
});

interface Props {
  /** Organization ID. */
  organizationId: string;
}

const AddOwner = ({ organizationId }: Props) => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  // TODO: implement optimistic updates / toasts
  const { mutateAsync: addOwner } = useUpdateMemberMutation({
    onSuccess: () => {
      onClose();
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
      title="Add Owner"
      description="Add a new owner to the organization."
      open={isOpen}
      onOpenChange={() => {
        reset();
        onToggle();
      }}
      trigger={
        <Button variant="outline">
          <Icon src={LuCirclePlus} w={4} h={4} />
          New Owner
        </Button>
      }
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
              placeholder="Search for or select a member..."
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
                {isSubmitting ? "Adding Owner..." : "Add Owner"}
              </Button>
            )}
          </Subscribe>

          <Button
            variant="outline"
            flex={1}
            onClick={() => {
              reset();
              onClose();
            }}
          >
            Cancel
          </Button>
        </HStack>
      </sigil.form>
    </Dialog>
  );
};

export default AddOwner;
