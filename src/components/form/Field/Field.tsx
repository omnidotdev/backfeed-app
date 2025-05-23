import { Stack } from "@omnidev/sigil";

import { FormFieldError } from "components/form";
import { useFieldContext } from "lib/hooks";

import type { StackProps } from "@omnidev/sigil";
import type { FormFieldErrorProps } from "components/form";

interface Props extends StackProps {
  /** Props for the form field error container. */
  errorProps?: Partial<FormFieldErrorProps>;
}

/**
 * Generalized form `Field` component.
 */
const Field = ({ errorProps, children, ...rest }: Props) => {
  const { state } = useFieldContext<string>();

  return (
    <Stack position="relative" gap={1.5} {...rest}>
      {children}

      <FormFieldError errors={state.meta.errorMap.onSubmit} {...errorProps} />
    </Stack>
  );
};

export default Field;
