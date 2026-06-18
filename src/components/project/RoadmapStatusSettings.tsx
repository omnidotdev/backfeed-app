import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";

import SectionContainer from "@/components/layout/SectionContainer";
import {
  SwitchControl,
  SwitchHiddenInput,
  SwitchRoot,
  SwitchThumb,
} from "@/components/ui/switch";
import { useUpdateStatusTemplateMutation } from "@/generated/graphql";
import { isStatusOnRoadmap } from "@/lib/constants/roadmap.constant";
import { projectStatusesOptions } from "@/lib/options/projects";
import toaster from "@/lib/util/toaster";

const settingsRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout/projects/$projectSlug/settings",
);

/**
 * Roadmap status visibility. Lets admins choose which statuses appear on the
 * public roadmap, overriding the default curation (building statuses shown,
 * intake/closed hidden). Statuses are workspace-level, so this applies to every
 * project's roadmap in the workspace.
 */
const RoadmapStatusSettings = () => {
  const { organizationId, queryClient } = settingsRoute.useRouteContext();

  const { data: statuses } = useQuery({
    ...projectStatusesOptions({ organizationId }),
    select: (data) => data?.statusTemplates?.nodes ?? [],
  });

  const { mutate: updateStatus } = useUpdateStatusTemplateMutation({
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: projectStatusesOptions({ organizationId }).queryKey,
      }),
    onError: () =>
      toaster.error({ title: "Could not update roadmap visibility" }),
  });

  return (
    <SectionContainer
      title="Roadmap"
      description="Choose which statuses appear on the public roadmap. Applies across the workspace."
    >
      <div className="flex flex-col gap-2">
        {statuses?.map((status) => (
          <div
            key={status?.rowId}
            className="flex items-center justify-between gap-3 rounded-lg border border-border-subtle px-3 py-2"
          >
            <div className="flex min-w-0 items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{
                  backgroundColor:
                    status?.color ?? "var(--color-muted-foreground)",
                }}
              />
              <span className="truncate font-medium text-sm">
                {status?.displayName}
              </span>
            </div>

            <SwitchRoot
              checked={isStatusOnRoadmap({
                name: status?.name,
                showOnRoadmap: status?.showOnRoadmap,
              })}
              onCheckedChange={({ checked }) =>
                updateStatus({
                  rowId: status?.rowId!,
                  patch: { showOnRoadmap: checked },
                })
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

export default RoadmapStatusSettings;
