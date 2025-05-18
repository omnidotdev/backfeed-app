"use client";

import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import {
  InputField,
  SingularComboboxField,
  SubmitForm,
  TextareaField,
} from "components/form";

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

/**
 * Custom hook to manage form state, validation, and submission.
 */
const { useAppForm: useForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    SingularComboboxField,
    TextareaField,
    InputField,
  },
  formComponents: {
    SubmitForm,
  },
});

export { useFieldContext, useFormContext, withForm };

export default useForm;
