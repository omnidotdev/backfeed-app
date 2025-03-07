import { Input, Label, Stack } from "@omnidev/sigil";

import { FormFieldError } from "components/core";
import { useFieldContext } from "lib/hooks";

import type { InputProps } from "@omnidev/sigil";

interface Props extends InputProps {
  label: string;
}

const TextField = ({ label, ...rest }: Props) => {
  const { handleChange, state, name } = useFieldContext<string>();

  return (
    <Stack position="relative" gap={1.5}>
      <Label htmlFor={name}>{label}</Label>

      <Input
        id={name}
        value={state.value}
        onChange={(e) => handleChange(e.target.value)}
        {...rest}
      />

      <FormFieldError
        errors={state.meta.errorMap.onSubmit}
        isDirty={state.meta.isDirty}
      />
    </Stack>
  );
};

export default TextField;
