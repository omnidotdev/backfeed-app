"use client";

import { Divider, Stack } from "@omnidev/sigil";

import { DangerZoneAction } from "components/core";
import { SectionContainer } from "components/layout";
import { UpdateProject } from "components/project";
import { useDeleteProjectMutation } from "generated/graphql";
import { app } from "lib/config";

import type { DestructiveActionProps } from "components/core";
import type { Organization, Project } from "generated/graphql";
import { useRouter } from "next/navigation";

const deleteProjectDetails = app.projectSettingsPage.cta.deleteProject;

interface Props {
  /** Project ID. */
  projectId: Project["rowId"];
  /** Organization slug. */
  organizationSlug: Organization["slug"];
}

/**
 * Destructive actions for projects.
 */
const ProjectSettings = ({ projectId, organizationSlug }: Props) => {
  const router = useRouter();

  const { mutate: deleteProject } = useDeleteProjectMutation({
    onMutate: () =>
      router.replace(`/organizations/${organizationSlug}/projects`),
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
      <UpdateProject />

      <SectionContainer
        title={app.projectSettingsPage.dangerZone.title}
        description={app.projectSettingsPage.dangerZone.description}
        border="1px solid"
        borderColor="omni.ruby"
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
