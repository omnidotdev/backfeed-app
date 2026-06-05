import { Checkbox as ArkCheckbox } from "@ark-ui/react/checkbox";
import { Check, Minus } from "lucide-react";

import cn from "@/lib/utils";

import type { ComponentProps, ReactNode } from "react";

const CheckboxRoot = ({
  className,
  ...rest
}: ComponentProps<typeof ArkCheckbox.Root>) => (
  <ArkCheckbox.Root
    className={cn("inline-flex items-center gap-2", className)}
    {...rest}
  />
);

const CheckboxControl = ({
  className,
  ...rest
}: ComponentProps<typeof ArkCheckbox.Control>) => (
  <ArkCheckbox.Control
    className={cn(
      "flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-input bg-background text-primary-foreground shadow-xs transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-disabled:cursor-not-allowed data-disabled:opacity-50",
      className,
    )}
    {...rest}
  />
);

const CheckboxIndicator = ArkCheckbox.Indicator;
const CheckboxLabel = ({
  className,
  ...rest
}: ComponentProps<typeof ArkCheckbox.Label>) => (
  <ArkCheckbox.Label className={cn("text-sm", className)} {...rest} />
);
const CheckboxHiddenInput = ArkCheckbox.HiddenInput;

interface CheckboxProps
  extends Omit<ComponentProps<typeof ArkCheckbox.Root>, "children"> {
  /** Label content. */
  label?: ReactNode;
  /** Props for the label element. */
  labelProps?: ComponentProps<typeof ArkCheckbox.Label>;
  /** Props for the control element. */
  controlProps?: ComponentProps<typeof ArkCheckbox.Control>;
}

/**
 * Composed checkbox with control, indicator and optional label.
 */
const Checkbox = ({
  label,
  labelProps,
  controlProps,
  ...rest
}: CheckboxProps) => (
  <CheckboxRoot {...rest}>
    <CheckboxControl {...controlProps}>
      <CheckboxIndicator>
        <Check className="size-3" />
      </CheckboxIndicator>
      <CheckboxIndicator indeterminate>
        <Minus className="size-3" />
      </CheckboxIndicator>
    </CheckboxControl>

    {label != null && <CheckboxLabel {...labelProps}>{label}</CheckboxLabel>}

    <CheckboxHiddenInput />
  </CheckboxRoot>
);

export {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRoot,
};
