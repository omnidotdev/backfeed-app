import { Portal } from "@ark-ui/react/portal";
import { RichTextEditor } from "@omnidotdev/thornberry/rich-text-editor";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { LuPencil, LuX } from "react-icons/lu";
import { useIsClient } from "usehooks-ts";
import { z } from "zod";

import CharacterLimit from "@/components/core/CharacterLimit";
import AttachmentUploader from "@/components/feedback/AttachmentUploader";
import PostTags from "@/components/feedback/PostTags";
import { Button } from "@/components/ui/button";
import {
  DialogBackdrop,
  DialogContent,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  useCreateAttachmentMutation,
  useDeleteAttachmentMutation,
  useUpdatePostMutation,
} from "@/generated/graphql";
import app from "@/lib/config/app.config";
import DEBOUNCE_TIME from "@/lib/constants/debounceTime.constant";
import useForm from "@/lib/hooks/useForm";
import useMentionableUsers from "@/lib/hooks/useMentionableUsers";
import { feedbackByIdOptions } from "@/lib/options/feedback";
import { projectIssueRefsOptions } from "@/lib/options/issueReferences";
import { projectParticipantsOptions } from "@/lib/options/mentionableUsers";
import toaster from "@/lib/util/toaster";

import type { EditorApi } from "@omnidotdev/thornberry/rich-text-editor";
import type { ComponentProps } from "react";
import type { UploadedAttachment } from "@/components/feedback/AttachmentUploader";
import type { AttachmentFragment, FeedbackFragment } from "@/generated/graphql";

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
  // stored as rich-text HTML; the plain-text length is enforced in the UI
  description: z.string(),
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

  // posts in this project, offered in the `#`-reference typeahead
  const { data: issueReferenceItems } = useQuery(
    projectIssueRefsOptions({
      projectSlug: feedback.project?.slug ?? "",
      organizationId: feedback.project?.organizationId ?? "",
    }),
  );

  // project participants, offered in the `@`-mention typeahead
  const { data: projectParticipants } = useQuery(
    projectParticipantsOptions({ projectId: feedback.project?.rowId }),
  );
  const mentionItems = useMentionableUsers(projectParticipants);

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  // existing attachments are removed immediately via the delete mutation; new
  // uploads are linked to the post on submit. `uploaderKey` remounts the uploader
  // to clear its previews/state when the dialog is reopened
  const [existingAttachments, setExistingAttachments] = useState<
    AttachmentFragment[]
  >(
    (feedback.attachments?.nodes ?? []).filter(
      (node): node is AttachmentFragment => node != null,
    ),
  );
  const [newAttachments, setNewAttachments] = useState<UploadedAttachment[]>(
    [],
  );
  const [isUploadingAttachments, setIsUploadingAttachments] = useState(false);
  const [uploaderKey, setUploaderKey] = useState(0);

  const { mutateAsync: createAttachment } = useCreateAttachmentMutation();

  const { mutate: deleteAttachment } = useDeleteAttachmentMutation({
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: feedbackByIdOptions({
          rowId: feedback.rowId!,
          userId: session?.user?.rowId,
        }).queryKey,
      }),
  });

  const removeExistingAttachment = (rowId: string) => {
    setExistingAttachments((prev) => prev.filter((a) => a.rowId !== rowId));
    deleteAttachment({ input: { rowId } });
  };

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

  const { handleSubmit, AppField, AppForm, SubmitForm, reset } = useForm({
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
        }).then(async () => {
          // link any newly uploaded attachments to the post
          const userId = session?.user?.rowId;
          if (userId && newAttachments.length) {
            await Promise.all(
              newAttachments.map((attachment) =>
                createAttachment({
                  input: {
                    attachment: {
                      postId: feedback.rowId!,
                      userId,
                      url: attachment.url,
                      storageKey: attachment.storageKey,
                      mimeType: attachment.mimeType,
                      fileSize: attachment.fileSize,
                      kind: attachment.kind,
                      ...(attachment.width != null && {
                        width: attachment.width,
                      }),
                      ...(attachment.height != null && {
                        height: attachment.height,
                      }),
                    },
                  },
                }),
              ),
            );
            setNewAttachments([]);
            setUploaderKey((key) => key + 1);
          }
        }),
        updatePostDetails.action,
      ),
  });

  // editor is uncontrolled; track plain-text length for the limit
  const descriptionEditorApi = useRef<EditorApi | null>(null);
  const [descriptionLength, setDescriptionLength] = useState(0);

  if (!isClient) return null;

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={({ open }) => {
        reset();
        // re-sync attachment editing state to the post's current attachments
        setExistingAttachments(
          (feedback.attachments?.nodes ?? []).filter(
            (node): node is AttachmentFragment => node != null,
          ),
        );
        setNewAttachments([]);
        setUploaderKey((key) => key + 1);
        setIsOpen(open);
      }}
      {...rest}
    >
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Edit feedback"
          className="size-8 text-muted-foreground hover:text-foreground"
          onClick={(evt) => evt.stopPropagation()}
          {...triggerProps}
        >
          <LuPencil className="size-4" />
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
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <Label>
                    {app.projectPage.projectFeedback.feedbackDescription.label}
                  </Label>
                  <RichTextEditor
                    editorApi={descriptionEditorApi}
                    defaultContent={feedback.description ?? undefined}
                    placeholder={
                      app.projectPage.projectFeedback.feedbackDescription
                        .placeholders[0]
                    }
                    editorClassName="min-h-32"
                    issueReferenceItems={issueReferenceItems}
                    mentionItems={mentionItems}
                    // keep clicks inside the editor from reaching the card
                    onClick={(evt) => evt.stopPropagation()}
                    onUpdate={({ getHTML, getText, isEmpty }) => {
                      field.handleChange(isEmpty ? "" : getHTML());
                      setDescriptionLength(getText().trim().length);
                    }}
                  />
                </div>
              )}
            </AppField>

            {/* mount only while open so closed cards don't each fetch tags */}
            {isOpen &&
              feedback.rowId &&
              feedback.rowId !== "pending" &&
              feedback.project?.rowId && (
                <div className="flex flex-col gap-1.5">
                  <Label>{app.projectPage.projectFeedback.tags.label}</Label>
                  <PostTags
                    postId={feedback.rowId}
                    projectId={feedback.project.rowId}
                    canAssign
                  />
                </div>
              )}

            {!!existingAttachments.length && (
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                {existingAttachments.map((attachment) => (
                  <div
                    key={attachment.rowId}
                    className="group relative aspect-square overflow-hidden rounded-md border border-border-subtle"
                  >
                    {attachment.kind === "image" ? (
                      <img
                        src={attachment.url}
                        alt=""
                        className="size-full object-cover"
                      />
                    ) : (
                      // biome-ignore lint/a11y/useMediaCaption: user-uploaded preview
                      <video
                        src={attachment.url}
                        className="size-full object-cover"
                      />
                    )}

                    <button
                      type="button"
                      aria-label="Remove attachment"
                      className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-black/80 group-hover:opacity-100"
                      onClick={(evt) => {
                        evt.stopPropagation();
                        removeExistingAttachment(attachment.rowId);
                      }}
                    >
                      <LuX className="size-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <AttachmentUploader
              key={uploaderKey}
              onAttachmentsChange={setNewAttachments}
              onUploadingChange={setIsUploadingAttachments}
            />

            <div className="flex flex-row justify-between">
              <CharacterLimit
                value={descriptionLength}
                max={MAX_DESCRIPTION_LENGTH}
                className="place-self-start"
              />

              <AppForm>
                <SubmitForm
                  action={updatePostDetails.action}
                  isPending={isPending || isUploadingAttachments}
                  disabled={descriptionLength > MAX_DESCRIPTION_LENGTH}
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
