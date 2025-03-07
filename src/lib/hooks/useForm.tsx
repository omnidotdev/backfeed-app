"use client";

import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import { SubmitForm, TextField } from "components/form";

/** @knipignore -  TODO: remove tag when fieldContext and formContext are used. */
export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm: useForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
  },
  formComponents: {
    SubmitForm,
  },
});

export default useForm;
