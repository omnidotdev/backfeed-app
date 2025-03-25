import { Alert, Button, HStack, Icon } from "@omnidev/sigil";
import { useStore } from "@tanstack/react-form";
import { IoWarningOutline } from "react-icons/io5";

import { app } from "lib/config";
import { useFormContext } from "lib/hooks";

import type { ButtonProps } from "@omnidev/sigil";

interface Props extends ButtonProps {
  /** Action labels for submit button states. */
  action: {
    submit: string;
    pending: string;
  };
  /** Whether the mutation is pending. */
  isPending?: boolean;
  /** Whether to inform the user of unsaved changes. */
  showAlert?: boolean;
}

/**
 * Component for submitting forms.
 */
const SubmitForm = ({
  disabled,
  action,
  isPending = false,
  showAlert = false,
  ...rest
}: Props) => {
  const {
    Subscribe,
    options: { defaultValues },
    store,
  } = useFormContext();

  // NB: This works fine for simple objects without circular references and consistent key orders. If forms are ever built recursively or dynamically, we may have to revisit this approach.
  const isDirty = useStore(
    store,
    ({ values }) => JSON.stringify(values) !== JSON.stringify(defaultValues)
  );

  return (
    <Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]) => (
        <HStack>
          <Button
            type="submit"
            disabled={
              !canSubmit || !isDirty || isSubmitting || isPending || disabled
            }
            {...rest}
          >
            {isSubmitting || isPending ? action.pending : action.submit}
          </Button>

          {isDirty && showAlert && (
            <Alert
              variant="warning"
              description={app.unsavedChanges.description}
              icon={<Icon src={IoWarningOutline} h={4} w={4} mt={1} />}
              w="fit"
              borderRadius="sm"
              borderWidth={0}
              px={3}
              py={2}
              alignItems="center"
              gap={1}
            />
          )}
        </HStack>
      )}
    </Subscribe>
  );
};

export default SubmitForm;
