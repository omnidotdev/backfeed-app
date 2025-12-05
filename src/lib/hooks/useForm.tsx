import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import InputField from "@/components/form/InputField";
import SingularComboboxField from "@/components/form/SingularComboboxField";
import SubmitForm from "@/components/form/SubmitForm";
import TextareaField from "@/components/form/TextareaField";
import URLField from "@/components/form/URLField";

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
    URLField,
  },
  formComponents: {
    SubmitForm,
  },
});

export { useFieldContext, useFormContext, withForm };

export default useForm;
