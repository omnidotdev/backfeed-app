import { Stack, Text } from "@omnidev/sigil";

import { useFieldContext } from "@/lib/hooks/useForm";

import type { StackProps, TextProps } from "@omnidev/sigil";
import type { StandardSchemaV1Issue } from "@tanstack/react-form";

interface Props extends StackProps {
  /** Error map to determine issue message(s) to render. */
  errorMap?: StandardSchemaV1Issue[];
  /** Overrides to apply to the default error text element. */
  errorProps?: TextProps;
}

/**
 * Generalized form `Field` component.
 */
const Field = ({ errorMap, errorProps, children, ...rest }: Props) => {
  const { state } = useFieldContext<string>();

  const errors = (errorMap ??
    state.meta.errorMap.onSubmit ??
    []) as StandardSchemaV1Issue[];

  return (
    <Stack position="relative" gap={1.5} {...rest}>
      {children}

      {!!errors.length && (
        <Text
          position="absolute"
          top={0}
          right={0}
          h={5}
          fontSize="sm"
          color="primary"
          {...errorProps}
        >
          {errors[0].message}
        </Text>
      )}
    </Stack>
  );
};

export default Field;
