"use client";

import { Button, Input, Label, Stack, Textarea, sigil } from "@omnidev/sigil";
import { useForm, useStore } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { z } from "zod";

import { CharacterLimit, FormFieldError } from "components/core";
import {
  useCreateFeedbackMutation,
  useInfinitePostsQuery,
  useProjectQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { standardSchemaValidator, toaster } from "lib/constants";
import { useAuth } from "lib/hooks";

const MAX_DESCRIPTION_LENGTH = 240;

// TODO adjust schema in this file after closure on https://linear.app/omnidev/issue/OMNI-166/strategize-runtime-and-server-side-validation-approach and https://linear.app/omnidev/issue/OMNI-167/refine-validation-schemas

/** Schema for defining the shape of the create feedback form fields, as well as validating the form. */
const createFeedbackSchema = z.object({
  projectId: z
    .string()
    .uuid(app.projectPage.projectFeedback.createFeedback.errors.invalid),
  userId: z
    .string()
    .uuid(app.projectPage.projectFeedback.createFeedback.errors.invalid),
  title: z
    .string()
    .trim()
    .min(3, app.projectPage.projectFeedback.createFeedback.errors.title),
  description: z
    .string()
    .trim()
    .min(10, app.projectPage.projectFeedback.createFeedback.errors.description),
});

/**
 * Create feedback form.
 */
const CreateFeedback = () => {
  const queryClient = useQueryClient();

  const { organizationSlug, projectSlug } = useParams<{
    organizationSlug: string;
    projectSlug: string;
  }>();

  const { user, isLoading: isAuthLoading } = useAuth();

  const { data: projectId, isLoading: isProjectLoading } = useProjectQuery(
    {
      projectSlug,
      organizationSlug,
    },
    {
      enabled: !!projectSlug && !!organizationSlug,
      select: (data) => data?.projects?.nodes?.[0]?.rowId,
    }
  );

  const { mutateAsync: createFeedback, isPending } = useCreateFeedbackMutation({
    onSettled: () => {
      reset();

      return queryClient.invalidateQueries({
        queryKey: useInfinitePostsQuery.getKey({
          pageSize: 5,
          projectId: projectId!,
        }),
      });
    },
  });

  const { handleSubmit, Field, Subscribe, reset, store } = useForm({
    defaultValues: {
      projectId: projectId ?? "",
      userId: user?.rowId ?? "",
      title: "",
      description: "",
    },
    asyncDebounceMs: 300,
    validatorAdapter: standardSchemaValidator,
    validators: {
      onChange: createFeedbackSchema,
      onSubmitAsync: createFeedbackSchema,
    },
    onSubmit: async ({ value }) =>
      toaster.promise(
        createFeedback({
          input: {
            post: {
              projectId: value.projectId,
              userId: value.userId,
              title: value.title.trim(),
              description: value.description.trim(),
            },
          },
        }),
        {
          loading: {
            title: app.projectPage.projectFeedback.action.pending,
          },
          success: {
            title: app.projectPage.projectFeedback.action.success.title,
            description:
              app.projectPage.projectFeedback.action.success.description,
          },
          error: {
            title: app.projectPage.projectFeedback.action.error.title,
            description:
              app.projectPage.projectFeedback.action.error.description,
          },
        }
      ),
  });

  const descriptionLength = useStore(
    store,
    (store) => store.values.description.length
  );

  const isFormDisabled = isProjectLoading || isAuthLoading;

  return (
    <sigil.form
      display="flex"
      flexDirection="column"
      gap={2}
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await handleSubmit();
      }}
    >
      <Field name="title">
        {({ handleChange, state, name }) => (
          <Stack position="relative" gap={1.5}>
            <Label htmlFor={name}>
              {app.projectPage.projectFeedback.feedbackTitle.label}
            </Label>

            <Input
              id={name}
              placeholder={
                app.projectPage.projectFeedback.feedbackTitle.placeholder
              }
              borderColor="border.subtle"
              value={state.value}
              onChange={(e) => handleChange(e.target.value)}
              disabled={isFormDisabled}
            />

            <FormFieldError
              error={state.meta.errorMap.onSubmit}
              isDirty={state.meta.isDirty}
            />
          </Stack>
        )}
      </Field>

      <Field name="description">
        {({ handleChange, state, name }) => (
          <Stack position="relative" gap={1.5}>
            <Label htmlFor={name}>
              {app.projectPage.projectFeedback.feedbackDescription.label}
            </Label>

            <Textarea
              id={name}
              placeholder={
                app.projectPage.projectFeedback.feedbackDescription.placeholder
              }
              borderColor="border.subtle"
              rows={5}
              minH={32}
              value={state.value}
              onChange={(e) => handleChange(e.target.value)}
              disabled={isFormDisabled}
              maxLength={MAX_DESCRIPTION_LENGTH}
            />

            <FormFieldError
              error={state.meta.errorMap.onSubmit}
              isDirty={state.meta.isDirty}
            />
          </Stack>
        )}
      </Field>

      <Stack justify="space-between" direction="row">
        <CharacterLimit
          value={descriptionLength}
          max={MAX_DESCRIPTION_LENGTH}
          placeSelf="flex-start"
        />

        <Subscribe
          selector={(state) => [
            state.canSubmit,
            state.isSubmitting,
            state.isDirty,
          ]}
        >
          {([canSubmit, isSubmitting, isDirty]) => (
            <Button
              type="submit"
              w="fit-content"
              placeSelf="flex-end"
              disabled={!canSubmit || !isDirty || isPending}
            >
              {isSubmitting || isPending
                ? app.projectPage.projectFeedback.action.pending
                : app.projectPage.projectFeedback.action.submit}
            </Button>
          )}
        </Subscribe>
      </Stack>
    </sigil.form>
  );
};

export default CreateFeedback;
