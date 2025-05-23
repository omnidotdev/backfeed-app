"use client";

import { Text } from "@omnidev/sigil";

import type { TagVariants, TextProps } from "@omnidev/sigil";
import type { StandardSchemaV1Issue } from "@tanstack/react-form";

// NB: Omitting `as` and reapplying it to the `Text` component is to avoid ts errors as `TextProps` is not statically typed.
export interface Props extends Omit<TextProps, "as"> {
  /** Error messages. */
  errors: StandardSchemaV1Issue[] | undefined;
  /** What HTML element to render the error text as. */
  as?: TagVariants;
}

/**
 * Text to be displayed when a form field has errors.
 */
const FormFieldError = ({ errors, as = "p", ...rest }: Props) => (
  <Text
    position="absolute"
    top={0}
    right={0}
    h={5}
    fontSize="sm"
    color="red"
    visibility={errors?.length ? "visible" : "hidden"}
    as={as}
    {...rest}
  >
    {errors?.length ? errors[0].message : null}
  </Text>
);

export default FormFieldError;
