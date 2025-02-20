"use client";

import { Button, Stack, Textarea, sigil } from "@omnidev/sigil";
import { useForm, useStore } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { z } from "zod";

import { CharacterLimit, FormFieldError } from "components/core";
import {
  useCreateCommentMutation,
  useInfiniteCommentsQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { standardSchemaValidator, toaster } from "lib/constants";
import { useAuth } from "lib/hooks";
import { useMemo } from "react";
import { match } from "ts-pattern";

const MAX_COMMENT_LENGTH = 500;

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

  const { handleSubmit, Field, Subscribe, reset, store } = useForm({
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

  const messageLength = useStore(store, (store) => store.values.message.length);

  const characterLimitColor = useMemo(
    () =>
      match(messageLength / MAX_COMMENT_LENGTH)
        .when(
          (value) => value > 0.9,
          () => "red"
        )
        .when(
          (value) => value > 0.7,
          () => "yellow"
        )
        .otherwise(() => "foreground.muted"),
    [messageLength]
  );

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
              maxLength={MAX_COMMENT_LENGTH}
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
        <CharacterLimit
          value={messageLength}
          max={MAX_COMMENT_LENGTH}
          placeSelf="flex-start"
        />

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
