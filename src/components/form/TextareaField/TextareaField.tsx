import { Label, Stack, Textarea } from "@omnidev/sigil";

import { FormFieldError } from "components/form";
import { useFieldContext } from "lib/hooks";

import type { TextareaProps } from "@omnidev/sigil";
import type { FormFieldErrorProps } from "components/form";

interface Props extends TextareaProps {
  /** Label for the textarea field. */
  label?: string;
  /** Additional props for the error component. */
  errorProps?: Omit<FormFieldErrorProps, "errors" | "isDirty">;
}

/**
 * Textarea field component for form inputs.
 */
const TextareaField = ({ label, errorProps, ...rest }: Props) => {
  const { handleChange, state, name } = useFieldContext<string>();

  return (
    <Stack position="relative" gap={1.5}>
      {label && <Label htmlFor={name}>{label}</Label>}

      <Textarea
        id={name}
        borderColor="border.subtle"
        value={state.value}
        onChange={(e) => handleChange(e.target.value)}
        {...rest}
      />

      <FormFieldError
        errors={state.meta.errorMap.onSubmit}
        isDirty={state.meta.isDirty}
        {...errorProps}
      />
    </Stack>
  );
};

export default TextareaField;
