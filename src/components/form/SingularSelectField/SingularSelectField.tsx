import { createListCollection } from "@ark-ui/react";
import { Select } from "@omnidev/sigil";

import { Field } from "components/form";
import { useFieldContext } from "lib/hooks";

import type { CollectionItem } from "@ark-ui/react";
import type { SelectProps } from "@omnidev/sigil";
import type { FormFieldErrorProps } from "components/form";

interface Props extends Omit<SelectProps, "collection"> {
  /** The items available for selection */
  items: CollectionItem[];
  /** The placeholder text to display when no item is selected */
  placeholder?: string;
  /** Additional props for the error component. */
  errorProps?: Partial<FormFieldErrorProps>;
}

/**
 * A select field that allows the user to select a single item from a list.
 */
const SingularSelectField = ({
  label,
  items,
  placeholder,
  errorProps,
  ...rest
}: Props) => {
  const { handleChange, state } = useFieldContext<string>();

  return (
    <Field gap={0} errorProps={errorProps}>
      <Select
        label={label}
        collection={createListCollection({
          items,
        })}
        displayGroupLabel={false}
        triggerProps={{
          borderColor: "border.subtle",
        }}
        valueTextProps={{
          placeholder,
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

export default SingularSelectField;
