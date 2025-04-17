"use client";

import { Stack, sigil } from "@omnidev/sigil";
import { useStore } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { z } from "zod";

import { CharacterLimit } from "components/core";
import {
  useCreateCommentMutation,
  useInfiniteCommentsQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { DEBOUNCE_TIME, uuidSchema } from "lib/constants";
import { useAuth, useForm } from "lib/hooks";
import { toaster } from "lib/util";

const MAX_COMMENT_LENGTH = 500;

// TODO adjust schema in this file after closure on https://linear.app/omnidev/issue/OMNI-166/strategize-runtime-and-server-side-validation-approach and https://linear.app/omnidev/issue/OMNI-167/refine-validation-schemas

/** Schema for defining the shape of the create comment form fields, as well as validating the form. */
const createCommentSchema = z.object({
  postId: uuidSchema,
  userId: uuidSchema,
  message: z
    .string()
    .trim()
    .min(10, app.feedbackPage.comments.createComment.errors.minLengthMessage)
    .max(
      MAX_COMMENT_LENGTH,
      app.feedbackPage.comments.createComment.errors.maxLengthMessage
    ),
});

/**
 * Create comment form.
 */
const CreateComment = () => {
  const queryClient = useQueryClient();

  const { user, isLoading: isAuthLoading } = useAuth();

  const { feedbackId } = useParams<{ feedbackId: string }>();

  const { mutateAsync: createComment, isPending } = useCreateCommentMutation({
    onSettled: () => {
      reset();

      return queryClient.invalidateQueries({
        queryKey: useInfiniteCommentsQuery.getKey({
          pageSize: 5,
          feedbackId,
        }),
      });
    },
  });

  const { handleSubmit, AppField, AppForm, SubmitForm, reset, store } = useForm(
    {
      defaultValues: {
        postId: feedbackId,
        userId: user?.rowId ?? "",
        message: "",
      },
      asyncDebounceMs: DEBOUNCE_TIME,
      validators: {
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
          },
        ),
    },
  );

  const messageLength = useStore(store, (store) => store.values.message.length);

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
      <AppField name="message">
        {({ TextareaField }) => (
          <TextareaField
            placeholder={app.feedbackPage.comments.textAreaPlaceholder}
            fontSize="sm"
            minH={16}
            disabled={isAuthLoading}
            maxLength={MAX_COMMENT_LENGTH}
            errorProps={{
              top: -6,
            }}
          />
        )}
      </AppField>

      <Stack justify="space-between" direction="row">
        <CharacterLimit
          value={messageLength}
          max={MAX_COMMENT_LENGTH}
          placeSelf="flex-start"
        />

        <AppForm>
          <SubmitForm
            action={app.feedbackPage.comments.action}
            isPending={isPending}
          />
        </AppForm>
      </Stack>
    </sigil.form>
  );
};

export default CreateComment;
