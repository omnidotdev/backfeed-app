import { Collapsible, Stack, sigil } from "@omnidev/sigil";
import { useStore } from "@tanstack/react-form";
import { useParams, useRouteContext } from "@tanstack/react-router";
import { z } from "zod";

import CharacterLimit from "@/components/core/CharacterLimit";
import { useCreateCommentMutation } from "@/generated/graphql";
import { token } from "@/generated/panda/tokens";
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

import type { CollapsibleProps } from "@omnidev/sigil";
import type { Comment } from "@/generated/graphql";

const MAX_COMMENT_LENGTH = 240;

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
      app.feedbackPage.comments.createReply.errors.maxLengthMessage,
    ),
});

interface Props extends CollapsibleProps {
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
  const { projectSlug, feedbackId } = useParams({
    from: "/_public/workspaces/$workspaceSlug/_layout/projects/$projectSlug/$feedbackId",
  });
  const { session, queryClient, organizationId } = useRouteContext({
    from: "/_public/workspaces/$workspaceSlug/_layout/projects/$projectSlug/$feedbackId",
  });

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
            workspaceOrganizationId: organizationId,
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
          app.feedbackPage.comments.createReply,
        ),
    },
  );

  const messageLength = useStore(store, (store) => store.values.message.length);

  return (
    <Collapsible {...rest}>
      <Stack
        mt={2}
        ml={{ sm: 10 }}
        borderWidth="1px"
        borderRadius="sm"
        borderColor="border.subtle"
        transitionDuration="normal"
        transitionProperty="box-shadow, border-color"
        transitionTimingFunction="default"
        _focusWithin={{
          borderColor: "accent.default",
          boxShadow: `0 0 0 1px ${token("colors.accent.default")}`,
        }}
      >
        <sigil.form
          display="flex"
          flexDirection="column"
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
                borderWidth={0}
                borderBottomWidth="1px"
                borderRadius="none"
                _focus={{
                  borderColor: "transparent",
                  borderBottomColor: "border.subtle",
                  boxShadow: "none",
                }}
                disabled={!canReply}
                maxLength={MAX_COMMENT_LENGTH}
                errorProps={{
                  top: -6,
                }}
              />
            )}
          </AppField>

          <Stack
            justify="space-between"
            direction="row"
            p={2}
            bgColor={{
              base: "background.subtle",
              _dark: "background.subtle/20",
            }}
          >
            <CharacterLimit
              value={messageLength}
              max={MAX_COMMENT_LENGTH}
              placeSelf="flex-start"
            />

            <AppForm>
              <SubmitForm
                action={app.feedbackPage.comments.createReply.action}
                size="sm"
                isPending={isPending}
                disabled={!canReply}
              />
            </AppForm>
          </Stack>
        </sigil.form>
      </Stack>
    </Collapsible>
  );
};

export default CreateReply;
