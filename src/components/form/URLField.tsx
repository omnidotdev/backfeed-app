import { LuX } from "react-icons/lu";
import { useDebounceValue } from "usehooks-ts";

import Favicon from "@/components/core/Favicon";
import Field from "@/components/form/Field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DEBOUNCE_TIME from "@/lib/constants/debounceTime.constant";
import { useFieldContext } from "@/lib/hooks/useForm";

import type { StandardSchemaV1Issue } from "@tanstack/react-form";
import type { ComponentProps } from "react";

interface Props extends ComponentProps<typeof Input> {
  /** Label for the input field. */
  label?: string;
  /** Field container props. */
  containerProps?: ComponentProps<"div">;
  /** Error map to determine issue message(s) to render. */
  errorMap?: StandardSchemaV1Issue[];
  /** Additional props for the error component. */
  errorProps?: ComponentProps<"span">;
  /** Whether to display the remove field trigger. */
  displayRemoveTrigger?: boolean;
  /** Additional props to be passed to the remove field trigger. */
  removeFieldProps?: ComponentProps<typeof Button>;
}

/**
 * URL field component for form inputs.
 * Accepts full URLs and displays favicon preview.
 */
const URLField = ({
  label,
  containerProps,
  errorMap,
  errorProps,
  displayRemoveTrigger = true,
  removeFieldProps,
  ...props
}: Props) => {
  const { handleChange, state, name } = useFieldContext<string>();

  // debounce the favicon lookup so it does not hit the proxy on every keystroke
  const [debouncedUrl] = useDebounceValue(state.value, DEBOUNCE_TIME);

  return (
    <Field errorMap={errorMap} errorProps={errorProps} {...containerProps}>
      {label && <Label htmlFor={name}>{label}</Label>}

      <div className="flex items-center gap-2">
        <Favicon
          url={debouncedUrl}
          size={5}
          className="text-foreground-subtle"
        />

        <div className="flex flex-1 items-center overflow-hidden rounded-sm border border-border-subtle transition-[box-shadow,border-color] focus-within:border-accent focus-within:ring-1 focus-within:ring-accent">
          <Input
            id={name}
            placeholder="https://example.com"
            value={state.value}
            onChange={(evt) => handleChange(evt.target.value)}
            className="border-0 shadow-none focus-visible:ring-0"
            {...props}
          />
        </div>

        {displayRemoveTrigger && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0 bg-transparent text-foreground-subtle hover:text-[var(--colors-omni-ruby)] disabled:opacity-80"
            {...removeFieldProps}
          >
            <LuX />
          </Button>
        )}
      </div>
    </Field>
  );
};

export default URLField;
