"use client";

import { Button, Stack, Text, Textarea, sigil } from "@omnidev/sigil";
import { useForm } from "@tanstack/react-form";
import { useIsMutating, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { z } from "zod";

import { FormFieldError } from "components/core";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useInfiniteCommentsQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { standardSchemaValidator, toaster } from "lib/constants";
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
    .trim()
    .min(10, app.feedbackPage.comments.createComment.errors.message),
});

interface Props {
  /** Total number of comments. */
  totalCount: number;
}

/**
 * Create comment form.
 */
const CreateComment = ({ totalCount }: Props) => {
  const queryClient = useQueryClient();

  const { user, isLoading: isAuthLoading } = useAuth();

  const { feedbackId } = useParams<{ feedbackId: string }>();

  const pendingDeletedComments = useIsMutating({
    mutationKey: useDeleteCommentMutation.getKey(),
  });

  const { mutateAsync: createComment, isPending } = useCreateCommentMutation({
    onSuccess: () => {
      reset();

      return queryClient.invalidateQueries(
        {
          queryKey: useInfiniteCommentsQuery.getKey({
            pageSize: 5,
            feedbackId,
          }),
        },
        { cancelRefetch: false }
      );
    },
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
      onChange: createCommentSchema,
      onSubmitAsync: createCommentSchema,
    },
    onSubmit: async ({ value }) =>
      toaster.promise(
        createComment({
          input: {
            comment: {
              postId: value.postId,
              userId: value.userId,
              message: value.message.trim(),
            },
          },
        }),
        {
          loading: {
            title: app.feedbackPage.comments.createComment.pending,
          },
          success: {
            title: app.feedbackPage.comments.createComment.success.title,
            description:
              app.feedbackPage.comments.createComment.success.description,
          },
          error: {
            title: app.feedbackPage.comments.createComment.error.title,
            description:
              app.feedbackPage.comments.createComment.error.description,
          },
        }
      ),
  });

  const totalComments =
    totalCount - pendingDeletedComments + (isPending ? 1 : 0);

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
      <Field name="message">
        {({ handleChange, state }) => (
          <Stack position="relative" gap={1.5}>
            <Textarea
              placeholder={app.feedbackPage.comments.textAreaPlaceholder}
              borderColor="border.subtle"
              fontSize="sm"
              minH={16}
              value={state.value}
              onChange={(e) => handleChange(e.target.value)}
              disabled={isAuthLoading}
            />

            <FormFieldError
              error={state.meta.errorMap.onSubmit}
              isDirty={state.meta.isDirty}
              top={-6}
            />
          </Stack>
        )}
      </Field>

      <Stack justify="space-between" direction="row">
        <Text fontSize="sm" color="foreground.muted">
          {`${totalComments} ${app.feedbackPage.comments.totalComments}`}
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
              disabled={!canSubmit || !isDirty || isSubmitting || isPending}
            >
              {app.feedbackPage.comments.submit}
            </Button>
          )}
        </Subscribe>
      </Stack>
    </sigil.form>
  );
};

export default CreateComment;
