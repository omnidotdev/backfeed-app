import { Portal } from "@ark-ui/react/portal";

import Field from "@/components/form/Field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TooltipContent,
  TooltipPositioner,
  TooltipRoot,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFieldContext } from "@/lib/hooks/useForm";

import type { StandardSchemaV1Issue } from "@tanstack/react-form";
import type { ComponentProps } from "react";

interface Props extends ComponentProps<typeof Input> {
  /** Label for the text field. */
  label?: string;
  /** Error map to determine issue message(s) to render. */
  errorMap?: StandardSchemaV1Issue[];
  /** Additional props for the error component. */
  errorProps?: ComponentProps<"span">;
  /** Content to display for tooltip when input is disabled. */
  tooltip?: string;
}

/**
 * Text field component for form inputs.
 */
const InputField = ({
  label,
  errorMap,
  errorProps,
  disabled,
  tooltip,
  ...rest
}: Props) => {
  const { handleChange, state, name } = useFieldContext<string>();

  const field = (
    <Field errorMap={errorMap} errorProps={errorProps}>
      {label && <Label htmlFor={name}>{label}</Label>}

      <Input
        id={name}
        value={state.value}
        onChange={(evt) => handleChange(evt.target.value)}
        className="border-border-subtle"
        disabled={disabled}
        {...rest}
      />
    </Field>
  );

  if (!disabled || !tooltip) return field;

  return (
    <TooltipRoot>
      <TooltipTrigger asChild tabIndex={-1}>
        {field}
      </TooltipTrigger>

      <Portal>
        <TooltipPositioner>
          <TooltipContent className="text-sm">{tooltip}</TooltipContent>
        </TooltipPositioner>
      </Portal>
    </TooltipRoot>
  );
};

export default InputField;
