import { createListCollection } from "@ark-ui/react";
import { Combobox } from "@omnidev/sigil";

import { Field } from "components/form";
import { useFieldContext } from "lib/hooks";

import type { CollectionItem } from "@ark-ui/react";
import type { ComboboxProps, TextProps } from "@omnidev/sigil";
import type { StandardSchemaV1Issue } from "@tanstack/react-form";

interface Props extends Omit<ComboboxProps, "collection"> {
  /** The items available for selection. */
  items: CollectionItem[];
  /** Error map to determine issue message(s) to render. */
  errorMap?: StandardSchemaV1Issue[];
  /** Additional props for the error component. */
  errorProps?: TextProps;
}

/**
 * A combobox field that allows the user to select and search for a single item from a list.
 */
const SingularComboboxField = ({
  label,
  items,
  errorMap,
  errorProps,
  ...rest
}: Props) => {
  const { handleChange, state } = useFieldContext<string>();

  return (
    <Field w="full" gap={0} errorMap={errorMap} errorProps={errorProps}>
      {/* TODO: figure out how to appropriately style clearTrigger and trigger */}
      <Combobox
        label={label}
        collection={createListCollection({
          items,
        })}
        clearTriggerProps={{
          display: state.value.length ? "block" : "none",
        }}
        value={state.value?.length ? [state.value] : []}
        onValueChange={({ value }) =>
          handleChange(value.length ? value[0] : "")
        }
        {...rest}
      />
    </Field>
  );
};

export default SingularComboboxField;
