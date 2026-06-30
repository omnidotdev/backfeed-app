import { RichTextEditor } from "@omnidotdev/thornberry/rich-text-editor";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { z } from "zod";

import CharacterLimit from "@/components/core/CharacterLimit";
import EditorHints from "@/components/feedback/EditorHints";
import {
  CollapsibleContent,
  CollapsibleRoot,
} from "@/components/ui/collapsible";
import { useCreateCommentMutation } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import DEBOUNCE_TIME from "@/lib/constants/debounceTime.constant";
import { uuidSchema } from "@/lib/constants/schema.constant";
import useForm from "@/lib/hooks/useForm";
import {
  freeTierCommentsOptions,
  infiniteCommentsOptions,
  infiniteRepliesOptions,
} from "@/lib/options/comments";
import { feedbackByIdOptions } from "@/lib/options/feedback";
import { projectIssueRefsOptions } from "@/lib/options/issueReferences";
import toaster from "@/lib/util/toaster";

import type {
  EditorApi,
  MentionItem,
} from "@omnidotdev/thornberry/rich-text-editor";
import type { ComponentProps } from "react";
import type { Comment } from "@/generated/graphql";

const MAX_COMMENT_LENGTH = 240;

const feedbackRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout/projects/$projectSlug/$feedbackId",
);

// TODO adjust schema in this file after closure on https://linear.app/omnidev/issue/OMNI-166/strategize-runtime-and-server-side-validation-approach and https://linear.app/omnidev/issue/OMNI-167/refine-validation-schemas

/** Schema for defining the shape of the create reply form fields, as well as validating the form. */
const createReplySchema = z.object({
  postId: uuidSchema,
  commentId: uuidSchema,
  userId: uuidSchema,
  // stored as rich-text HTML; plain-text length is enforced in the UI
  message: z.string(),
});

interface Props extends ComponentProps<typeof CollapsibleRoot> {
  /** Comment ID. */
  commentId: Comment["rowId"];
  /** Whether the user can reply to the comment. */
  canReply: boolean;
  /** Optional handler to apply when a reply is sent. */
  onReply?: () => void;
  /** Users offered in the `@`-mention typeahead (thread participants). */
  mentionableUsers?: MentionItem[];
}

/**
 * Create reply form.
 */
const CreateReply = ({
  commentId,
  canReply,
  onReply,
  mentionableUsers,
  ...rest
}: Props) => {
  const { projectSlug } = feedbackRoute.useParams();
  const { feedbackId } = feedbackRoute.useLoaderData();
  const { session, queryClient, organizationId } =
    feedbackRoute.useRouteContext();

  // posts in this project, offered in the `#`-reference typeahead
  const { data: issueReferenceItems } = useQuery(
    projectIssueRefsOptions({ projectSlug, organizationId }),
  );

  // editor is uncontrolled; track plain-text length for the limit + clearing
  const replyEditorApi = useRef<EditorApi | null>(null);
  const [messageLength, setMessageLength] = useState(0);

  const { mutateAsync: createReply, isPending } = useCreateCommentMutation({
    onMutate: () => onReply?.(),
    onSettled: async () => {
      reset();
      replyEditorApi.current?.clearContent();
      setMessageLength(0);

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: infiniteCommentsOptions({
            feedbackId,
          }).queryKey,
        }),
        queryClient.invalidateQueries({
          queryKey: feedbackByIdOptions({
            rowId: feedbackId,
            userId: session?.user?.rowId,
          }).queryKey,
        }),
        queryClient.invalidateQueries(
          freeTierCommentsOptions({
            organizationId,
            projectSlug,
            feedbackId,
          }),
        ),
      ]);

      return queryClient.invalidateQueries({
        queryKey: infiniteRepliesOptions({
          commentId,
        }).queryKey,
      });
    },
  });

  const { handleSubmit, AppField, AppForm, SubmitForm, reset } = useForm({
    defaultValues: {
      postId: feedbackId,
      commentId,
      userId: session?.user?.rowId ?? "",
      message: "",
    },
    asyncDebounceMs: DEBOUNCE_TIME,
    validators: {
      onSubmitAsync: createReplySchema,
    },
    onSubmit: async ({ value }) =>
      toaster.promise(
        createReply({
          input: {
            comment: {
              postId: value.postId,
              parentId: value.commentId,
              userId: value.userId,
              message: value.message.trim(),
            },
          },
        }),
        app.postPage.comments.createReply,
      ),
  });

  return (
    <CollapsibleRoot {...rest}>
      <CollapsibleContent>
        <div className="mt-2 flex flex-col rounded-sm border border-border-subtle transition-[box-shadow,border-color] focus-within:border-primary focus-within:ring-1 focus-within:ring-primary sm:ml-10">
          <form
            className="flex flex-col"
            onSubmit={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              await handleSubmit();
            }}
          >
            <AppField name="message">
              {(field) => (
                <RichTextEditor
                  editorApi={replyEditorApi}
                  placeholder={app.postPage.comments.textAreaPlaceholder}
                  editable={canReply}
                  mentionItems={mentionableUsers}
                  issueReferenceItems={issueReferenceItems}
                  className="rounded-none border-0 border-border-subtle border-b"
                  editorClassName="min-h-16"
                  onUpdate={({ getHTML, getText, isEmpty }) => {
                    field.handleChange(isEmpty ? "" : getHTML());
                    setMessageLength(getText().trim().length);
                  }}
                />
              )}
            </AppField>

            <div className="flex flex-row justify-between bg-background-subtle p-2 dark:bg-background-subtle/20">
              <div className="flex items-center gap-2">
                <CharacterLimit
                  value={messageLength}
                  max={MAX_COMMENT_LENGTH}
                  className="place-self-start"
                />
                <EditorHints />
              </div>

              <AppForm>
                <SubmitForm
                  action={app.postPage.comments.createReply.action}
                  size="sm"
                  isPending={isPending}
                  disabled={!canReply || messageLength > MAX_COMMENT_LENGTH}
                />
              </AppForm>
            </div>
          </form>
        </div>
      </CollapsibleContent>
    </CollapsibleRoot>
  );
};

export default CreateReply;
