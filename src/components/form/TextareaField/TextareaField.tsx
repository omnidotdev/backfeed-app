import { Label, Stack, Textarea } from "@omnidev/sigil";

import { FormFieldError } from "components/core";
import { useFieldContext } from "lib/hooks";

import type { TextareaProps } from "@omnidev/sigil";

interface Props extends TextareaProps {
  /** Label for the textarea field. */
  label: string;
}

/**
 * Textarea field component for form inputs.
 */
const TextareaField = ({ label, ...rest }: Props) => {
  const { handleChange, state, name } = useFieldContext<string>();

  return (
    <Stack position="relative" gap={1.5}>
      <Label htmlFor={name}>{label}</Label>

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
      />
    </Stack>
  );
};

export default TextareaField;
