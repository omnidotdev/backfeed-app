import { createListCollection } from "@ark-ui/react/combobox";
import { Portal } from "@ark-ui/react/portal";
import {
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxItemText,
  ComboboxPositioner,
  ComboboxRoot,
  ComboboxTrigger,
} from "@omnidotdev/thornberry/combobox";
import { Label } from "@omnidotdev/thornberry/label";
import { useMemo } from "react";

import Field from "@/components/form/Field";
import { useFieldContext } from "@/lib/hooks/useForm";

import type { StandardSchemaV1Issue } from "@tanstack/react-form";
import type { ComponentProps } from "react";

interface Item {
  /** Display label. */
  label: string;
  /** Item value. */
  value: string;
  /** Whether the item is disabled. */
  disabled?: boolean;
}

interface Props {
  /** Field label. */
  label?: string;
  /** The items available for selection. */
  items: Item[];
  /** Placeholder text. */
  placeholder?: string;
  /** Whether the field is disabled. */
  disabled?: boolean;
  /** Error map to determine issue message(s) to render. */
  errorMap?: StandardSchemaV1Issue[];
  /** Additional props for the error component. */
  errorProps?: ComponentProps<"span">;
}

/**
 * A combobox field that allows the user to select and search for a single item from a list.
 */
const SingularComboboxField = ({
  label,
  items,
  placeholder = "Select...",
  disabled,
  errorMap,
  errorProps,
}: Props) => {
  const { handleChange, state } = useFieldContext<string>();

  const collection = useMemo(() => createListCollection({ items }), [items]);

  return (
    <Field className="w-full gap-0" errorMap={errorMap} errorProps={errorProps}>
      {label && <Label className="mb-1.5">{label}</Label>}

      <ComboboxRoot
        collection={collection}
        value={state.value?.length ? [state.value] : []}
        onValueChange={({ value }) =>
          handleChange(value.length ? value[0] : "")
        }
        disabled={disabled}
        loopFocus
      >
        <ComboboxControl>
          <ComboboxInput placeholder={placeholder} className="pr-10" />
          <ComboboxTrigger />
        </ComboboxControl>

        <Portal>
          <ComboboxPositioner className="w-(--reference-width)">
            <ComboboxContent className="max-h-60">
              {items.length ? (
                items.map((item) => (
                  <ComboboxItem key={item.value} item={item}>
                    <ComboboxItemText>{item.label}</ComboboxItemText>
                    <ComboboxItemIndicator />
                  </ComboboxItem>
                ))
              ) : (
                <p className="px-2 py-4 text-center text-muted-foreground text-sm">
                  No results
                </p>
              )}
            </ComboboxContent>
          </ComboboxPositioner>
        </Portal>
      </ComboboxRoot>
    </Field>
  );
};

export default SingularComboboxField;
