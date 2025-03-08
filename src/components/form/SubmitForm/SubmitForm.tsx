import { Button } from "@omnidev/sigil";
import { useStore } from "@tanstack/react-form";

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
}

/**
 * Component for submitting forms.
 */
const SubmitForm = ({
  action,
  isPending = false,
  disabled,
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
        <Button
          type="submit"
          disabled={
            !canSubmit || !isDirty || isSubmitting || isPending || disabled
          }
          {...rest}
        >
          {isSubmitting || isPending ? action.pending : action.submit}
        </Button>
      )}
    </Subscribe>
  );
};

export default SubmitForm;
