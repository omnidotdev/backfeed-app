import { Button, Grid, Icon } from "@omnidev/sigil";
import {
  useNavigate,
  useParams,
  useRouteContext,
} from "@tanstack/react-router";
import { FiUserPlus } from "react-icons/fi";
import { HiOutlineFolder, HiOutlineUserGroup } from "react-icons/hi2";
import { LuSettings } from "react-icons/lu";

import SectionContainer from "@/components/layout/SectionContainer";
import app from "@/lib/config/app.config";

import type { ButtonProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";

interface Action extends ButtonProps {
  /** Action label. */
  label: string;
  /** Visual icon. */
  icon: IconType;
}

const managementDetails = app.workspacePage.management;

/**
 * Workspace management.
 */
const WorkspaceManagement = () => {
  const { workspaceSlug } = useParams({
    from: "/_public/workspaces/$workspaceSlug/_layout/",
  });
  const { role } = useRouteContext({
    from: "/_public/workspaces/$workspaceSlug/_layout/",
  });
  const navigate = useNavigate();

  const WORKSPACE_ACTIONS: Action[] = [
    {
      label: managementDetails.cta.manageTeam.label,
      icon: HiOutlineUserGroup,
      onClick: () =>
        navigate({
          to: "/workspaces/$workspaceSlug/members",
          params: { workspaceSlug },
        }),
    },
    // TODO: re-enable when per-seat pricing is implemented
    {
      label: managementDetails.cta.invitations.label,
      icon: FiUserPlus,
      // onClick: () =>
      //   navigate({
      //     to: "/workspaces/$workspaceSlug/invitations",
      //     params: { workspaceSlug },
      //   }),
      disabled: true,
    },
    {
      label: managementDetails.cta.settings.label,
      icon: LuSettings,
      onClick: () =>
        navigate({
          to: "/workspaces/$workspaceSlug/settings",
          params: { workspaceSlug },
        }),
      disabled: !role,
    },
    {
      label: app.workspacePage.header.cta.viewProjects.label,
      icon: HiOutlineFolder,
      onClick: () =>
        navigate({
          to: "/workspaces/$workspaceSlug/projects",
          params: { workspaceSlug },
        }),
      disabled: !!role,
    },
  ];

  return (
    <SectionContainer
      title={
        role ? managementDetails.title.member : managementDetails.title.anon
      }
      description={
        role
          ? managementDetails.description.member
          : managementDetails.description.anon
      }
    >
      <Grid gap={4}>
        {WORKSPACE_ACTIONS.filter(({ disabled }) => !disabled).map(
          ({ label, icon, ...rest }) => (
            <Button
              key={label}
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
              {...rest}
            >
              <Icon src={icon} w={4} h={4} />

              {label}
            </Button>
          ),
        )}
      </Grid>
    </SectionContainer>
  );
};

export default WorkspaceManagement;
