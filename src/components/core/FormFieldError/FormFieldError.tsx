"use client";

import { Text } from "@omnidev/sigil";

import type { TagVariants, TextProps } from "@omnidev/sigil";
import type { ValidationError } from "@tanstack/react-form";

// NB: Omitting `as` and reapplying it to the `Text` component is to avoid ts errors as `TextProps` is not statically typed.
interface Props extends Omit<TextProps, "as"> {
  /** Error message. */
  error: ValidationError | undefined;
  /** Dirty state of the form field. */
  isDirty: boolean;
  /** What HTML element to render the error text as. */
  as?: TagVariants;
}

/**
 * Text to be displayed when a form field has errors.
 */
const FormFieldError = ({ error, isDirty, as = "p", ...rest }: Props) => (
  <Text
    position="absolute"
    top={-0.5}
    right={0}
    h={5}
    fontSize="sm"
    color="red"
    visibility={error && isDirty ? "visible" : "hidden"}
    as={as}
    {...rest}
  >
    {error}
  </Text>
);

export default FormFieldError;
