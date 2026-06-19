import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";

import SectionContainer from "@/components/layout/SectionContainer";
import {
  SwitchControl,
  SwitchHiddenInput,
  SwitchRoot,
  SwitchThumb,
} from "@/components/ui/switch";
import { useUpdateProjectMutation } from "@/generated/graphql";
import { projectOptions } from "@/lib/options/projects";
import toaster from "@/lib/util/toaster";

import type { ProjectQuery } from "@/generated/graphql";

const settingsRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout/projects/$projectSlug/settings",
);

interface FeatureToggle {
  key: "showRoadmap" | "showChangelog";
  label: string;
  description: string;
}

const FEATURES: FeatureToggle[] = [
  {
    key: "showRoadmap",
    label: "Roadmap",
    description: "A public board of what you're working on, grouped by status.",
  },
  {
    key: "showChangelog",
    label: "Changelog",
    description: "A public feed of shipped feedback, newest first.",
  },
];

/**
 * Project feature visibility. Toggles the public roadmap and changelog views per
 * project (both default on). Hiding one removes its link and 404s its route.
 */
const ProjectFeatures = () => {
  const { organizationId } = settingsRoute.useRouteContext();
  const { projectSlug } = settingsRoute.useParams();
  const queryClient = useQueryClient();

  const projectQueryKey = projectOptions({
    organizationId,
    projectSlug,
  }).queryKey;

  const { data: project } = useQuery({
    ...projectOptions({ organizationId, projectSlug }),
    select: (data) => data?.projects?.nodes?.[0],
  });

  const { mutate: updateProject } = useUpdateProjectMutation({
    // optimistically flip the switch so it responds instantly, then reconcile
    onMutate: async ({ patch }) => {
      await queryClient.cancelQueries({ queryKey: projectQueryKey });
      const previous = queryClient.getQueryData<ProjectQuery>(projectQueryKey);

      queryClient.setQueryData<ProjectQuery>(projectQueryKey, (old) =>
        old?.projects?.nodes?.length
          ? {
              ...old,
              projects: {
                ...old.projects,
                nodes: old.projects.nodes.map((node, index) =>
                  index === 0 && node
                    ? {
                        ...node,
                        showRoadmap: patch.showRoadmap ?? node.showRoadmap,
                        showChangelog:
                          patch.showChangelog ?? node.showChangelog,
                      }
                    : node,
                ),
              },
            }
          : old,
      );

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(projectQueryKey, context.previous);
      }
      toaster.error({ title: "Could not update features" });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["Project"] }),
  });

  const toggle = (patch: Partial<Record<FeatureToggle["key"], boolean>>) => {
    if (!project?.rowId) return;
    updateProject({ rowId: project.rowId, patch });
  };

  return (
    <SectionContainer
      title="Features"
      description="Choose which public views are available for this project."
    >
      <div className="flex flex-col gap-2">
        {FEATURES.map((feature) => (
          <div
            key={feature.key}
            className="flex items-center justify-between gap-4 rounded-lg border border-border-subtle p-4"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-sm">{feature.label}</span>
              <span className="text-foreground-subtle text-sm">
                {feature.description}
              </span>
            </div>

            <SwitchRoot
              aria-label={`Show ${feature.label}`}
              checked={project?.[feature.key] !== false}
              disabled={!project}
              onCheckedChange={({ checked }) =>
                toggle({ [feature.key]: checked })
              }
            >
              <SwitchControl>
                <SwitchThumb />
              </SwitchControl>
              <SwitchHiddenInput />
            </SwitchRoot>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default ProjectFeatures;
