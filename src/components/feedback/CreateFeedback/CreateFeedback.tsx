"use client";

import {
  Button,
  Input,
  Label,
  Skeleton,
  Stack,
  Text,
  Textarea,
  sigil,
} from "@omnidev/sigil";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { z } from "zod";

import { FormFieldError } from "components/core";
import {
  useCreateFeedbackMutation,
  useInfinitePostsQuery,
  useProjectQuery,
} from "generated/graphql";
import { app } from "lib/config";
import {
  CREATE_FEEDBACK_MUTATION_KEY,
  standardSchemaValidator,
} from "lib/constants";
import { useAuth } from "lib/hooks";

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
    .min(3, app.projectPage.projectFeedback.createFeedback.errors.title),
  description: z
    .string()
    .min(10, app.projectPage.projectFeedback.createFeedback.errors.description),
});

interface Props {
  /** Loading state for current feedback. */
  isLoading: boolean;
  /** Error state for current feedback. */
  isError: boolean;
  /** Total feedback for the project. */
  totalCount: number;
}

/**
 * Create feedback form.
 */
const CreateFeedback = ({ isLoading, isError, totalCount }: Props) => {
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

  const { mutate: createFeedback, isPending } = useCreateFeedbackMutation({
    mutationKey: CREATE_FEEDBACK_MUTATION_KEY,
    onSuccess: () => {
      reset();

      return queryClient.invalidateQueries(
        {
          queryKey: useInfinitePostsQuery.getKey({
            pageSize: 5,
            projectId: projectId!,
          }),
        },
        { cancelRefetch: false }
      );
    },
  });

  const { handleSubmit, Field, Subscribe, reset } = useForm({
    defaultValues: {
      projectId: projectId ?? "",
      userId: user?.rowId ?? "",
      title: "",
      description: "",
    },
    asyncDebounceMs: 300,
    validatorAdapter: standardSchemaValidator,
    validators: {
      onMount: createFeedbackSchema,
      onChangeAsync: createFeedbackSchema,
    },
    onSubmit: ({ value }) =>
      createFeedback({
        input: {
          post: {
            projectId: value.projectId,
            userId: value.userId,
            title: value.title,
            description: value.description,
          },
        },
      }),
  });

  const isFormDisabled = isProjectLoading || isAuthLoading;

  return (
    <sigil.form
      display="flex"
      flexDirection="column"
      gap={4}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
      }}
    >
      <Field
        name="title"
        validators={{
          onBlur: createFeedbackSchema.shape.title,
        }}
      >
        {({ handleChange, handleBlur, state }) => (
          <Stack position="relative" gap={1.5}>
            <Label htmlFor="title">
              {app.projectPage.projectFeedback.feedbackTitle.label}
            </Label>

            <Input
              id="title"
              placeholder={
                app.projectPage.projectFeedback.feedbackTitle.placeholder
              }
              borderColor="border.subtle"
              value={state.value}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              disabled={isFormDisabled}
            />

            <FormFieldError
              error={state.meta.errorMap.onBlur}
              isDirty={state.meta.isDirty}
            />
          </Stack>
        )}
      </Field>

      <Field
        name="description"
        validators={{
          onBlur: createFeedbackSchema.shape.description,
        }}
      >
        {({ handleChange, handleBlur, state }) => (
          <Stack position="relative" gap={1.5}>
            <Label htmlFor="description">
              {app.projectPage.projectFeedback.feedbackDescription.label}
            </Label>

            <Textarea
              id="description"
              placeholder={
                app.projectPage.projectFeedback.feedbackDescription.placeholder
              }
              borderColor="border.subtle"
              rows={5}
              minH={32}
              value={state.value}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              disabled={isFormDisabled}
            />

            <FormFieldError
              error={state.meta.errorMap.onBlur}
              isDirty={state.meta.isDirty}
            />
          </Stack>
        )}
      </Field>

      <Stack justify="space-between" direction="row">
        <Skeleton isLoaded={!isLoading} h="fit-content">
          <Text
            fontSize="sm"
            color="foreground.muted"
          >{`${isError ? 0 : totalCount} ${app.projectPage.projectFeedback.totalResponses}`}</Text>
        </Skeleton>

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
