"use client";

import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import {
  SingularSelectField,
  SubmitForm,
  TextField,
  TextareaField,
} from "components/form";

/** @knipignore -  `useFieldContext` and `useFormContext` are used outside of this file, but others are not. This simplifies the export though. */
export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm: useForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    SingularSelectField,
    TextareaField,
    TextField,
  },
  formComponents: {
    SubmitForm,
  },
});

export default useForm;
