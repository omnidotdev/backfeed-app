"use client";

import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import {
  InputField,
  SingularComboboxField,
  SingularSelectField,
  SubmitForm,
  TextareaField,
} from "components/form";

/** @knipignore -  `useFieldContext` and `useFormContext` are used outside of this file, but others are not. This simplifies the export though. */
export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

/**
 * Custom hook to manage form state, validation, and submission.
 */
const { useAppForm: useForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    SingularComboboxField,
    SingularSelectField,
    TextareaField,
    InputField,
  },
  formComponents: {
    SubmitForm,
  },
});

export default useForm;
