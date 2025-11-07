import { Input, Label, Tooltip } from "@omnidev/sigil";
import { Field } from "components/form";
import { useFieldContext } from "lib/hooks";

import type { InputProps } from "@omnidev/sigil";
import type { FormFieldErrorProps } from "components/form";

interface Props extends InputProps {
  /** Label for the text field. */
  label?: string;
  /** Additional props for the error component. */
  errorProps?: Partial<FormFieldErrorProps>;
  /** Content to display for tooltip when input is disabled. */
  tooltip?: string;
}

/**
 * Text field component for form inputs.
 */
const InputField = ({
  label,
  errorProps,
  disabled,
  tooltip,
  ...rest
}: Props) => {
  const { handleChange, state, name } = useFieldContext<string>();

  return (
    <Tooltip
      hasArrow={false}
      trigger={
        <Field errorProps={errorProps}>
          {label && <Label htmlFor={name}>{label}</Label>}

          <Input
            id={name}
            value={state.value}
            onChange={(evt) => handleChange(evt.target.value)}
            borderColor="border.subtle"
            disabled={disabled}
            {...rest}
          />
        </Field>
      }
      triggerProps={{
        disabled,
        onClick: (evt) => {
          evt.preventDefault();
          evt.stopPropagation();
        },
        tabIndex: -1,
        style: {
          all: "unset",
        },
      }}
      contentProps={{
        display: !disabled || !tooltip ? "none" : undefined,
        zIndex: "foreground",
        fontSize: "sm",
      }}
    >
      {tooltip}
    </Tooltip>
  );
};

export default InputField;
