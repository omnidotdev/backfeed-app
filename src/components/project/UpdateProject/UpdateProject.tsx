"use client";

import { Divider, Grid, Stack, sigil } from "@omnidev/sigil";
import { keepPreviousData, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";

import { SectionContainer } from "components/layout";
import { UpdateSocials, UpdateStatuses } from "components/project";
import {
  useCreateProjectSocialMutation,
  useDeleteProjectSocialMutation,
  useProjectQuery,
  useUpdateProjectMutation,
  useUpdateProjectSocialMutation,
} from "generated/graphql";
import { app, isDevEnv } from "lib/config";
import {
  DEBOUNCE_TIME,
  emptyStringAsUndefined,
  projectDescriptionSchema,
  projectNameSchema,
  projectSocialSchema,
  slugSchema,
  urlSchema,
} from "lib/constants";
import { getSdk } from "lib/graphql";
import { useForm } from "lib/hooks";
import { useProjectFormOptions } from "lib/hooks/form";
import { generateSlug, getAuthSession } from "lib/util";

import type { ProjectQuery } from "generated/graphql";
import { BiWorld } from "react-icons/bi";

const updateProjectDetails = app.projectSettingsPage.cta.updateProject;

// TODO adjust schemas in this file after closure on https://linear.app/omnidev/issue/OMNI-166/strategize-runtime-and-server-side-validation-approach and https://linear.app/omnidev/issue/OMNI-167/refine-validation-schemas

/** Schema for defining the shape of the update project form fields, as well as validating the form. */
const updateProjectSchema = z
  .object({
    name: projectNameSchema,
    description: projectDescriptionSchema,
    website: emptyStringAsUndefined.or(urlSchema),
    projectSocials: z.array(projectSocialSchema),
    organizationSlug: slugSchema,
    currentSlug: slugSchema,
  })
  .superRefine(async ({ name, organizationSlug, currentSlug }, ctx) => {
    const session = await getAuthSession();

    const updatedSlug = generateSlug(name);

    if (!updatedSlug?.length || currentSlug === updatedSlug || !session)
      return z.NEVER;

    const sdk = getSdk({ session });

    const { projects } = await sdk.Project({
      projectSlug: updatedSlug,
      organizationSlug,
    });

    if (projects?.nodes?.length) {
      ctx.addIssue({
        code: "custom",
        message: updateProjectDetails.fields.projectSlug.errors.duplicate,
        path: ["name"],
      });
    }
  });

/**
 * Form for updating project details.
 */
const UpdateProject = () => {
  const queryClient = useQueryClient();

  const { formOptions } = useProjectFormOptions();

  const { organizationSlug, projectSlug } = useParams<{
    organizationSlug: string;
    projectSlug: string;
  }>();

  const router = useRouter();

  const { data: project } = useProjectQuery(
    {
      projectSlug,
      organizationSlug,
    },
    {
      placeholderData: keepPreviousData,
      select: (data) => data.projects?.nodes?.[0],
    },
  );

  const { mutateAsync: createProjectSocial } = useCreateProjectSocialMutation();
  const { mutateAsync: updateProjectSocial } = useUpdateProjectSocialMutation();
  const { mutateAsync: deleteProjectSocial } = useDeleteProjectSocialMutation();

  const { mutateAsync: updateProject, isPending } = useUpdateProjectMutation({
    onMutate: (variables) => {
      const { name, description, slug } = variables.patch;

      const snapshot = queryClient.getQueryData(
        useProjectQuery.getKey({ projectSlug, organizationSlug }),
      ) as ProjectQuery;

      const project = snapshot.projects?.nodes?.[0];

      queryClient.setQueryData(
        useProjectQuery.getKey({ projectSlug, organizationSlug }),
        {
          projects: {
            ...snapshot.projects,
            nodes: [
              {
                ...project,
                name,
                description,
                slug,
              },
            ],
          },
        },
      );

      // ! NB: if the slug has been updated, optimistically update the query data for that slug
      if (slug !== projectSlug) {
        queryClient.setQueryData(
          useProjectQuery.getKey({ projectSlug: slug!, organizationSlug }),
          {
            projects: {
              ...snapshot.projects,
              nodes: [
                {
                  ...project,
                  name,
                  description,
                  slug,
                },
              ],
            },
          },
        );
      }
    },
    onSettled: (data) => {
      const updatedSlug = data?.updateProject?.project?.slug;

      if (updatedSlug) {
        queryClient.invalidateQueries({
          queryKey: useProjectQuery.getKey({
            projectSlug: updatedSlug,
            organizationSlug,
          }),
        });

        // NB: If the project slug was updated, we need to invalidate the query for the old slug due to the optimistic updates from `onMutate`
        if (updatedSlug !== projectSlug) {
          queryClient.invalidateQueries({
            queryKey: useProjectQuery.getKey({
              projectSlug,
              organizationSlug,
            }),
          });
        }

        router.replace(
          `/organizations/${organizationSlug}/projects/${updatedSlug}/settings`,
        );

        reset();
      }
    },
  });

  const { handleSubmit, Field, AppField, AppForm, SubmitForm, reset } = useForm(
    {
      ...formOptions,
      asyncDebounceMs: DEBOUNCE_TIME,
      validators: {
        onSubmitAsync: updateProjectSchema,
      },
      onSubmit: async ({ value }) => {
        // NB: filter out any socials that were reset
        const currentSocials = value.projectSocials.filter(
          (social) => !!social.url.length,
        );

        const removedSocials = project?.projectSocials.nodes.filter(
          (social) =>
            !currentSocials.some(
              (currentSocial) => currentSocial.rowId === social?.rowId,
            ),
        );

        try {
          if (removedSocials?.length) {
            await Promise.all(
              removedSocials.map((social) =>
                deleteProjectSocial({
                  socialId: social?.rowId!,
                }),
              ),
            );
          }

          await Promise.all([
            updateProject({
              rowId: project?.rowId!,
              patch: {
                name: value.name,
                description: value.description,
                slug: generateSlug(value.name)!,
                website: value.website ?? undefined,
                updatedAt: new Date(),
              },
            }),
            currentSocials.map((social) => {
              if (social.rowId === "pending") {
                createProjectSocial({
                  input: {
                    projectSocial: {
                      projectId: social.projectId,
                      url: social.url,
                    },
                  },
                });
              } else {
                updateProjectSocial({
                  rowId: social.rowId,
                  patch: {
                    url: social.url,
                  },
                });
              }
            }),
          ]);
        } catch (err) {
          if (isDevEnv) console.error(err);
        }
      },
    },
  );

  return (
    <SectionContainer
      title={updateProjectDetails.title}
      description={updateProjectDetails.description}
    >
      <sigil.form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await handleSubmit();
        }}
      >
        <Grid columns={{ base: 1, lg: 2 }} gap={8}>
          <Stack gap={4}>
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

            <AppField name="website">
              {({ UrlField }) => (
                <UrlField
                  icon={BiWorld}
                  label="Website"
                  placeholder="backfeed.omni.dev"
                  displayRemoveTrigger={false}
                />
              )}
            </AppField>
          </Stack>

          <UpdateSocials form={{ Field, AppField }} />
        </Grid>

        <AppForm>
          <SubmitForm
            action={updateProjectDetails.action}
            isPending={isPending}
            mt={4}
          />
        </AppForm>
      </sigil.form>

      {/* TODO: when ready to implement for production, remove the development environment check */}
      <Divider display={isDevEnv ? "inline" : "none"} />

      <UpdateStatuses projectId={project?.rowId!} />
    </SectionContainer>
  );
};

export default UpdateProject;
