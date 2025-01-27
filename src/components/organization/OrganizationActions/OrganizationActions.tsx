"use client";

import { Button, Grid, Icon } from "@omnidev/sigil";
import { useParams, useRouter } from "next/navigation";
import { LuCirclePlus, LuSettings } from "react-icons/lu";
import { MdManageAccounts } from "react-icons/md";

import { SectionContainer } from "components/layout";
import { app } from "lib/config";
import { useAuth, useOrganizationMembership } from "lib/hooks";
import { useDialogStore } from "lib/hooks/store";
import { DialogType } from "store";

import type { ButtonProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";

interface Action extends ButtonProps {
  /** Action label. */
  label: string;
  /** Visual icon. */
  icon: IconType;
}

interface Props {
  /** Organization ID. */
  organizationId: string;
}

/**
 * Organization actions.
 */
const OrganizationActions = ({ organizationId }: Props) => {
  const { organizationSlug } = useParams<{ organizationSlug: string }>();
  const router = useRouter();

  const { user } = useAuth();

  const { setIsOpen: setIsCreateProjectDialogOpen } = useDialogStore({
    type: DialogType.CreateProject,
  });

  const { isAdmin, isMember } = useOrganizationMembership({
    organizationId,
    userId: user?.rowId,
  });

  const ORGANIZATION_ACTIONS: Action[] = [
    {
      label: app.organizationPage.actions.cta.createProject.label,
      icon: LuCirclePlus,
      onClick: () => setIsCreateProjectDialogOpen(true),
      disabled: !isAdmin,
    },
    {
      label: app.organizationPage.actions.cta.manageTeam.label,
      icon: MdManageAccounts,
      disabled: true,
    },
    {
      label: app.organizationPage.actions.cta.settings.label,
      icon: LuSettings,
      onClick: () => router.push(`/organizations/${organizationSlug}/settings`),
    },
  ];

  return (
    <SectionContainer
      title={app.organizationPage.actions.title}
      description={app.organizationPage.actions.description}
    >
      <Grid gap={4}>
        {ORGANIZATION_ACTIONS.map(({ label, icon, ...rest }) => (
          <Button key={label} variant="outline" {...rest}>
            <Icon src={icon} w={4} h={4} />

            {label}
          </Button>
        ))}
      </Grid>
    </SectionContainer>
  );
};

export default OrganizationActions;
