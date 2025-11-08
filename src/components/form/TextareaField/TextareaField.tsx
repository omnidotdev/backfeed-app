import { Label, Textarea, Tooltip } from "@omnidev/sigil";

import { Field } from "components/form";
import { useFieldContext } from "lib/hooks";

import type { TextareaProps, TextProps } from "@omnidev/sigil";
import type { StandardSchemaV1Issue } from "@tanstack/react-form";

interface Props extends TextareaProps {
  /** Label for the textarea field. */
  label?: string;
  /** Error map to determine issue message(s) to render. */
  errorMap?: StandardSchemaV1Issue[];
  /** Additional props for the error component. */
  errorProps?: TextProps;
  /** Content to display for tooltip when input is disabled. */
  tooltip?: string;
}

/**
 * Textarea field component for form inputs.
 */
const TextareaField = ({
  label,
  errorMap,
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
        <Field errorMap={errorMap} errorProps={errorProps}>
          {label && <Label htmlFor={name}>{label}</Label>}

          <Textarea
            id={name}
            borderColor="border.subtle"
            value={state.value}
            onChange={(evt) => handleChange(evt.target.value)}
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

export default TextareaField;
