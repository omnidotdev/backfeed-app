import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { FiUserPlus } from "react-icons/fi";
import { HiOutlineFolder, HiOutlineUserGroup } from "react-icons/hi2";
import { LuSettings } from "react-icons/lu";

import SectionContainer from "@/components/layout/SectionContainer";
import { Button } from "@/components/ui/button";
import app from "@/lib/config/app.config";

import type { IconType } from "react-icons";

const workspaceLayoutRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout/",
);

interface Action {
  /** Action label. */
  label: string;
  /** Visual icon. */
  icon: IconType;
  /** Click handler. */
  onClick?: () => void;
  /** Whether the action is disabled. */
  disabled?: boolean;
}

const managementDetails = app.workspacePage.management;

/**
 * Workspace management.
 */
const WorkspaceManagement = () => {
  const { workspaceSlug } = workspaceLayoutRoute.useParams();
  const { role } = workspaceLayoutRoute.useRouteContext();
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
      <div className="grid gap-4">
        {WORKSPACE_ACTIONS.filter(({ disabled }) => !disabled).map(
          ({ label, icon: ActionIcon, ...rest }) => (
            <Button
              key={label}
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 dark:text-[var(--colors-brand-primary-400)]"
              {...rest}
            >
              <ActionIcon className="size-4" />

              {label}
            </Button>
          ),
        )}
      </div>
    </SectionContainer>
  );
};

export default WorkspaceManagement;
