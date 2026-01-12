import { Dialog, sigil } from "@omnidev/sigil";
import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { useIsClient } from "usehooks-ts";
import { z } from "zod";

import { token } from "@/generated/panda/tokens";
import app from "@/lib/config/app.config";
import { BASE_URL } from "@/lib/config/env.config";
import DEBOUNCE_TIME from "@/lib/constants/debounceTime.constant";
import { workspaceNameSchema } from "@/lib/constants/schema.constant";
import useCreateWorkspaceMutation from "@/lib/hooks/mutations/useCreateWorkspaceMutation";
import useForm from "@/lib/hooks/useForm";
import useViewportSize from "@/lib/hooks/useViewportSize";
import toaster from "@/lib/util/toaster";
import { useOrganization } from "@/providers/OrganizationProvider";
import { getCreateSubscriptionUrl } from "@/server/functions/subscriptions";

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
  /** Price ID. */
  priceId: string;
  /** Whether the dialog is open or not. */
  isOpen: boolean;
  /** Handler to manage open state of the dialog */
  setIsOpen: (isOpen: boolean) => void;
}

/**
 * Dialog for creating a new workspace with a paid subscription tier.
 */
const CreatePaidSubscription = ({ priceId, isOpen, setIsOpen }: Props) => {
  const { queryClient } = useRouteContext({ from: "/pricing" });
  const orgContext = useOrganization();
  const navigate = useNavigate();

  const isClient = useIsClient();

  // Extract currentOrganization early (may be undefined if no context)
  const currentOrganization = orgContext?.currentOrganization;

  const isSmallViewport = useViewportSize({
    minWidth: token("breakpoints.sm"),
  });

  // TODO: determine if there is a better approach here to make the mutation transactional
  // The problem here is that a user could then opt to *not* finish the payment flow
  // If a user doesn't finish the payment flow, the workspace is still created in the database but with a `Free` tier subscription.
  const { mutateAsync: createWorkspace, isPending } =
    useCreateWorkspaceMutation({
      onSettled: async () =>
        queryClient.invalidateQueries({ queryKey: ["Workspaces"] }),
      onSuccess: async (data) => {
        const checkoutUrl = await getCreateSubscriptionUrl({
          data: {
            workspaceId: data.workspace?.rowId!,
            priceId,
            // Use org slug from context, not from workspace DB
            successUrl: `${BASE_URL}/workspaces/${currentOrganization!.slug}`,
          },
        });

        navigate({ href: checkoutUrl, reloadDocument: true });

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

export default CreatePaidSubscription;
