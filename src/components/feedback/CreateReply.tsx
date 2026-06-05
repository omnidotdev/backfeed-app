import { useStore } from "@tanstack/react-form";
import { getRouteApi } from "@tanstack/react-router";
import { z } from "zod";

import CharacterLimit from "@/components/core/CharacterLimit";
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
import toaster from "@/lib/util/toaster";

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
  message: z
    .string()
    .trim()
    .max(
      MAX_COMMENT_LENGTH,
      app.postPage.comments.createReply.errors.maxLengthMessage,
    ),
});

interface Props extends ComponentProps<typeof CollapsibleRoot> {
  /** Comment ID. */
  commentId: Comment["rowId"];
  /** Whether the user can reply to the comment. */
  canReply: boolean;
  /** Optional handler to apply when a reply is sent. */
  onReply?: () => void;
}

/**
 * Create reply form.
 */
const CreateReply = ({ commentId, canReply, onReply, ...rest }: Props) => {
  const { projectSlug, feedbackId } = feedbackRoute.useParams();
  const { session, queryClient, organizationId } =
    feedbackRoute.useRouteContext();

  const { mutateAsync: createReply, isPending } = useCreateCommentMutation({
    onMutate: () => onReply?.(),
    onSettled: async () => {
      reset();

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

  const { handleSubmit, AppField, AppForm, SubmitForm, reset, store } = useForm(
    {
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
    },
  );

  const messageLength = useStore(store, (store) => store.values.message.length);

  return (
    <CollapsibleRoot {...rest}>
      <CollapsibleContent>
        <div className="mt-2 flex flex-col rounded-sm border border-border-subtle transition-[box-shadow,border-color] focus-within:border-accent focus-within:ring-1 focus-within:ring-accent sm:ml-10">
          <form
            className="flex flex-col"
            onSubmit={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              await handleSubmit();
            }}
          >
            <AppField name="message">
              {({ TextareaField }) => (
                <TextareaField
                  placeholder={app.postPage.comments.textAreaPlaceholder}
                  className="min-h-16 rounded-none border-0 border-b border-border-subtle text-sm shadow-none focus-visible:ring-0"
                  disabled={!canReply}
                  maxLength={MAX_COMMENT_LENGTH}
                  errorProps={{
                    className: "top-[-1.5rem]",
                  }}
                />
              )}
            </AppField>

            <div className="flex flex-row justify-between bg-background-subtle p-2 dark:bg-background-subtle/20">
              <CharacterLimit
                value={messageLength}
                max={MAX_COMMENT_LENGTH}
                className="place-self-start"
              />

              <AppForm>
                <SubmitForm
                  action={app.postPage.comments.createReply.action}
                  size="sm"
                  isPending={isPending}
                  disabled={!canReply}
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
