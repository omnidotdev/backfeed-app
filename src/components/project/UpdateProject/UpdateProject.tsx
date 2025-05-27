"use client";

import { Divider, Grid, Stack, sigil } from "@omnidev/sigil";
import {
  keepPreviousData,
  useIsMutating,
  useQueryClient,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { FaGlobe } from "react-icons/fa6";
import { z } from "zod";

import { SectionContainer } from "components/layout";
import { UpdateSocials, UpdateStatuses } from "components/project";
import {
  useCreateProjectSocialMutation,
  useDeleteProjectSocialMutation,
  useUpdateProjectMutation,
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

const updateProjectDetails = app.projectSettingsPage.cta.updateProject;

// TODO adjust schemas in this file after closure on https://linear.app/omnidev/issue/OMNI-166/strategize-runtime-and-server-side-validation-approach and https://linear.app/omnidev/issue/OMNI-167/refine-validation-schemas

const projectSocialSchema = z.object({
  rowId: uuidSchema.or(z.literal("pending")),
  projectId: uuidSchema,
  // NB: need to allow an empty url for inital `pending` placeholder, this allows users to update other aspects of the form without needing to add a project social.
  url: urlSchema.or(z.literal("")),
});

export type ProjectSocial = z.infer<typeof projectSocialSchema>;

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

interface Props {
  /** Authenticated user. */
  user: Session["user"];
}

/**
 * Form for updating project details.
 */
const UpdateProject = ({ user }: Props) => {
  const queryClient = useQueryClient();

  const isUpdatingProject = useIsMutating({ mutationKey: ["Project"] });

  const { organizationSlug, projectSlug } = useParams<{
    organizationSlug: string;
    projectSlug: string;
  }>();

  const router = useRouter();

  const { data: project } = useQuery({
    ...projectOptions({
      projectSlug,
      organizationSlug,
      userId: user?.rowId,
    }),
    placeholderData: keepPreviousData,
    select: (data) => data.projects?.nodes?.[0],
  });

  const { mutateAsync: createProjectSocial } = useCreateProjectSocialMutation({
    mutationKey: ["Project", "CreateProjectSocial"],
  });
  const { mutateAsync: deleteProjectSocial } = useDeleteProjectSocialMutation({
    mutationKey: ["Project", "DeleteProjectSocial"],
  });
  const { mutateAsync: updateProject } = useUpdateProjectMutation({
    mutationKey: ["Project", "UpdateProject"],
  });

  const form = useForm({
    ...updateProjectFormOptions({ project: project ?? undefined }),
    asyncDebounceMs: DEBOUNCE_TIME,
    validators: {
      onSubmitAsync: updateProjectSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      // NB: filter out any socials that were reset
      const currentSocials = value.projectSocials.filter(
        (social) => !!social.url.length,
      );

      try {
        // NB: for project socials we always want to delete existing socials, then create new ones with a dynamic `createdAt` date for proper ordering and eliminating potential duplicate key errors when reordering / updating
        if (project?.projectSocials.nodes.length) {
          await Promise.all(
            project?.projectSocials.nodes?.map((social) =>
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
          currentSocials.map((social, index) =>
            createProjectSocial({
              input: {
                projectSocial: {
                  projectId: social.projectId,
                  url: social.url,
                  // ! NB: we use the created by date to order project statuses throughout the app. This ensures that the created by date will line up with the order defined from the form
                  createdAt: dayjs(new Date()).add(index, "minutes").toDate(),
                },
              },
            }),
          ),
        ]);

        await queryClient.invalidateQueries({ queryKey: ["Project"] });

        formApi.reset();

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
              {({ URLField }) => (
                <URLField
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
            isPending={!!isUpdatingProject}
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
