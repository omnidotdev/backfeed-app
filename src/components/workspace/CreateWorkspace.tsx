import { Dialog, sigil } from "@omnidev/sigil";
import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { useHotkeys } from "react-hotkeys-hook";
import { useIsClient } from "usehooks-ts";
import { z } from "zod";

import { token } from "@/generated/panda/tokens";
import app from "@/lib/config/app.config";
import DEBOUNCE_TIME from "@/lib/constants/debounceTime.constant";
import { workspaceNameSchema } from "@/lib/constants/schema.constant";
import useCreateWorkspaceMutation from "@/lib/hooks/mutations/useCreateWorkspaceMutation";
import useForm from "@/lib/hooks/useForm";
import useViewportSize from "@/lib/hooks/useViewportSize";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";
import toaster from "@/lib/util/toaster";
import { useOrganization } from "@/providers/OrganizationProvider";

// TODO adjust schemas in this file after closure on https://linear.app/omnidev/issue/OMNI-166/strategize-runtime-and-server-side-validation-approach and https://linear.app/omnidev/issue/OMNI-167/refine-validation-schemas

/**
 * Schema for defining the shape of the create workspace form fields.
 *
 * Note: Workspace name/slug validation for duplicates is no longer needed
 * since org identity (name/slug) is now owned by Gatekeeper (IDP), not the app DB.
 * Workspaces are 1:1 with organizations, so duplicate checking happens at the org level.
 */
const createWorkspaceSchema = z.object({
  name: workspaceNameSchema,
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
  const orgContext = useOrganization();
  const navigate = useNavigate();

  const isClient = useIsClient();

  // Extract currentOrganization early (may be undefined if no context)
  const currentOrganization = orgContext?.currentOrganization;

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
      onSuccess: async () => {
        // Navigate to the workspace using the current org's slug from context
        navigate({
          to: "/workspaces/$workspaceSlug",
          params: { workspaceSlug: currentOrganization!.slug },
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
    onSubmit: async () =>
      toaster.promise(
        createWorkspace({
          input: {
            workspace: {
              organizationId: currentOrganization!.id,
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

  // Don't render if no organization context (e.g., on pricing page without auth)
  if (!orgContext || !currentOrganization) return null;

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
