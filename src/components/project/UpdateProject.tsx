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

import SectionContainer from "@/components/layout/SectionContainer";
import UpdateLinks from "@/components/project/UpdateLinks";
import {
  useCreateProjectLinkMutation,
  useDeleteProjectLinkMutation,
  useUpdateProjectMutation,
} from "@/generated/graphql";
import app from "@/lib/config/app.config";
import { isDevEnv } from "@/lib/config/env.config";
import DEBOUNCE_TIME from "@/lib/constants/debounceTime.constant";
import { updateProjectOptions } from "@/lib/form/updateProjectOptions";
import useForm from "@/lib/hooks/useForm";
import { projectOptions } from "@/lib/options/projects";
import generateSlug from "@/lib/util/generateSlug";

import type { ProjectLink } from "@/lib/form/updateProjectOptions";

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

  const { mutateAsync: createProjectLink } = useCreateProjectLinkMutation({
    mutationKey: ["Project", "CreateProjectLink"],
  });
  const { mutateAsync: deleteProjectLink } = useDeleteProjectLinkMutation({
    mutationKey: ["Project", "DeleteProjectLink"],
  });
  const { mutateAsync: updateProject } = useUpdateProjectMutation({
    mutationKey: ["Project", "UpdateProject"],
  });

  const DEFAULT_PENDING_LINK: ProjectLink = {
    rowId: `pending-${Date.now()}`,
    projectId: project?.rowId ?? "",
    url: "",
    order: 0,
  };

  const form = useForm({
    ...updateProjectOptions,
    defaultValues: {
      name: project?.name ?? "",
      description: project?.description ?? "",
      projectLinks: (project?.projectLinks?.nodes?.length
        ? project?.projectLinks?.nodes.map((link, index) => ({
            ...link,
            order: link?.order ?? index,
          }))
        : [DEFAULT_PENDING_LINK]) as ProjectLink[],
      organizationId,
      currentSlug: project?.slug ?? "",
    },
    asyncDebounceMs: DEBOUNCE_TIME,
    onSubmit: async ({ value, formApi }) => {
      // Filter out any links that were reset (empty URLs)
      const currentLinks = value.projectLinks.filter(
        (link) => !!link.url.length,
      );

      try {
        // Delete existing links, then create new ones with proper order
        if (project?.projectLinks.nodes.length) {
          await Promise.all(
            project?.projectLinks.nodes?.map((link) =>
              deleteProjectLink({
                linkId: link?.rowId!,
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
              updatedAt: new Date(),
            },
          }),
          ...currentLinks.map((link, index) =>
            createProjectLink({
              input: {
                projectLink: {
                  projectId: link.projectId,
                  url: link.url,
                  title: link.title || null,
                  order: index,
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
          </Stack>

          <UpdateLinks form={form} projectId={project?.rowId!} />
        </Grid>

        <form.AppForm>
          <form.SubmitForm
            action={updateProjectDetails.action}
            isPending={!!isUpdatingProject}
            mt={4}
            ml="auto"
          />
        </form.AppForm>
      </sigil.form>
    </SectionContainer>
  );
};

export default UpdateProject;
