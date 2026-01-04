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
import getSdk from "@/lib/graphql/getSdk";
import useForm from "@/lib/hooks/useForm";
import { workspaceOptions } from "@/lib/options/workspaces";
import generateSlug from "@/lib/util/generateSlug";
import { fetchSession } from "@/server/functions/auth";

const updateWorkspaceDetails = app.workspaceSettingsPage.cta.updateWorkspace;

/** Schema for defining the shape of the update workspace form fields, as well as validating the form. */
const updateWorkspaceSchema = z
  .object({
    name: workspaceNameSchema,
    currentSlug: slugSchema,
  })
  .superRefine(async ({ name, currentSlug }, ctx) => {
    const { session } = await fetchSession();

    const updatedSlug = generateSlug(name);

    if (!updatedSlug?.length || updatedSlug === currentSlug || !session)
      return z.NEVER;

    const sdk = await getSdk();

    const { workspaceBySlug } = await sdk.Workspace({
      slug: updatedSlug,
    });

    if (workspaceBySlug) {
      ctx.addIssue({
        code: "custom",
        message: updateWorkspaceDetails.fields.workspaceSlug.errors.duplicate,
        path: ["name"],
      });
    }
  });

/**
 * Form for updating workspace details.
 */
const UpdateWorkspace = () => {
  const { hasAdminPrivileges, queryClient } = useRouteContext({
    from: "/_auth/workspaces/$workspaceSlug/_layout/_manage/settings",
  });
  const { workspaceSlug } = useParams({
    from: "/_auth/workspaces/$workspaceSlug/_layout/_manage/settings",
  });
  const navigate = useNavigate();

  const { data: workspace } = useQuery({
    ...workspaceOptions({
      slug: workspaceSlug,
    }),
    select: (data) => data.workspaceBySlug,
  });

  const { mutateAsync: updateWorkspace } = useUpdateWorkspaceMutation({
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: workspaceOptions({ slug: workspaceSlug }).queryKey,
      });

      navigate({
        to: "/workspaces/$workspaceSlug/settings",
        params: {
          workspaceSlug: data?.updateWorkspace?.workspace?.slug!,
        },
        replace: true,
      });

      reset();
    },
  });

  const { handleSubmit, AppField, AppForm, SubmitForm, reset } = useForm({
    defaultValues: {
      name: workspace?.name ?? "",
      currentSlug: workspace?.slug ?? "",
    },
    asyncDebounceMs: DEBOUNCE_TIME,
    validators: {
      onSubmitAsync: updateWorkspaceSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await updateWorkspace({
          rowId: workspace?.rowId!,
          patch: {
            name: value.name,
            slug: generateSlug(value.name),
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
