import {
  keepPreviousData,
  useIsMutating,
  useQuery,
} from "@tanstack/react-query";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { LuGlobe } from "react-icons/lu";

import SectionContainer from "@/components/layout/SectionContainer";
import UpdateLinks from "@/components/project/UpdateLinks";
import {
  SwitchControl,
  SwitchHiddenInput,
  SwitchRoot,
  SwitchThumb,
} from "@/components/ui/switch";
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
import toaster from "@/lib/util/toaster";

import type { ProjectLink } from "@/lib/form/updateProjectOptions";

const projectSettingsRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout/projects/$projectSlug/settings",
);

const updateProjectDetails = app.projectSettingsPage.cta.updateProject;

/**
 * Form for updating project details.
 */
const UpdateProject = () => {
  const { queryClient, organizationId } =
    projectSettingsRoute.useRouteContext();
  const { workspaceSlug, projectSlug } = projectSettingsRoute.useParams();
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
      prefix: project?.prefix ?? "",
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
      if (!project?.rowId) return;

      // keep non-empty links, deduped by URL: the project_link table has a
      // unique (url, projectId) index, so duplicates would fail the create and
      // (previously) abort the whole save
      const seenUrls = new Set<string>();
      const currentLinks = value.projectLinks.filter((link) => {
        const url = link.url?.trim();
        if (!url || seenUrls.has(url)) return false;
        seenUrls.add(url);
        return true;
      });

      try {
        // save the project details first so name/description/prefix persist
        // independently of the links (a link error no longer drops them)
        await updateProject({
          rowId: project.rowId,
          patch: {
            name: value.name,
            description: value.description ?? null,
            prefix: value.prefix || null,
            slug: generateSlug(value.name)!,
            updatedAt: new Date(),
          },
        });

        // replace the links: delete the existing set, then recreate the current
        if (project.projectLinks.nodes.length) {
          await Promise.all(
            project.projectLinks.nodes.map((link) =>
              deleteProjectLink({ linkId: link?.rowId! }),
            ),
          );
        }

        await Promise.all(
          currentLinks.map((link, index) =>
            createProjectLink({
              input: {
                projectLink: {
                  projectId: project.rowId,
                  url: link.url.trim(),
                  title: link.title || null,
                  order: index,
                },
              },
            }),
          ),
        );

        await queryClient.invalidateQueries({ queryKey: ["Project"] });

        formApi.reset();

        toaster.success({ title: "Project updated" });

        navigate({
          to: "/workspaces/$workspaceSlug/projects/$projectSlug/settings",
          params: { workspaceSlug, projectSlug: generateSlug(value.name)! },
          replace: true,
        });
      } catch (err) {
        if (isDevEnv) console.error(err);

        toaster.error({
          title: "Could not update project",
          description: "Please try again.",
        });
      }
    },
  });

  return (
    <>
      <SectionContainer
        title={updateProjectDetails.title}
        description={updateProjectDetails.description}
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            await form.handleSubmit();
          }}
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col gap-4">
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

              <form.AppField name="prefix">
                {({ InputField }) => (
                  <InputField
                    label={updateProjectDetails.fields.projectPrefix.label}
                    placeholder={project?.slug?.toUpperCase()}
                  />
                )}
              </form.AppField>
            </div>

            <UpdateLinks form={form} projectId={project?.rowId!} />
          </div>

          <form.AppForm>
            <form.SubmitForm
              action={updateProjectDetails.action}
              isPending={!!isUpdatingProject}
              className="mt-4 ml-auto"
            />
          </form.AppForm>
        </form>
      </SectionContainer>

      <SectionContainer
        title="Visibility"
        description="Control who can see this project. Boards are public by default"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LuGlobe className="size-4" />
            <div className="flex flex-col">
              <span className="font-medium text-sm">Public</span>
              <span className="text-muted-foreground text-xs">
                {project?.isPublic
                  ? "Anyone with the link can view"
                  : "Only workspace members can access"}
              </span>
            </div>
          </div>

          <SwitchRoot
            checked={project?.isPublic ?? true}
            onCheckedChange={async (details) => {
              await updateProject({
                rowId: project?.rowId!,
                patch: { isPublic: details.checked },
              });
              await queryClient.invalidateQueries({ queryKey: ["Project"] });
            }}
          >
            <SwitchControl>
              <SwitchThumb />
            </SwitchControl>
            <SwitchHiddenInput />
          </SwitchRoot>
        </div>
      </SectionContainer>
    </>
  );
};

export default UpdateProject;
