import { Button, Dialog, Stack, Text, sigil } from "@omnidev/sigil";
import { useRef } from "react";

import useForm from "@/lib/hooks/useForm";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";
import generateSlug from "@/lib/util/generateSlug";

interface Props {
  tierName: string;
  onSubmit: (workspaceName: string, slug: string) => void;
  isLoading?: boolean;
}

/**
 * Modal for creating a new workspace from the pricing page.
 * Collects workspace name and generates slug before checkout.
 */
const CreateWorkspaceModal = ({ tierName, onSubmit, isLoading }: Props) => {
  const nameRef = useRef<HTMLInputElement>(null);

  const { isOpen, setIsOpen } = useDialogStore({
    type: DialogType.CreateWorkspace,
  });

  const { handleSubmit, AppField, reset, state } = useForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onSubmitAsync: async ({ value }) => {
        if (value.name.trim().length < 2) {
          return {
            fields: {
              name: "Workspace name must be at least 2 characters",
            },
          };
        }

        if (value.name.trim().length > 50) {
          return {
            fields: {
              name: "Workspace name must be less than 50 characters",
            },
          };
        }

        return null;
      },
    },
    onSubmit: async ({ value, formApi }) => {
      const slug = generateSlug(value.name.trim());
      if (slug) {
        onSubmit(value.name.trim(), slug);
        formApi.reset();
      }
    },
  });

  const currentName = state.values.name;
  const previewSlug = currentName ? generateSlug(currentName.trim()) : "";

  return (
    <Dialog
      title="Create Workspace"
      description={`Create a new workspace with the ${tierName} plan.`}
      open={isOpen}
      onOpenChange={({ open }) => {
        setIsOpen(open);
        if (!open) {
          reset();
        }
      }}
      initialFocusEl={() => nameRef.current}
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
        <AppField name="name">
          {({ InputField }) => (
            <Stack gap={2}>
              <InputField
                ref={nameRef}
                placeholder="Workspace Name"
                autoComplete="off"
              />

              {previewSlug && (
                <Text color="foreground.subtle" fontSize="xs">
                  URL:{" "}
                  <Text as="span" fontFamily="mono">
                    {previewSlug}
                  </Text>
                </Text>
              )}
            </Stack>
          )}
        </AppField>

        <Stack direction="row" justify="flex-end" gap={2} mt={2}>
          <Button
            type="button"
            onClick={() => {
              setIsOpen(false);
              reset();
            }}
            variant="outline"
            disabled={isLoading}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={
              !state.canSubmit ||
              state.isSubmitting ||
              state.isDefaultValue ||
              isLoading
            }
          >
            {isLoading ? "Creating..." : "Continue to Checkout"}
          </Button>
        </Stack>
      </sigil.form>
    </Dialog>
  );
};

export default CreateWorkspaceModal;
