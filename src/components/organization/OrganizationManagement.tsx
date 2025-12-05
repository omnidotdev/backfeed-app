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
import useOrganizationMembership from "@/lib/hooks/useOrganizationMembership";

import type { ButtonProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";

interface Action extends ButtonProps {
  /** Action label. */
  label: string;
  /** Visual icon. */
  icon: IconType;
}

const managementDetails = app.organizationPage.management;

/**
 * Organization management.
 */
const OrganizationManagement = () => {
  const { organizationSlug } = useParams({
    from: "/_auth/organizations/$organizationSlug/_layout/",
  });
  const { session } = useRouteContext({
    from: "/_auth/organizations/$organizationSlug/_layout/",
  });
  const { organizationId, hasAdminPrivileges } = useRouteContext({
    from: "/_auth/organizations/$organizationSlug/_layout/",
  });
  const navigate = useNavigate();

  const { isMember } = useOrganizationMembership({
    userId: session?.user?.rowId,
    organizationId,
  });

  const ORGANIZATION_ACTIONS: Action[] = [
    {
      label: managementDetails.cta.manageTeam.label,
      icon: HiOutlineUserGroup,
      onClick: () =>
        navigate({
          to: "/organizations/$organizationSlug/members",
          params: { organizationSlug },
        }),
    },
    {
      label: managementDetails.cta.invitations.label,
      icon: FiUserPlus,
      onClick: () =>
        navigate({
          to: "/organizations/$organizationSlug/invitations",
          params: { organizationSlug },
        }),
      disabled: !hasAdminPrivileges,
    },
    {
      label: managementDetails.cta.settings.label,
      icon: LuSettings,
      onClick: () =>
        navigate({
          to: "/organizations/$organizationSlug/settings",
          params: { organizationSlug },
        }),
      disabled: !isMember,
    },
    {
      label: app.organizationPage.header.cta.viewProjects.label,
      icon: HiOutlineFolder,
      onClick: () =>
        navigate({
          to: "/organizations/$organizationSlug/projects",
          params: { organizationSlug },
        }),
      disabled: isMember,
    },
  ];

  return (
    <SectionContainer
      title={
        isMember ? managementDetails.title.member : managementDetails.title.anon
      }
      description={
        isMember
          ? managementDetails.description.member
          : managementDetails.description.anon
      }
    >
      <Grid gap={4}>
        {ORGANIZATION_ACTIONS.filter(({ disabled }) => !disabled).map(
          ({ label, icon, ...rest }) => (
            <Button key={label} variant="outline" {...rest}>
              <Icon src={icon} w={4} h={4} />

              {label}
            </Button>
          ),
        )}
      </Grid>
    </SectionContainer>
  );
};

export default OrganizationManagement;
