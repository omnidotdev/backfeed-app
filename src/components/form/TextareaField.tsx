import { Portal } from "@ark-ui/react/portal";

import Field from "@/components/form/Field";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  TooltipContent,
  TooltipPositioner,
  TooltipRoot,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFieldContext } from "@/lib/hooks/useForm";

import type { StandardSchemaV1Issue } from "@tanstack/react-form";
import type { ComponentProps } from "react";

interface Props extends ComponentProps<typeof Textarea> {
  /** Label for the textarea field. */
  label?: string;
  /** Error map to determine issue message(s) to render. */
  errorMap?: StandardSchemaV1Issue[];
  /** Additional props for the error component. */
  errorProps?: ComponentProps<"span">;
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

  const field = (
    <Field errorMap={errorMap} errorProps={errorProps}>
      {label && <Label htmlFor={name}>{label}</Label>}

      <Textarea
        id={name}
        className="border-border-subtle"
        value={state.value}
        onChange={(evt) => handleChange(evt.target.value)}
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

export default TextareaField;
