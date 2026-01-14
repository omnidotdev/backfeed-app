import { Grid, Stack, sigil } from "@omnidev/sigil";
import {
  keepPreviousData,
  useIsMutating,
  useQuery,
} from "@tanstack/react-query";
import {
  useNavigate,
  useParams,
  useRouteContext,
} from "@tanstack/react-router";
import dayjs from "dayjs";
import { FaGlobe } from "react-icons/fa6";

import SectionContainer from "@/components/layout/SectionContainer";
import UpdateSocials from "@/components/project/UpdateSocials";
import {
  useCreateProjectSocialMutation,
  useDeleteProjectSocialMutation,
  useUpdateProjectMutation,
} from "@/generated/graphql";
import app from "@/lib/config/app.config";
import { isDevEnv } from "@/lib/config/env.config";
import DEBOUNCE_TIME from "@/lib/constants/debounceTime.constant";
import { updateProjectOptions } from "@/lib/form/updateProjectOptions";
import useForm from "@/lib/hooks/useForm";
import { projectOptions } from "@/lib/options/projects";
import generateSlug from "@/lib/util/generateSlug";

import type { ProjectSocial } from "@/lib/form/updateProjectOptions";

const updateProjectDetails = app.projectSettingsPage.cta.updateProject;

/**
 * Form for updating project details.
 */
const UpdateProject = () => {
  const { queryClient, organizationId } = useRouteContext({
    from: "/_public/workspaces/$workspaceSlug/_layout/projects/$projectSlug/settings",
  });
  const { workspaceSlug, projectSlug } = useParams({
    from: "/_public/workspaces/$workspaceSlug/_layout/projects/$projectSlug/settings",
  });
  const navigate = useNavigate();

  const isUpdatingProject = useIsMutating({ mutationKey: ["Project"] });

  const { data: project } = useQuery({
    ...projectOptions({
      projectSlug,
      organizationId,
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

  const DEFAULT_PENDING_SOCIAL: ProjectSocial = {
    rowId: "pending",
    projectId: project?.rowId ?? "",
    url: "",
  };

  const form = useForm({
    ...updateProjectOptions,
    defaultValues: {
      name: project?.name ?? "",
      description: project?.description ?? "",
      website: project?.website ?? "",
      projectSocials: (project?.projectSocials?.nodes?.length
        ? project?.projectSocials?.nodes
        : [DEFAULT_PENDING_SOCIAL]) as ProjectSocial[],
      organizationId,
      currentSlug: project?.slug ?? "",
    },
    asyncDebounceMs: DEBOUNCE_TIME,
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

        navigate({
          to: "/workspaces/$workspaceSlug/projects/$projectSlug/settings",
          params: { workspaceSlug, projectSlug: generateSlug(value.name)! },
          replace: true,
        });
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

          <UpdateSocials form={form} projectId={project?.rowId!} />
        </Grid>

        <form.AppForm>
          <form.SubmitForm
            action={updateProjectDetails.action}
            isPending={!!isUpdatingProject}
            mt={4}
          />
        </form.AppForm>
      </sigil.form>
    </SectionContainer>
  );
};

export default UpdateProject;
