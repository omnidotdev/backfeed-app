import { Alert, Button, Icon, Stack } from "@omnidev/sigil";
import { useStore } from "@tanstack/react-form";
import { IoWarningOutline } from "react-icons/io5";

import app from "@/lib/config/app.config";
import { useFormContext } from "@/lib/hooks/useForm";

import type { ButtonProps, StackProps } from "@omnidev/sigil";

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
  /** Container props. */
  containerProps?: StackProps;
}

/**
 * Component for submitting forms.
 */
const SubmitForm = ({
  disabled,
  action,
  isPending = false,
  showAlert = false,
  containerProps,
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
    ({ values }) => JSON.stringify(values) !== JSON.stringify(defaultValues),
  );

  return (
    <Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]) => (
        <Stack direction={{ base: "column", sm: "row" }} {...containerProps}>
          <Button
            type="submit"
            minW="fit-content"
            tabIndex={0}
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
              icon={<Icon src={IoWarningOutline} h={4} w={4} />}
              borderRadius="sm"
              p={2}
              alignItems="center"
              justifyContent={{ baseToSm: "center" }}
              w={{ sm: "fit-content" }}
              gap={1}
            />
          )}
        </Stack>
      )}
    </Subscribe>
  );
};

export default SubmitForm;
