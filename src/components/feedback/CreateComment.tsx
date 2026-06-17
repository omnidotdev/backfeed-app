import { getRouteApi } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { z } from "zod";

import CharacterLimit from "@/components/core/CharacterLimit";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
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

import type { EditorApi, MentionItem } from "@/components/ui/rich-text-editor";

const MAX_COMMENT_LENGTH = 500;

const feedbackRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout/projects/$projectSlug/$feedbackId",
);

// TODO adjust schema in this file after closure on https://linear.app/omnidev/issue/OMNI-166/strategize-runtime-and-server-side-validation-approach and https://linear.app/omnidev/issue/OMNI-167/refine-validation-schemas

/** Schema for defining the shape of the create comment form fields, as well as validating the form. */
const createCommentSchema = z.object({
  postId: uuidSchema,
  userId: uuidSchema,
  // stored as rich-text HTML; plain-text length is enforced in the UI
  message: z.string(),
});

interface Props {
  /** Whether the user can create a comment. */
  canCreateComment: boolean;
  /** Users offered in the `@`-mention typeahead (thread participants). */
  mentionableUsers?: MentionItem[];
}

/**
 * Create comment form.
 */
const CreateComment = ({ canCreateComment, mentionableUsers }: Props) => {
  const { session, queryClient, organizationId } =
    feedbackRoute.useRouteContext();
  const { projectSlug } = feedbackRoute.useParams();
  const { feedbackId } = feedbackRoute.useLoaderData();

  // editor is uncontrolled; track plain-text length for the limit + clearing
  const commentEditorApi = useRef<EditorApi | null>(null);
  const [messageLength, setMessageLength] = useState(0);

  const { mutateAsync: createComment, isPending } = useCreateCommentMutation({
    onSettled: async () => {
      reset();
      commentEditorApi.current?.clearContent();
      setMessageLength(0);

      await Promise.all([
        queryClient.invalidateQueries(
          freeTierCommentsOptions({
            organizationId,
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

  const { handleSubmit, AppField, AppForm, SubmitForm, reset } = useForm({
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
            title: app.postPage.comments.createComment.pending,
          },
          success: {
            title: app.postPage.comments.createComment.success.title,
            description:
              app.postPage.comments.createComment.success.description,
          },
          error: {
            title: app.postPage.comments.createComment.error.title,
            description: app.postPage.comments.createComment.error.description,
          },
        },
      ),
  });

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await handleSubmit();
      }}
    >
      <AppField name="message">
        {(field) => (
          <RichTextEditor
            editorApi={commentEditorApi}
            placeholder={app.postPage.comments.textAreaPlaceholder}
            editable={!!session && canCreateComment}
            editorClassName="min-h-16"
            mentionItems={mentionableUsers}
            onUpdate={({ getHTML, getText, isEmpty }) => {
              field.handleChange(isEmpty ? "" : getHTML());
              setMessageLength(getText().trim().length);
            }}
          />
        )}
      </AppField>

      <div className="flex flex-row justify-between gap-2">
        <CharacterLimit
          value={messageLength}
          max={MAX_COMMENT_LENGTH}
          className="place-self-start"
        />

        <AppForm>
          <SubmitForm
            action={app.postPage.comments.action}
            isPending={isPending}
            disabled={
              !session ||
              !canCreateComment ||
              messageLength > MAX_COMMENT_LENGTH
            }
          />
        </AppForm>
      </div>
    </form>
  );
};

export default CreateComment;
