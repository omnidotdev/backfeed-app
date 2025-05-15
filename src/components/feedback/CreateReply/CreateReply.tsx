"use client";

import { Collapsible, Stack, sigil } from "@omnidev/sigil";
import { useStore } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { z } from "zod";

import { CharacterLimit } from "components/core";
import {
  useCreateCommentMutation,
  useInfiniteCommentsQuery,
  useInfiniteRepliesQuery,
} from "generated/graphql";
import { token } from "generated/panda/tokens";
import { app } from "lib/config";
import { DEBOUNCE_TIME, uuidSchema } from "lib/constants";
import { useAuth, useForm } from "lib/hooks";
import { feedbackByIdOptions, freeTierCommentsOptions } from "lib/options";
import { toaster } from "lib/util";

import type { CollapsibleProps } from "@omnidev/sigil";
import type { Comment } from "generated/graphql";

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
  const queryClient = useQueryClient();

  const { user, isLoading: isAuthLoading } = useAuth();

  const { organizationSlug, projectSlug, feedbackId } = useParams<{
    organizationSlug: string;
    projectSlug: string;
    feedbackId: string;
  }>();

  const { mutateAsync: createReply, isPending } = useCreateCommentMutation({
    onMutate: () => onReply?.(),
    onSettled: async () => {
      reset();

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: useInfiniteCommentsQuery.getKey({
            feedbackId,
          }),
        }),
        queryClient.invalidateQueries(
          feedbackByIdOptions({
            rowId: feedbackId,
            userId: user?.rowId,
          }),
        ),
        queryClient.invalidateQueries(
          freeTierCommentsOptions({
            organizationSlug,
            projectSlug,
            feedbackId,
          }),
        ),
      ]);

      return queryClient.invalidateQueries({
        queryKey: useInfiniteRepliesQuery.getKey({
          commentId,
        }),
      });
    },
  });

  const { handleSubmit, AppField, AppForm, SubmitForm, reset, store } = useForm(
    {
      defaultValues: {
        postId: feedbackId,
        commentId,
        userId: user?.rowId ?? "",
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
                disabled={isAuthLoading || !canReply}
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
