import {
  Button,
  Dialog,
  Icon,
  Stack,
  sigil,
  useDisclosure,
} from "@omnidev/sigil";
import { useStore } from "@tanstack/react-form";
import { useRouteContext } from "@tanstack/react-router";
import { FiEdit } from "react-icons/fi";
import { useIsClient } from "usehooks-ts";
import { z } from "zod";

import CharacterLimit from "@/components/core/CharacterLimit";
import { useUpdatePostMutation } from "@/generated/graphql";
import { token } from "@/generated/panda/tokens";
import app from "@/lib/config/app.config";
import DEBOUNCE_TIME from "@/lib/constants/debounceTime.constant";
import useForm from "@/lib/hooks/useForm";
import useViewportSize from "@/lib/hooks/useViewportSize";
import { feedbackByIdOptions } from "@/lib/options/feedback";
import toaster from "@/lib/util/toaster";

import type { DialogProps } from "@omnidev/sigil";
import type { FeedbackFragment } from "@/generated/graphql";

const MAX_DESCRIPTION_LENGTH = 500;

const updateFeedbackDetails = app.projectPage.projectFeedback.updateFeedback;

// TODO adjust schema in this file after closure on https://linear.app/omnidev/issue/OMNI-166/strategize-runtime-and-server-side-validation-approach and https://linear.app/omnidev/issue/OMNI-167/refine-validation-schemas

/** Schema for defining the shape of the update feedback form fields, as well as validating the form. */
const updateFeedbackSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, updateFeedbackDetails.errors.title.minLength)
    .max(90, updateFeedbackDetails.errors.title.maxLength),
  description: z
    .string()
    .trim()
    .min(10, updateFeedbackDetails.errors.description.minLength)
    .max(
      MAX_DESCRIPTION_LENGTH,
      updateFeedbackDetails.errors.description.maxLength,
    ),
});

interface Props extends DialogProps {
  /** Feedback details. */
  feedback: Partial<FeedbackFragment>;
}

/**
 * Update feedback form.
 */
const UpdateFeedback = ({ feedback, ...rest }: Props) => {
  const { session, queryClient } = useRouteContext({
    from: "/_auth/organizations/$organizationSlug/_layout",
  });

  const isClient = useIsClient();

  const isSmallViewport = useViewportSize({
    minWidth: token("breakpoints.sm"),
  });

  const { isOpen, onClose, onToggle } = useDisclosure();

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
          updateFeedbackDetails.action,
        ),
    },
  );

  const descriptionLength = useStore(
    store,
    (store) => store.values.description.length,
  );

  if (!isClient) return null;

  return (
    <Dialog
      title="Update Feedback"
      open={isOpen}
      onOpenChange={() => {
        reset();
        onToggle();
      }}
      trigger={
        <Button variant="ghost" bgColor="transparent" p={0}>
          <Icon
            cursor="pointer"
            color="brand.senary"
            src={FiEdit}
            h={4.5}
            w={4.5}
          />
        </Button>
      }
      triggerProps={{
        disabled: feedback.rowId === "pending",
        onClick: (evt) => evt.stopPropagation(),
      }}
      contentProps={{
        // NB: `onClick` and `cursor` are to change behavior due to render of dialog being scope to an individual feedback card.
        onClick: (evt) => evt.stopPropagation(),
        style: {
          // TODO: adjust minW upstream in Sigil for mobile viewports
          minWidth: isSmallViewport ? token("sizes.md") : "80%",
          cursor: "default",
        },
      }}
      {...rest}
    >
      <sigil.form
        display="flex"
        flexDirection="column"
        gap={2}
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
                app.projectPage.projectFeedback.feedbackTitle.placeholder
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
              label={app.projectPage.projectFeedback.feedbackDescription.label}
              placeholder={
                app.projectPage.projectFeedback.feedbackDescription.placeholder
              }
              rows={5}
              minH={32}
              maxLength={MAX_DESCRIPTION_LENGTH}
              onClick={(evt) => {
                evt.preventDefault();
                evt.stopPropagation();
              }}
            />
          )}
        </AppField>

        <Stack justify="space-between" direction="row">
          <CharacterLimit
            value={descriptionLength}
            max={MAX_DESCRIPTION_LENGTH}
            placeSelf="flex-start"
          />

          <AppForm>
            <SubmitForm
              action={updateFeedbackDetails.action}
              isPending={isPending}
              w="fit-content"
              placeSelf="flex-end"
              onClick={(evt) => evt.stopPropagation()}
            />
          </AppForm>
        </Stack>
      </sigil.form>
    </Dialog>
  );
};

export default UpdateFeedback;
