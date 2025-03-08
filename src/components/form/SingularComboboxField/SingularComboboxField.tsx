import { createListCollection } from "@ark-ui/react";
import { Combobox } from "@omnidev/sigil";

import { Field } from "components/form";
import { useFieldContext } from "lib/hooks";

import type { CollectionItem } from "@ark-ui/react";
import type { ComboboxProps } from "@omnidev/sigil";
import type { FormFieldErrorProps } from "components/form";

interface Props extends Omit<ComboboxProps, "collection"> {
  /** The items available for selection */
  items: CollectionItem[];
  /** Additional props for the error component. */
  errorProps?: Partial<FormFieldErrorProps>;
}

/**
 * A combobox field that allows the user to select and search for a single item from a list.
 */
const SingularComboboxField = ({
  label,
  items,
  errorProps,
  ...rest
}: Props) => {
  const { handleChange, state } = useFieldContext<string>();

  return (
    <Field w="full" gap={0} errorProps={errorProps}>
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
