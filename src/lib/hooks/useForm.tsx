"use client";

import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import { SingularSelectField, SubmitForm, TextField } from "components/form";

/** @knipignore -  TODO: remove tag when fieldContext and formContext are used outside of this file. */
export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm: useForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    SingularSelectField,
    TextField,
  },
  formComponents: {
    SubmitForm,
  },
});

export default useForm;
