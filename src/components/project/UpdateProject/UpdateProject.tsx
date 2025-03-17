"use client";

import { Divider, Stack, sigil } from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";

import { SectionContainer } from "components/layout";
import { useProjectQuery, useUpdateProjectMutation } from "generated/graphql";
import { app, isDevEnv } from "lib/config";
import { DEBOUNCE_TIME } from "lib/constants";
import { getSdk } from "lib/graphql";
import { useForm } from "lib/hooks";

const updateProjectDetails = app.projectSettingsPage.cta.updateProject;

/** Schema for defining the shape of the update project form fields. */
// TODO: dedup these schemas with the create project form
const baseSchema = z.object({
  name: z
    .string()
    .min(3, updateProjectDetails.fields.projectName.errors.minLength),
  description: z
    .string()
    .min(10, updateProjectDetails.fields.projectDescription.errors.minLength),
  slug: z
    .string()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      updateProjectDetails.fields.projectSlug.errors.invalidFormat
    )
    .min(3, updateProjectDetails.fields.projectSlug.errors.minLength)
    .max(50, updateProjectDetails.fields.projectSlug.errors.maxLength),
});

/**
 * Form for updating project details.
 */
const UpdateProject = () => {
  const queryClient = useQueryClient();

  const { organizationSlug, projectSlug } = useParams<{
    organizationSlug: string;
    projectSlug: string;
  }>();

  /** Schema for validation of the update project form. */
  const updateProjectSchema = baseSchema.superRefine(async ({ slug }, ctx) => {
    if (!slug?.length || slug === projectSlug) return z.NEVER;

    const sdk = await getSdk();

    const { projects } = await sdk.Project({
      projectSlug: slug,
      organizationSlug,
    });

    if (projects?.nodes?.length) {
      ctx.addIssue({
        code: "custom",
        message: updateProjectDetails.fields.projectSlug.errors.duplicate,
        path: ["slug"],
      });
    }
  });

  const router = useRouter();

  const { data: project } = useProjectQuery(
    {
      projectSlug,
      organizationSlug,
    },
    {
      select: (data) => data.projects?.nodes?.[0],
    }
  );

  const { mutateAsync: updateProject, isPending } = useUpdateProjectMutation({
    onSuccess: async (data) => {
      router.replace(
        `/organizations/${organizationSlug}/projects/${data?.updateProject?.project?.slug}/settings`
      );

      await queryClient.invalidateQueries({
        queryKey: useProjectQuery.getKey({
          projectSlug: data?.updateProject?.project?.slug!,
          organizationSlug,
        }),
      });

      // TODO: handle reset better. If slug is updated, you get a flicker of the old slug due to the router.replace (hasn't routed yet)
      reset();
    },
  });

  const { handleSubmit, AppField, AppForm, SubmitForm, reset } = useForm({
    defaultValues: {
      name: project?.name ?? "",
      description: project?.description ?? "",
      slug: project?.slug ?? "",
    },
    asyncDebounceMs: DEBOUNCE_TIME,
    validators: {
      onChange: baseSchema,
      onSubmitAsync: updateProjectSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await updateProject({
          rowId: project?.rowId!,
          patch: {
            name: value.name,
            slug: value.slug,
            updatedAt: new Date(),
          },
        });
      } catch (error) {
        if (isDevEnv) {
          console.error(error);
        }
      }
    },
  });

  return (
    <SectionContainer title={updateProjectDetails.title}>
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
                label={updateProjectDetails.fields.projectName.label}
              />
            )}
          </AppField>

          <AppField name="description">
            {({ InputField }) => (
              <InputField
                label={updateProjectDetails.fields.projectDescription.label}
              />
            )}
          </AppField>

          <AppField name="slug">
            {({ InputField }) => (
              <InputField
                label={updateProjectDetails.fields.projectSlug.label}
              />
            )}
          </AppField>
        </Stack>

        <AppForm>
          <SubmitForm
            action={updateProjectDetails.action}
            isPending={isPending}
            mt={4}
          />
        </AppForm>
      </sigil.form>
    </SectionContainer>
  );
};

export default UpdateProject;
