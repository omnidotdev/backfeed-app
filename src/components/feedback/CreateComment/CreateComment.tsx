"use client";

import { Stack, sigil } from "@omnidev/sigil";
import { useStore } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { z } from "zod";

import { CharacterLimit } from "components/core";
import {
  useCreateCommentMutation,
  useFeedbackByIdQuery,
  useInfiniteCommentsQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { DEBOUNCE_TIME, uuidSchema } from "lib/constants";
import { useForm } from "lib/hooks";
import { freeTierCommentsOptions } from "lib/options";
import { toaster } from "lib/util";

import type { Session } from "next-auth";

const MAX_COMMENT_LENGTH = 500;

// TODO adjust schema in this file after closure on https://linear.app/omnidev/issue/OMNI-166/strategize-runtime-and-server-side-validation-approach and https://linear.app/omnidev/issue/OMNI-167/refine-validation-schemas

/** Schema for defining the shape of the create comment form fields, as well as validating the form. */
const createCommentSchema = z.object({
  postId: uuidSchema,
  userId: uuidSchema,
  message: z
    .string()
    .trim()
    .max(
      MAX_COMMENT_LENGTH,
      app.feedbackPage.comments.createComment.errors.maxLengthMessage,
    ),
});

interface Props {
  /** Authenticated user. */
  user: Session["user"] | undefined;
  /** Whether the user can create a comment. */
  canCreateComment: boolean;
}

/**
 * Create comment form.
 */
const CreateComment = ({ user, canCreateComment }: Props) => {
  const queryClient = useQueryClient();

  const { organizationSlug, projectSlug, feedbackId } = useParams<{
    organizationSlug: string;
    projectSlug: string;
    feedbackId: string;
  }>();

  const { mutateAsync: createComment, isPending } = useCreateCommentMutation({
    onSettled: async () => {
      reset();

      await Promise.all([
        queryClient.invalidateQueries(
          freeTierCommentsOptions({
            organizationSlug,
            projectSlug,
            feedbackId,
          }),
        ),
        queryClient.invalidateQueries({
          queryKey: useFeedbackByIdQuery.getKey({
            rowId: feedbackId,
            userId: user?.rowId,
          }),
        }),
      ]);

      return queryClient.invalidateQueries({
        queryKey: useInfiniteCommentsQuery.getKey({
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
            disabled={!user || !canCreateComment}
            tooltip={app.feedbackPage.comments.disabled}
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
            disabled={!user || !canCreateComment}
          />
        </AppForm>
      </Stack>
    </sigil.form>
  );
};

export default CreateComment;
