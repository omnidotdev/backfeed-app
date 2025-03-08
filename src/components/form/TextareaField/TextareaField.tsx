import { Label, Textarea } from "@omnidev/sigil";

import { Field } from "components/form";
import { useFieldContext } from "lib/hooks";

import type { TextareaProps } from "@omnidev/sigil";
import type { FormFieldErrorProps } from "components/form";

interface Props extends TextareaProps {
  /** Label for the textarea field. */
  label?: string;
  /** Additional props for the error component. */
  errorProps?: Partial<FormFieldErrorProps>;
}

/**
 * Textarea field component for form inputs.
 */
const TextareaField = ({ label, errorProps, ...rest }: Props) => {
  const { handleChange, state, name } = useFieldContext<string>();

  return (
    <Field errorProps={errorProps}>
      {label && <Label htmlFor={name}>{label}</Label>}

      <Textarea
        id={name}
        borderColor="border.subtle"
        value={state.value}
        onChange={(evt) => handleChange(evt.target.value)}
        {...rest}
      />
    </Field>
  );
};

export default TextareaField;
