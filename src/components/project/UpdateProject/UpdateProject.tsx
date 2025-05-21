"use client";

import { Divider, Grid, Stack, sigil } from "@omnidev/sigil";
import { keepPreviousData, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { FaGlobe } from "react-icons/fa6";
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
  projectDescriptionSchema,
  projectNameSchema,
  slugSchema,
  urlSchema,
  uuidSchema,
} from "lib/constants";
import { getSdk } from "lib/graphql";
import { useForm } from "lib/hooks";
import { updateProjectFormOptions } from "lib/options/form";
import { generateSlug, getAuthSession } from "lib/util";

import type { ProjectQuery } from "generated/graphql";

const projectSocialSchema = z.object({
  rowId: uuidSchema.or(z.literal("pending")),
  projectId: uuidSchema,
  // NB: need to allow an empty url for inital `pending` placeholder, this allows users to update other aspects of the form without needing to add a project social.
  url: urlSchema.or(z.literal("")),
});

export type ProjectSocial = z.infer<typeof projectSocialSchema>;

const updateProjectDetails = app.projectSettingsPage.cta.updateProject;

// TODO adjust schemas in this file after closure on https://linear.app/omnidev/issue/OMNI-166/strategize-runtime-and-server-side-validation-approach and https://linear.app/omnidev/issue/OMNI-167/refine-validation-schemas

/** Schema for defining the shape of the update project form fields, as well as validating the form. */
const updateProjectSchema = z
  .object({
    name: projectNameSchema,
    description: projectDescriptionSchema,
    website: urlSchema.or(z.literal("")),
    projectSocials: z.array(projectSocialSchema),
    organizationSlug: slugSchema,
    currentSlug: slugSchema,
  })
  .superRefine(
    async ({ name, organizationSlug, currentSlug, projectSocials }, ctx) => {
      const uniqueSocials = new Set();

      for (const social of projectSocials) {
        const url = social.url;

        if (uniqueSocials.has(url)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: updateProjectDetails.fields.projectSocials.errors.unique,
            path: ["projectSocials", projectSocials.indexOf(social), "url"],
          });
        } else {
          uniqueSocials.add(url);
        }
      }

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
    },
  );

/**
 * Form for updating project details.
 */
const UpdateProject = () => {
  const queryClient = useQueryClient();

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

  const currentProjectQueryKey = useProjectQuery.getKey({
    projectSlug,
    organizationSlug,
  });

  const onSettled = () => {
    form.reset();

    return queryClient.invalidateQueries({ queryKey: ["Project"] });
  };

  const { mutateAsync: createProjectSocial } = useCreateProjectSocialMutation({
    onSettled,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["Project"] });

      const snapshot = queryClient.getQueryData(
        currentProjectQueryKey,
      ) as ProjectQuery;

      const project = snapshot.projects?.nodes?.[0];

      queryClient.setQueryData(currentProjectQueryKey, {
        projects: {
          ...snapshot?.projects,
          nodes: [
            {
              ...project,
              projectSocials: {
                nodes: [
                  ...(project?.projectSocials?.nodes ?? []),
                  {
                    rowId: "pending",
                    projectId: project?.rowId,
                    url: variables.input.projectSocial.url,
                  },
                ],
              },
            },
          ],
        },
      });
    },
  });

  const { mutateAsync: updateProjectSocial } = useUpdateProjectSocialMutation({
    onSettled,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["Project"] });

      const updatedId = variables.rowId;

      const snapshot = queryClient.getQueryData(
        currentProjectQueryKey,
      ) as ProjectQuery;

      const project = snapshot.projects?.nodes?.[0];

      const updatedProject = {
        ...project,
        projectSocials: {
          ...project?.projectSocials,
          nodes: project?.projectSocials?.nodes?.map((social) => {
            if (social?.rowId === updatedId) {
              return {
                ...social,
                ...variables.patch,
              };
            }
            return social;
          }),
        },
      };

      queryClient.setQueryData(currentProjectQueryKey, {
        projects: {
          ...snapshot?.projects,
          nodes: [updatedProject],
        },
      });
    },
  });

  const { mutateAsync: deleteProjectSocial } = useDeleteProjectSocialMutation({
    onSettled,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["Project"] });

      const deletedId = variables.socialId;

      const snapshot = queryClient.getQueryData(
        currentProjectQueryKey,
      ) as ProjectQuery;

      const project = snapshot.projects?.nodes?.[0];

      queryClient.setQueryData(currentProjectQueryKey, {
        projects: {
          ...snapshot?.projects,
          nodes: [
            {
              ...project,
              projectSocials: {
                ...project?.projectSocials,
                nodes: project?.projectSocials?.nodes?.filter(
                  (social) => social?.rowId !== deletedId,
                ),
              },
            },
          ],
        },
      });
    },
  });

  const { mutateAsync: updateProject, isPending } = useUpdateProjectMutation({
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["Project"] });

      const { name, description, slug, website } = variables.patch;

      const snapshot = queryClient.getQueryData(
        currentProjectQueryKey,
      ) as ProjectQuery;

      const project = snapshot.projects?.nodes?.[0];

      queryClient.setQueryData(currentProjectQueryKey, {
        projects: {
          ...snapshot.projects,
          nodes: [
            {
              ...project,
              name,
              description,
              slug,
              website,
            },
          ],
        },
      });

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
    onSettled,
  });

  const form = useForm({
    ...updateProjectFormOptions({ project: project ?? undefined }),
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
              website: value.website || null,
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

        // TODO: discuss. Although this properly replaces the current entry in the browser's history stack, clicking back button from browser can still send you to wrong project page (properly 404s)
        router.replace(
          `/organizations/${organizationSlug}/projects/${generateSlug(value.name)}/settings`,
        );
      } catch (err) {
        if (isDevEnv) console.error(err);
      }
    },
  });

  return (
    <SectionContainer
      title={updateProjectDetails.title}
      description={updateProjectDetails.description}
    >
      <sigil.form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await form.handleSubmit();
        }}
      >
        <Grid columns={{ base: 1, lg: 2 }} gap={{ base: 4, lg: 8 }}>
          <Stack gap={4}>
            <form.AppField name="name">
              {({ InputField }) => (
                <InputField
                  label={updateProjectDetails.fields.projectName.label}
                />
              )}
            </form.AppField>

            <form.AppField name="description">
              {({ InputField }) => (
                <InputField
                  label={updateProjectDetails.fields.projectDescription.label}
                />
              )}
            </form.AppField>

            <form.AppField name="website">
              {({ UrlField }) => (
                <UrlField
                  icon={FaGlobe}
                  label="Website"
                  placeholder="backfeed.omni.dev"
                  displayRemoveTrigger={false}
                />
              )}
            </form.AppField>
          </Stack>

          {/* @ts-ignore `defaultValues` mismatch because they are dynamic for the form above. Only used for type-checking though when extracted with `formOptions`, see: https://tanstack.com/form/latest/docs/framework/react/guides/form-composition#breaking-big-forms-into-smaller-pieces */}
          <UpdateSocials form={form} projectId={project?.rowId ?? ""} />
        </Grid>

        <form.AppForm>
          <form.SubmitForm
            action={updateProjectDetails.action}
            isPending={isPending}
            mt={4}
          />
        </form.AppForm>
      </sigil.form>

      {/* TODO: when ready to implement `UpdateStatuses` for production, remove the development environment check */}
      <Divider display={isDevEnv ? "inline" : "none"} />

      {/* TODO: move form logic up to provide just one `Update Project` submit button. Use `withForm` to create child form */}
      <UpdateStatuses projectId={project?.rowId!} />
    </SectionContainer>
  );
};

export default UpdateProject;
