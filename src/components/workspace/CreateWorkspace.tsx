import { Dialog, sigil } from "@omnidev/sigil";
import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { useHotkeys } from "react-hotkeys-hook";
import { useIsClient } from "usehooks-ts";
import { z } from "zod";

import { token } from "@/generated/panda/tokens";
import app from "@/lib/config/app.config";
import DEBOUNCE_TIME from "@/lib/constants/debounceTime.constant";
import { workspaceNameSchema } from "@/lib/constants/schema.constant";
import getSdk from "@/lib/graphql/getSdk";
import useCreateWorkspaceMutation from "@/lib/hooks/mutations/useCreateWorkspaceMutation";
import useForm from "@/lib/hooks/useForm";
import useViewportSize from "@/lib/hooks/useViewportSize";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";
import generateSlug from "@/lib/util/generateSlug";
import toaster from "@/lib/util/toaster";
import { fetchSession } from "@/server/functions/auth";

// TODO adjust schemas in this file after closure on https://linear.app/omnidev/issue/OMNI-166/strategize-runtime-and-server-side-validation-approach and https://linear.app/omnidev/issue/OMNI-167/refine-validation-schemas

/** Schema for defining the shape of the create workspace form fields, as well as validating the form. */
const createWorkspaceSchema = z
  .object({
    name: workspaceNameSchema,
  })
  .superRefine(async ({ name }, ctx) => {
    const { session } = await fetchSession();

    const slug = generateSlug(name);

    if (!slug?.length || !session) return z.NEVER;

    const sdk = await getSdk();

    const { workspaceBySlug } = await sdk.Workspace({
      slug,
    });

    if (workspaceBySlug) {
      ctx.addIssue({
        code: "custom",
        message:
          app.dashboardPage.cta.newWorkspace.workspaceSlug.error.duplicate,
        path: ["name"],
      });
    }
  });

interface Props {
  /** Whether to enable hotkey trigger for opening the dialog. */
  isHotkeyEnabled?: boolean;
}

/**
 * Dialog for creating a new workspace.
 */
const CreateWorkspace = ({ isHotkeyEnabled = true }: Props) => {
  const { queryClient } = useRouteContext({ from: "__root__" });
  const navigate = useNavigate();

  const isClient = useIsClient();

  const isSmallViewport = useViewportSize({
    minWidth: token("breakpoints.sm"),
  });

  const { isOpen: isCreateProjectDialogOpen } = useDialogStore({
    type: DialogType.CreateProject,
  });

  const { isOpen, setIsOpen } = useDialogStore({
    type: DialogType.CreateWorkspace,
  });

  useHotkeys(
    "mod+o",
    () => {
      setIsOpen(!isOpen);
      reset();
    },
    {
      enabled: !isCreateProjectDialogOpen && isHotkeyEnabled,
      enableOnFormTags: true,
      preventDefault: true,
    },
    [isOpen, isCreateProjectDialogOpen, isHotkeyEnabled],
  );

  const { mutateAsync: createWorkspace, isPending } =
    useCreateWorkspaceMutation({
      onSettled: async () =>
        queryClient.invalidateQueries({ queryKey: ["Workspaces"] }),
      onSuccess: async (data) => {
        navigate({
          to: "/workspaces/$workspaceSlug",
          params: { workspaceSlug: data?.workspace?.slug! },
        });

        setIsOpen(false);
        reset();
      },
    });

  const { handleSubmit, AppField, AppForm, SubmitForm, reset } = useForm({
    defaultValues: {
      name: "",
    },
    asyncDebounceMs: DEBOUNCE_TIME,
    validators: {
      onSubmitAsync: createWorkspaceSchema,
    },
    onSubmit: async ({ value }) =>
      toaster.promise(
        createWorkspace({
          input: {
            workspace: {
              name: value.name,
              slug: generateSlug(value.name)!,
            },
          },
        }),
        {
          loading: {
            title: app.dashboardPage.cta.newWorkspace.action.pending,
          },
          success: {
            title: app.dashboardPage.cta.newWorkspace.action.success.title,
            description:
              app.dashboardPage.cta.newWorkspace.action.success.description,
          },
          error: {
            title: app.dashboardPage.cta.newWorkspace.action.error.title,
            description:
              app.dashboardPage.cta.newWorkspace.action.error.description,
          },
        },
      ),
  });

  if (!isClient) return null;

  return (
    <Dialog
      title={app.dashboardPage.cta.newWorkspace.label}
      description={app.dashboardPage.cta.newWorkspace.description}
      open={isOpen}
      onOpenChange={({ open }) => {
        reset();
        setIsOpen(open);
      }}
      contentProps={{
        style: {
          // TODO: adjust minW upstream in Sigil for mobile viewports
          minWidth: isSmallViewport ? undefined : "80%",
        },
      }}
    >
      <sigil.form
        display="flex"
        flexDirection="column"
        gap={4}
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await handleSubmit();
        }}
      >
        <AppField name="name">
          {({ InputField }) => (
            <InputField
              label={app.dashboardPage.cta.newWorkspace.workspaceName.id}
              placeholder={
                app.dashboardPage.cta.newWorkspace.workspaceName.placeholder
              }
            />
          )}
        </AppField>

        <AppForm>
          <SubmitForm
            action={app.dashboardPage.cta.newWorkspace.action}
            isPending={isPending}
            flex={{ sm: 1 }}
          />
        </AppForm>
      </sigil.form>
    </Dialog>
  );
};

export default CreateWorkspace;
