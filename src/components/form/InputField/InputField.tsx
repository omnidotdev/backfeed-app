import { Input, Label } from "@omnidev/sigil";

import { Field } from "components/form";
import { useFieldContext } from "lib/hooks";

import type { InputProps } from "@omnidev/sigil";
import type { FormFieldErrorProps } from "components/form";

interface Props extends InputProps {
  /** Label for the text field. */
  label?: string;
  /** Additional props for the error component. */
  errorProps?: Partial<FormFieldErrorProps>;
}

/**
 * Text field component for form inputs.
 */
const InputField = ({ label, errorProps, ...rest }: Props) => {
  const { handleChange, state, name } = useFieldContext<string>();

  return (
    <Field errorProps={errorProps}>
      {label && <Label htmlFor={name}>{label}</Label>}

      <Input
        id={name}
        value={state.value}
        onChange={(evt) => handleChange(evt.target.value)}
        borderColor="border.subtle"
        {...rest}
      />
    </Field>
  );
};

export default InputField;
