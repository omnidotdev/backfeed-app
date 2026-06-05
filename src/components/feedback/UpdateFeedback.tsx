import { Portal } from "@ark-ui/react/portal";
import { useStore } from "@tanstack/react-form";
import { getRouteApi } from "@tanstack/react-router";
import { useState } from "react";
import { LuPencil } from "react-icons/lu";
import { useIsClient } from "usehooks-ts";
import { z } from "zod";

import CharacterLimit from "@/components/core/CharacterLimit";
import { Button } from "@/components/ui/button";
import {
  DialogBackdrop,
  DialogContent,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUpdatePostMutation } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import DEBOUNCE_TIME from "@/lib/constants/debounceTime.constant";
import useForm from "@/lib/hooks/useForm";
import { feedbackByIdOptions } from "@/lib/options/feedback";
import toaster from "@/lib/util/toaster";

import type { ComponentProps } from "react";
import type { FeedbackFragment } from "@/generated/graphql";

const MAX_DESCRIPTION_LENGTH = 500;

const workspaceLayoutRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout",
);

const updatePostDetails = app.projectPage.projectFeedback.updatePost;

// TODO adjust schema in this file after closure on https://linear.app/omnidev/issue/OMNI-166/strategize-runtime-and-server-side-validation-approach and https://linear.app/omnidev/issue/OMNI-167/refine-validation-schemas

/** Schema for defining the shape of the update feedback form fields, as well as validating the form. */
const updateFeedbackSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, updatePostDetails.errors.title.minLength)
    .max(90, updatePostDetails.errors.title.maxLength),
  description: z
    .string()
    .trim()
    .max(
      MAX_DESCRIPTION_LENGTH,
      updatePostDetails.errors.description.maxLength,
    ),
});

interface Props extends ComponentProps<typeof DialogRoot> {
  /** Feedback details. */
  feedback: Partial<FeedbackFragment>;
  /** Props for the dialog trigger button. */
  triggerProps?: ComponentProps<typeof Button>;
}

/**
 * Update feedback form.
 */
const UpdateFeedback = ({ feedback, triggerProps, ...rest }: Props) => {
  const { session, queryClient } = workspaceLayoutRoute.useRouteContext();

  const isClient = useIsClient();

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  const { mutateAsync: updateFeedback, isPending } = useUpdatePostMutation({
    onSettled: async () => {
      reset();

      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["Posts.infinite"],
        }),
        queryClient.invalidateQueries({
          queryKey: feedbackByIdOptions({
            rowId: feedback.rowId!,
            userId: session?.user?.rowId,
          }).queryKey,
        }),
      ]);
    },
    onSuccess: () => {
      reset();
      onClose();
    },
  });

  const { handleSubmit, AppField, AppForm, SubmitForm, reset, store } = useForm(
    {
      defaultValues: {
        title: feedback.title ?? "",
        description: feedback.description ?? "",
      },
      asyncDebounceMs: DEBOUNCE_TIME,
      validators: {
        onSubmitAsync: updateFeedbackSchema,
      },
      onSubmit: async ({ value }) =>
        toaster.promise(
          updateFeedback({
            rowId: feedback.rowId!,
            patch: {
              title: value.title,
              description: value.description,
              updatedAt: new Date(),
            },
          }),
          updatePostDetails.action,
        ),
    },
  );

  const descriptionLength = useStore(
    store,
    (store) => store.values.description.length,
  );

  if (!isClient) return null;

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={({ open }) => {
        reset();
        setIsOpen(open);
      }}
      {...rest}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="bg-transparent p-0"
          onClick={(evt) => evt.stopPropagation()}
          {...triggerProps}
        >
          <LuPencil className="size-[1.125rem] cursor-pointer text-[var(--colors-brand-senary)]" />
        </Button>
      </DialogTrigger>

      <Portal>
        <DialogBackdrop />
        {/* NB: `onClick` stops propagation as the dialog is scoped to an individual feedback card */}
        <DialogContent
          onClick={(evt) => evt.stopPropagation()}
          className="w-[calc(100vw-2rem)] max-w-[32rem] cursor-default sm:w-[28rem]"
        >
          <DialogTitle>Update Feedback</DialogTitle>

          <form
            className="flex flex-col gap-2"
            onSubmit={async (evt) => {
              evt.preventDefault();
              evt.stopPropagation();
              await handleSubmit();
            }}
          >
            <AppField name="title">
              {({ InputField }) => (
                <InputField
                  label={app.projectPage.projectFeedback.feedbackTitle.label}
                  placeholder={
                    app.projectPage.projectFeedback.feedbackTitle
                      .placeholders[0]
                  }
                  onClick={(evt) => {
                    evt.preventDefault();
                    evt.stopPropagation();
                  }}
                />
              )}
            </AppField>

            <AppField name="description">
              {({ TextareaField }) => (
                <TextareaField
                  label={
                    app.projectPage.projectFeedback.feedbackDescription.label
                  }
                  placeholder={
                    app.projectPage.projectFeedback.feedbackDescription
                      .placeholders[0]
                  }
                  rows={5}
                  className="min-h-32"
                  maxLength={MAX_DESCRIPTION_LENGTH}
                  onClick={(evt) => {
                    evt.preventDefault();
                    evt.stopPropagation();
                  }}
                />
              )}
            </AppField>

            <div className="flex flex-row justify-between">
              <CharacterLimit
                value={descriptionLength}
                max={MAX_DESCRIPTION_LENGTH}
                className="place-self-start"
              />

              <AppForm>
                <SubmitForm
                  action={updatePostDetails.action}
                  isPending={isPending}
                  className="w-fit place-self-end"
                  onClick={(evt) => evt.stopPropagation()}
                />
              </AppForm>
            </div>
          </form>
        </DialogContent>
      </Portal>
    </DialogRoot>
  );
};

export default UpdateFeedback;
