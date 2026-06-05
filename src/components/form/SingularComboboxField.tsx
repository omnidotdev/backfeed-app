import Field from "@/components/form/Field";
import Combobox from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
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
  placeholder,
  disabled,
  errorMap,
  errorProps,
}: Props) => {
  const { handleChange, state } = useFieldContext<string>();

  return (
    <Field className="w-full gap-0" errorMap={errorMap} errorProps={errorProps}>
      {label && <Label className="mb-1.5">{label}</Label>}

      <Combobox
        items={items}
        placeholder={placeholder}
        disabled={disabled}
        value={state.value?.length ? [state.value] : []}
        onValueChange={(value) => handleChange(value.length ? value[0] : "")}
      />
    </Field>
  );
};

export default SingularComboboxField;
