import { Stack, sigil } from "@omnidev/sigil";
import { useStore } from "@tanstack/react-form";
import { useParams, useRouteContext } from "@tanstack/react-router";
import { z } from "zod";

import CharacterLimit from "@/components/core/CharacterLimit";
import { useCreateCommentMutation } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import DEBOUNCE_TIME from "@/lib/constants/debounceTime.constant";
import { uuidSchema } from "@/lib/constants/schema.constant";
import useForm from "@/lib/hooks/useForm";
import {
  freeTierCommentsOptions,
  infiniteCommentsOptions,
} from "@/lib/options/comments";
import { feedbackByIdOptions } from "@/lib/options/feedback";
import toaster from "@/lib/util/toaster";

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
  /** Whether the user can create a comment. */
  canCreateComment: boolean;
}

/**
 * Create comment form.
 */
const CreateComment = ({ canCreateComment }: Props) => {
  const { session, queryClient } = useRouteContext({
    from: "/_auth/workspaces/$workspaceSlug/_layout/projects/$projectSlug/$feedbackId",
  });
  const { workspaceSlug, projectSlug, feedbackId } = useParams({
    from: "/_auth/workspaces/$workspaceSlug/_layout/projects/$projectSlug/$feedbackId",
  });

  const { mutateAsync: createComment, isPending } = useCreateCommentMutation({
    onSettled: async () => {
      reset();

      await Promise.all([
        queryClient.invalidateQueries(
          freeTierCommentsOptions({
            workspaceSlug,
            projectSlug,
            feedbackId,
          }),
        ),
        queryClient.invalidateQueries({
          queryKey: feedbackByIdOptions({
            rowId: feedbackId,
            userId: session?.user?.rowId,
          }).queryKey,
        }),
      ]);

      return queryClient.invalidateQueries({
        queryKey: infiniteCommentsOptions({
          feedbackId,
        }).queryKey,
      });
    },
  });

  const { handleSubmit, AppField, AppForm, SubmitForm, reset, store } = useForm(
    {
      defaultValues: {
        postId: feedbackId,
        userId: session?.user?.rowId ?? "",
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
            disabled={!session || !canCreateComment}
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
            disabled={!session || !canCreateComment}
          />
        </AppForm>
      </Stack>
    </sigil.form>
  );
};

export default CreateComment;
