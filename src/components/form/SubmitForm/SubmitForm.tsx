import { Button } from "@omnidev/sigil";
import { useFormContext } from "lib/hooks";

import type { ButtonProps } from "@omnidev/sigil";

interface Props extends ButtonProps {
  /** Action labels for submit and pending states */
  action: {
    submit: string;
    pending: string;
  };
  /** Boolean indicating if the mutation is pending */
  isPending?: boolean;
}

const SubmitForm = ({
  action,
  isPending = false,
  disabled,
  ...rest
}: Props) => {
  const { Subscribe } = useFormContext();

  return (
    <Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting, state.isDirty]}
    >
      {([canSubmit, isSubmitting, isDirty]) => (
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
