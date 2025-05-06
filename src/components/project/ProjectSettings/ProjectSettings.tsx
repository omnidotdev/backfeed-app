"use client";

import { Divider, Stack } from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { DangerZoneAction } from "components/core";
import { SectionContainer } from "components/layout";
import { UpdateProject } from "components/project";
import {
  Role,
  useDeleteProjectMutation,
  useOrganizationsQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

import type { DestructiveActionProps } from "components/core";
import type { Organization, Project } from "generated/graphql";

const deleteProjectDetails = app.projectSettingsPage.cta.deleteProject;

interface Props {
  /** Project ID. */
  projectId: Project["rowId"];
  /** Organization slug. */
  organizationSlug: Organization["slug"];
  /** If the user has permission to edit the project statuses. */
  canEditStatuses: boolean;
}

/**
 * Project settings.
 */
const ProjectSettings = ({
  projectId,
  organizationSlug,
  canEditStatuses,
}: Props) => {
  const { user } = useAuth();

  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate: deleteProject } = useDeleteProjectMutation({
    onMutate: () =>
      router.replace(`/organizations/${organizationSlug}/projects`),
    onSettled: () => {
      // ! NB: needed to invalidate the number of projects for an organization in the `CreateProject` dialog
      queryClient.invalidateQueries({
        queryKey: useOrganizationsQuery.getKey({
          userId: user?.rowId!,
          isMember: true,
          slug: organizationSlug,
          excludeRoles: [Role.Member],
        }),
      });
      queryClient.invalidateQueries({
        queryKey: ["Projects"],
      });
    },
  });

  const DELETE_PROJECT: DestructiveActionProps = {
    title: deleteProjectDetails.destructiveAction.title,
    description: deleteProjectDetails.destructiveAction.description,
    triggerLabel: deleteProjectDetails.destructiveAction.actionLabel,
    destructiveInput: deleteProjectDetails.destructiveAction.prompt,
    action: {
      label: deleteProjectDetails.destructiveAction.actionLabel,
      onClick: () => deleteProject({ rowId: projectId }),
    },
  };

  return (
    <Stack gap={6}>
      <UpdateProject canEditStatuses={canEditStatuses} />

      <SectionContainer
        title={app.projectSettingsPage.dangerZone.title}
        description={app.projectSettingsPage.dangerZone.description}
        outline="1px solid"
        outlineColor="omni.ruby"
      >
        <Divider />

        <DangerZoneAction
          title={deleteProjectDetails.title}
          description={deleteProjectDetails.description}
          actionProps={DELETE_PROJECT}
        />
      </SectionContainer>
    </Stack>
  );
};

export default ProjectSettings;
