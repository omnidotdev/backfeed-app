import { Divider, Stack, sigil } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import {
  useNavigate,
  useParams,
  useRouteContext,
} from "@tanstack/react-router";
import { z } from "zod";

import SectionContainer from "@/components/layout/SectionContainer";
import { useUpdateWorkspaceMutation } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import { isDevEnv } from "@/lib/config/env.config";
import DEBOUNCE_TIME from "@/lib/constants/debounceTime.constant";
import {
  slugSchema,
  workspaceNameSchema,
} from "@/lib/constants/schema.constant";
import useForm from "@/lib/hooks/useForm";
import { workspaceOptions } from "@/lib/options/workspaces";

const updateWorkspaceDetails = app.workspaceSettingsPage.cta.updateWorkspace;

/**
 * Schema for defining the shape of the update workspace form fields.
 *
 * Note: Workspace name/slug validation for duplicates is no longer needed
 * since org identity (name/slug) is now owned by Gatekeeper (IDP), not the app DB.
 * This form only updates app-specific workspace settings.
 */
const updateWorkspaceSchema = z.object({
  name: workspaceNameSchema,
  currentSlug: slugSchema,
});

/**
 * Form for updating workspace details.
 */
const UpdateWorkspace = () => {
  const { hasAdminPrivileges, queryClient, organizationId, workspaceName } =
    useRouteContext({
      from: "/_public/workspaces/$workspaceSlug/_layout/_manage/settings",
    });
  const { workspaceSlug } = useParams({
    from: "/_public/workspaces/$workspaceSlug/_layout/_manage/settings",
  });
  const navigate = useNavigate();

  const { data: workspace } = useQuery({
    ...workspaceOptions({
      organizationId,
    }),
    select: (data) => data.workspaces?.nodes?.[0],
  });

  const { mutateAsync: updateWorkspace } = useUpdateWorkspaceMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: workspaceOptions({ organizationId }).queryKey,
      });

      // Workspace slug comes from org context, not DB
      navigate({
        to: "/workspaces/$workspaceSlug/settings",
        params: {
          workspaceSlug,
        },
        replace: true,
      });

      reset();
    },
  });

  const { handleSubmit, AppField, AppForm, SubmitForm, reset } = useForm({
    defaultValues: {
      // Workspace name comes from org context (Gatekeeper), not DB
      name: workspaceName ?? "",
      currentSlug: workspaceSlug ?? "",
    },
    asyncDebounceMs: DEBOUNCE_TIME,
    validators: {
      onSubmitAsync: updateWorkspaceSchema,
    },
    onSubmit: async () => {
      // Note: Workspace name/slug updates should go through Gatekeeper (IDP).
      // This form now only updates app-specific settings like updatedAt.
      // TODO: Redirect to Gatekeeper org settings for name/slug changes.
      try {
        await updateWorkspace({
          rowId: workspace?.rowId!,
          patch: {
            updatedAt: new Date(),
          },
        });
      } catch (err) {
        if (isDevEnv) console.error(err);
      }
    },
  });

  return (
    <SectionContainer
      title={
        hasAdminPrivileges
          ? updateWorkspaceDetails.title
          : updateWorkspaceDetails.memberTitle
      }
    >
      <Divider />

      <sigil.form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await handleSubmit();
        }}
      >
        <Stack gap={4} maxW="lg">
          <AppField name="name">
            {({ InputField }) => (
              <InputField
                label={updateWorkspaceDetails.fields.workspaceName.label}
                disabled={!hasAdminPrivileges}
              />
            )}
          </AppField>
        </Stack>

        <AppForm>
          <SubmitForm
            action={updateWorkspaceDetails.action}
            disabled={!hasAdminPrivileges}
            mt={4}
          />
        </AppForm>
      </sigil.form>
    </SectionContainer>
  );
};

export default UpdateWorkspace;
