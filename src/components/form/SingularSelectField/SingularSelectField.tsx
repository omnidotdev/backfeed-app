import { createListCollection } from "@ark-ui/react";
import { Select, Stack } from "@omnidev/sigil";

import { FormFieldError } from "components/core";
import { useFieldContext } from "lib/hooks";

import type { CollectionItem } from "@ark-ui/react";
import type { SelectProps } from "@omnidev/sigil";

interface Props extends Omit<SelectProps, "collection"> {
  /** The items available for selection */
  items: CollectionItem[];
  /** The placeholder text to display when no item is selected */
  placeholder?: string;
}

/**
 * A select field that allows the user to select a single item from a list.
 */
const SingularSelectField = ({ label, items, placeholder, ...rest }: Props) => {
  const { handleChange, state } = useFieldContext<string>();

  return (
    <Stack position="relative">
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

      <FormFieldError
        errors={state.meta.errorMap.onSubmit}
        isDirty={state.meta.isDirty}
      />
    </Stack>
  );
};

export default SingularSelectField;
