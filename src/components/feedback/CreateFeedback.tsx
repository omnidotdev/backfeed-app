import { Portal } from "@ark-ui/react/portal";
import { RichTextEditor } from "@omnidotdev/thornberry/rich-text-editor";
import { useStore } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useIsClient } from "usehooks-ts";
import { z } from "zod";

import CharacterLimit from "@/components/core/CharacterLimit";
import AttachmentUploader from "@/components/feedback/AttachmentUploader";
import PossibleDuplicates from "@/components/feedback/PossibleDuplicates";
import {
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  useCreateAttachmentMutation,
  useCreateFeedbackMutation,
} from "@/generated/graphql";
import signIn from "@/lib/auth/signIn";
import app from "@/lib/config/app.config";
import DEBOUNCE_TIME from "@/lib/constants/debounceTime.constant";
import useForm from "@/lib/hooks/useForm";
import useMentionableUsers from "@/lib/hooks/useMentionableUsers";
import { freeTierFeedbackOptions } from "@/lib/options/feedback";
import { projectIssueRefsOptions } from "@/lib/options/issueReferences";
import { projectParticipantsOptions } from "@/lib/options/mentionableUsers";
import {
  projectMetricsOptions,
  projectOptions,
  projectStatusesOptions,
  statusBreakdownOptions,
} from "@/lib/options/projects";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";
import toaster from "@/lib/util/toaster";

import type { EditorApi } from "@omnidotdev/thornberry/rich-text-editor";
import type { UploadedAttachment } from "@/components/feedback/AttachmentUploader";

const MAX_DESCRIPTION_LENGTH = 500;

const projectRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout/projects/$projectSlug/",
);

const postSchemaErrors = app.projectPage.projectFeedback.createPost.errors;

// TODO adjust schema in this file after closure on https://linear.app/omnidev/issue/OMNI-166/strategize-runtime-and-server-side-validation-approach and https://linear.app/omnidev/issue/OMNI-167/refine-validation-schemas

/** Schema for defining the shape of the create feedback form fields, as well as validating the form. */
const createFeedbackSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, postSchemaErrors.title.minLength)
    .max(90, postSchemaErrors.title.maxLength),
  // stored as rich-text HTML; the plain-text length is enforced in the UI
  description: z.string(),
});

/**
 * Create feedback form.
 */
const CreateFeedback = () => {
  const { session, queryClient, organizationId } =
    projectRoute.useRouteContext();
  const { workspaceSlug, projectSlug } = projectRoute.useParams();
  const navigate = useNavigate();

  const isClient = useIsClient();
  const isSignedIn = !!session?.user;

  const { isOpen, setIsOpen } = useDialogStore({
    type: DialogType.CreatePost,
  });

  // signed-out users can compose a post; on submit we stash the draft and route
  // them to sign-in, then rehydrate the composer when they return so nothing is
  // lost. scoped per project so drafts don't bleed across boards
  const draftKey = `backfeed:draft-post:${organizationId ?? "_"}:${projectSlug}`;
  const [draft] = useState<{ title?: string; description?: string } | null>(
    () => {
      if (typeof window === "undefined") return null;
      try {
        const raw = window.localStorage.getItem(draftKey);
        return raw ? JSON.parse(raw) : null;
      } catch {
        return null;
      }
    },
  );
  const { data: canCreateFeedback } = useQuery(
    freeTierFeedbackOptions({
      organizationId,
      projectSlug,
    }),
  );

  const { data: project } = useQuery({
    ...projectOptions({
      projectSlug,
      organizationId,
    }),
    select: (data) => data?.projects?.nodes?.[0],
  });

  const projectId = project?.rowId;

  // posts in this project, offered in the `#`-reference typeahead
  const { data: issueReferenceItems } = useQuery(
    projectIssueRefsOptions({ projectSlug, organizationId }),
  );

  // project participants, offered in the `@`-mention typeahead (a new post has
  // no comment thread to source mentionable users from)
  const { data: projectParticipants } = useQuery(
    projectParticipantsOptions({ projectId }),
  );
  const mentionItems = useMentionableUsers(projectParticipants);

  const { data: defaultStatusTemplateId } = useQuery({
    ...projectStatusesOptions({ organizationId: organizationId! }),
    enabled: !!organizationId,
    select: (data) => {
      const nodes = data?.statusTemplates?.nodes ?? [];
      const openTemplate = nodes.find((t) => t?.name === "open");

      return openTemplate?.rowId ?? nodes[0]?.rowId;
    },
  });

  const { mutateAsync: createFeedback, isPending } =
    useCreateFeedbackMutation();

  const { mutateAsync: createAttachment } = useCreateAttachmentMutation();

  // Successfully uploaded attachments, linked to the post on submit. `uploaderKey`
  // remounts the uploader to clear its previews/state after a submit or close.
  const [attachments, setAttachments] = useState<UploadedAttachment[]>([]);
  const [isUploadingAttachments, setIsUploadingAttachments] = useState(false);
  const [uploaderKey, setUploaderKey] = useState(0);

  const {
    handleSubmit,
    AppField,
    AppForm,
    SubmitForm,
    reset,
    setFieldValue,
    store,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
    asyncDebounceMs: DEBOUNCE_TIME,
    validators: {
      onSubmitAsync: createFeedbackSchema,
    },
    onSubmit: async ({ value }) => {
      // signed-out: persist the draft and route to sign-in. they return to a
      // pre-filled composer (attachments stay gated until signed in)
      if (!session?.user?.rowId) {
        try {
          window.localStorage.setItem(
            draftKey,
            JSON.stringify({
              title: value.title,
              description: value.description,
            }),
          );
        } catch {}
        signIn({ redirectUrl: window.location.href });
        return;
      }

      // Validate that required data is available before submitting
      if (!projectId || !session?.user?.rowId) {
        toaster.error({
          title: app.projectPage.projectFeedback.action.error.title,
          description: "Missing required data. Please try again.",
        });
        return;
      }

      const userId = session.user.rowId;

      return toaster.promise(
        createFeedback({
          input: {
            post: {
              // status is optional; a project without configured status
              // templates still accepts posts (they start without a status)
              ...(defaultStatusTemplateId && {
                statusTemplateId: defaultStatusTemplateId,
              }),
              projectId,
              userId,
              title: value.title.trim(),
              description: value.description.trim(),
            },
          },
        }).then(async (data) => {
          // Link any uploaded attachments to the newly created post
          const postId = data?.createPost?.post?.rowId;
          if (postId && attachments.length) {
            await Promise.all(
              attachments.map((attachment) =>
                createAttachment({
                  input: {
                    attachment: {
                      postId,
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
          }

          reset();
          descriptionEditorApi.current?.clearContent();
          setDescriptionLength(0);
          setAttachments([]);
          setUploaderKey((key) => key + 1);
          setIsOpen(false);

          const invalidations: Promise<void>[] = [
            queryClient.invalidateQueries(
              freeTierFeedbackOptions({
                organizationId,
                projectSlug,
              }),
            ),
            queryClient.invalidateQueries({
              queryKey: ["Posts.infinite"],
            }),
          ];

          if (projectId) {
            invalidations.push(
              queryClient.invalidateQueries({
                queryKey: statusBreakdownOptions({ projectId }).queryKey,
              }),
              queryClient.invalidateQueries({
                queryKey: projectMetricsOptions({ projectId }).queryKey,
              }),
            );
          }

          await Promise.all(invalidations);

          return { rowId: postId };
        }),
        {
          loading: {
            title: app.projectPage.projectFeedback.action.pending,
          },
          // a newly created post has no votes, so under the default
          // top-voted sort it lands at the bottom of the feed. surface a
          // "View" CTA so the author can jump straight to their post
          success: ({ rowId }) => ({
            title: app.projectPage.projectFeedback.action.success.title,
            description:
              app.projectPage.projectFeedback.action.success.description,
            ...(rowId && {
              duration: 8000,
              action: {
                label: "View",
                onClick: () =>
                  navigate({
                    to: "/workspaces/$workspaceSlug/projects/$projectSlug/$feedbackId",
                    params: {
                      workspaceSlug,
                      projectSlug,
                      feedbackId: rowId,
                    },
                  }),
              },
            }),
          }),
          error: {
            title: app.projectPage.projectFeedback.action.error.title,
            description:
              app.projectPage.projectFeedback.action.error.description,
          },
        },
      );
    },
  });

  const titleValue = useStore(store, (store) => store.values.title);
  // editor is uncontrolled, so track the plain-text length for the limit and
  // hold a handle to clear it on reset/submit
  const descriptionEditorApi = useRef<EditorApi | null>(null);
  const [descriptionLength, setDescriptionLength] = useState(0);

  // Pick a random placeholder index on client only (same index for title and description)
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const placeholders =
      app.projectPage.projectFeedback.feedbackTitle.placeholders;
    setPlaceholderIndex(Math.floor(Math.random() * placeholders.length));
  }, []);

  // restore a draft saved before a sign-in redirect, reopen the composer so the
  // user lands back where they left off, then clear the stored draft
  // biome-ignore lint/correctness/useExhaustiveDependencies: restore the draft once on mount
  useEffect(() => {
    if (!draft) return;
    setFieldValue("title", draft.title ?? "");
    setFieldValue("description", draft.description ?? "");
    setIsOpen(true);
    try {
      window.localStorage.removeItem(draftKey);
    } catch {}
  }, []);

  const titlePlaceholder =
    app.projectPage.projectFeedback.feedbackTitle.placeholders[
      placeholderIndex
    ];
  const descriptionPlaceholder =
    app.projectPage.projectFeedback.feedbackDescription.placeholders[
      placeholderIndex
    ];

  // attachments require an authenticated user; the title/description stay open to
  // signed-out users so they can compose before being routed to sign-in
  const attachmentsDisabled = !isSignedIn || !canCreateFeedback;
  // only gate the composer on the free-tier limit once signed in
  const composerDisabled = isSignedIn && !canCreateFeedback;

  if (!isClient) return null;

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={({ open }) => {
        reset();
        descriptionEditorApi.current?.clearContent();
        setDescriptionLength(0);
        setAttachments([]);
        setUploaderKey((key) => key + 1);
        setIsOpen(open);
      }}
    >
      <Portal>
        <DialogBackdrop />
        <DialogContent className="w-[calc(100vw-2rem)] max-w-[32rem] sm:w-[28rem]">
          <DialogTitle>
            {app.projectPage.projectFeedback.createPost.title}
          </DialogTitle>
          <DialogCloseTrigger />

          <form
            className="flex flex-col gap-2"
            onSubmit={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              await handleSubmit();
            }}
          >
            <AppField name="title">
              {({ InputField }) => (
                <InputField
                  label={app.projectPage.projectFeedback.feedbackTitle.label}
                  placeholder={titlePlaceholder}
                  disabled={composerDisabled}
                />
              )}
            </AppField>

            {projectId && (
              <PossibleDuplicates projectId={projectId} content={titleValue} />
            )}

            <AppField name="description">
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <Label>
                    {app.projectPage.projectFeedback.feedbackDescription.label}
                  </Label>
                  <RichTextEditor
                    editorApi={descriptionEditorApi}
                    defaultContent={draft?.description || undefined}
                    placeholder={descriptionPlaceholder}
                    editable={!composerDisabled}
                    editorClassName="min-h-16"
                    mentionItems={mentionItems}
                    issueReferenceItems={issueReferenceItems}
                    onUpdate={({ getHTML, getText, isEmpty }) => {
                      field.handleChange(isEmpty ? "" : getHTML());
                      setDescriptionLength(getText().trim().length);
                    }}
                  />
                </div>
              )}
            </AppField>

            <AttachmentUploader
              key={uploaderKey}
              onAttachmentsChange={setAttachments}
              onUploadingChange={setIsUploadingAttachments}
              disabled={attachmentsDisabled}
            />

            <div className="flex flex-row justify-between">
              <CharacterLimit
                value={descriptionLength}
                max={MAX_DESCRIPTION_LENGTH}
                className="place-self-start"
              />

              <AppForm>
                <SubmitForm
                  action={
                    isSignedIn
                      ? app.projectPage.projectFeedback.action
                      : { submit: "Sign in to post", pending: "Redirecting..." }
                  }
                  isPending={isPending || isUploadingAttachments}
                  disabled={descriptionLength > MAX_DESCRIPTION_LENGTH}
                  className="w-fit place-self-end"
                />
              </AppForm>
            </div>
          </form>
        </DialogContent>
      </Portal>
    </DialogRoot>
  );
};

export default CreateFeedback;
