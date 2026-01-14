import { Dialog, sigil } from "@omnidev/sigil";
import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { useIsClient } from "usehooks-ts";
import { z } from "zod";

import { useCreateWorkspaceMutation } from "@/generated/graphql";
import { token } from "@/generated/panda/tokens";
import app from "@/lib/config/app.config";
import { BASE_URL } from "@/lib/config/env.config";
import DEBOUNCE_TIME from "@/lib/constants/debounceTime.constant";
import { workspaceNameSchema } from "@/lib/constants/schema.constant";
import useForm from "@/lib/hooks/useForm";
import useViewportSize from "@/lib/hooks/useViewportSize";
import toaster from "@/lib/util/toaster";
import { useOrganization } from "@/providers/OrganizationProvider";
import { getCreateSubscriptionUrl } from "@/server/functions/subscriptions";

/**
 * Schema for create workspace form.
 * Note: Workspace name/slug validation for duplicates is no longer needed
 * since org identity (name/slug) is now owned by Gatekeeper (IDP).
 * Workspaces are 1:1 with organizations.
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

  const isSmallViewport = useViewportSize({
    minWidth: token("breakpoints.sm"),
  });

  // Extract currentOrganization early (may be undefined if no context)
  const currentOrganization = orgContext?.currentOrganization;

  const { mutateAsync: createWorkspace, isPending } =
    useCreateWorkspaceMutation({
      onSettled: async () =>
        queryClient.invalidateQueries({ queryKey: ["Workspaces"] }),
      onSuccess: async (data) => {
        const workspaceId = data.createWorkspace?.workspace?.rowId;
        if (!workspaceId || !currentOrganization) return;

        const checkoutUrl = await getCreateSubscriptionUrl({
          data: {
            workspaceId,
            priceId,
            successUrl: `${BASE_URL}/workspaces/${currentOrganization.slug}`,
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
    onSubmit: async () => {
      if (!currentOrganization) return;

      return toaster.promise(
        createWorkspace({
          input: {
            workspace: {
              organizationId: currentOrganization.id,
              // Workspace inherits name/slug from organization (1:1 relationship)
              name: currentOrganization.name,
              slug: currentOrganization.slug,
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
      );
    },
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
