import { useStore } from "@tanstack/react-form";
import { IoWarningOutline } from "react-icons/io5";

import { Button } from "@/components/ui/button";
import app from "@/lib/config/app.config";
import { useFormContext } from "@/lib/hooks/useForm";
import cn from "@/lib/utils";

import type { ComponentProps } from "react";

interface Props extends ComponentProps<typeof Button> {
  /** Action labels for submit button states. */
  action: {
    submit: string;
    pending: string;
  };
  /** Whether the mutation is pending. */
  isPending?: boolean;
  /** Whether to inform the user of unsaved changes. */
  showAlert?: boolean;
  /** Container class names. */
  containerClassName?: string;
}

/**
 * Component for submitting forms.
 */
const SubmitForm = ({
  disabled,
  action,
  isPending = false,
  showAlert = false,
  containerClassName,
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
        <div
          className={cn("flex flex-col gap-2 sm:flex-row", containerClassName)}
        >
          <Button
            type="submit"
            tabIndex={0}
            className="min-w-fit"
            disabled={
              !canSubmit || !isDirty || isSubmitting || isPending || disabled
            }
            {...rest}
          >
            {isSubmitting || isPending ? action.pending : action.submit}
          </Button>

          {isDirty && showAlert && (
            <div className="flex items-center justify-center gap-1 rounded-sm bg-amber-50 p-2 text-amber-700 sm:w-fit dark:bg-amber-950/30 dark:text-amber-400">
              <IoWarningOutline className="size-4" />
              {app.unsavedChanges.description}
            </div>
          )}
        </div>
      )}
    </Subscribe>
  );
};

export default SubmitForm;
