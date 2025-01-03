"use client";

import { Text } from "@omnidev/sigil";

import type { ValidationError } from "@tanstack/react-form";

interface Props {
  /** Error message. */
  error: ValidationError | undefined;
  /** Dirty state of the form field. */
  isDirty: boolean;
}

/**
 * Text to be displayed when a form field has errors.
 */
const FormFieldError = ({ error, isDirty }: Props) => (
  <Text
    position="absolute"
    top={-0.5}
    right={0}
    h={5}
    fontSize="sm"
    color="red"
    visibility={error && isDirty ? "visible" : "hidden"}
  >
    {error}
  </Text>
);

export default FormFieldError;
