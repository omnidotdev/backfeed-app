"use client";

import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import {
  InputField,
  SingularComboboxField,
  SingularSelectField,
  SubmitForm,
  TextareaField,
} from "components/form";

const { fieldContext, formContext, useFieldContext, useFormContext } =
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

export { useFieldContext, useFormContext };

export default useForm;
