"use client";

import { Button, Stack, Text, Textarea, sigil } from "@omnidev/sigil";
import { useForm } from "@tanstack/react-form";
import { useParams } from "next/navigation";
import { z } from "zod";

import { FormFieldError } from "components/core";
import { useCreateCommentMutation } from "generated/graphql";
import { app } from "lib/config";
import { standardSchemaValidator } from "lib/constants";
import { useAuth } from "lib/hooks";

// TODO adjust schema in this file after closure on https://linear.app/omnidev/issue/OMNI-166/strategize-runtime-and-server-side-validation-approach and https://linear.app/omnidev/issue/OMNI-167/refine-validation-schemas

/** Schema for defining the shape of the create comment form fields, as well as validating the form. */
const createCommentSchema = z.object({
  postId: z
    .string()
    .uuid(app.feedbackPage.comments.createComment.errors.invalid),
  userId: z
    .string()
    .uuid(app.feedbackPage.comments.createComment.errors.invalid),
  message: z
    .string()
    .min(10, app.feedbackPage.comments.createComment.errors.message),
});

interface Props {
  /** Total number of comments. */
  totalCount: number;
}

/**
 * Comment form.
 */
const CommentForm = ({ totalCount }: Props) => {
  const { user, isLoading: isAuthLoading } = useAuth();

  const { feedbackId } = useParams<{ feedbackId: string }>();

  const { mutate: createComment } = useCreateCommentMutation({
    onSuccess: () => reset(),
  });

  const { handleSubmit, Field, Subscribe, reset } = useForm({
    defaultValues: {
      postId: feedbackId,
      userId: user?.rowId ?? "",
      message: "",
    },
    asyncDebounceMs: 300,
    validatorAdapter: standardSchemaValidator,
    validators: {
      onMount: createCommentSchema,
      onChangeAsync: createCommentSchema,
    },
    onSubmit: ({ value }) =>
      createComment({
        input: {
          comment: {
            postId: value.postId,
            userId: value.userId,
            message: value.message,
          },
        },
      }),
  });

  const isFormDisabled = isAuthLoading;

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
      <Field
        name="message"
        validators={{
          onBlur: createCommentSchema.shape.message,
        }}
      >
        {({ handleChange, handleBlur, state }) => (
          <Stack position="relative" gap={1.5}>
            <Textarea
              placeholder={app.feedbackPage.comments.textAreaPlaceholder}
              borderColor="border.subtle"
              fontSize="sm"
              minH={16}
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
        <Text fontSize="sm" color="foreground.muted">
          {`${totalCount} ${app.feedbackPage.comments.totalComments}`}
        </Text>

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
              disabled={!canSubmit || !isDirty || isSubmitting}
            >
              {app.feedbackPage.comments.submit}
            </Button>
          )}
        </Subscribe>
      </Stack>
    </sigil.form>
  );
};

export default CommentForm;
