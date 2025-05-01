"use client";

import { Button, Grid, Icon } from "@omnidev/sigil";
import { useParams, useRouter } from "next/navigation";
import { FiUserPlus } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LuSettings } from "react-icons/lu";

import { SectionContainer } from "components/layout";
import { app } from "lib/config";

import type { ButtonProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";

interface Action extends ButtonProps {
  /** Action label. */
  label: string;
  /** Visual icon. */
  icon: IconType;
}

interface Props {
  /** Whether the user has admin privileges for the organization. */
  hasAdminPrivileges: boolean;
}

/**
 * Organization management.
 */
const OrganizationManagement = ({ hasAdminPrivileges }: Props) => {
  const { organizationSlug } = useParams<{ organizationSlug: string }>();
  const router = useRouter();

  const ORGANIZATION_ACTIONS: Action[] = [
    {
      label: app.organizationPage.management.cta.manageTeam.label,
      icon: HiOutlineUserGroup,
      onClick: () => router.push(`/organizations/${organizationSlug}/members`),
    },
    {
      label: app.organizationPage.management.cta.invitations.label,
      icon: FiUserPlus,
      onClick: () =>
        router.push(`/organizations/${organizationSlug}/invitations`),
      disabled: !hasAdminPrivileges,
    },
    {
      label: app.organizationPage.management.cta.settings.label,
      icon: LuSettings,
      onClick: () => router.push(`/organizations/${organizationSlug}/settings`),
    },
  ];

  return (
    <SectionContainer
      title={app.organizationPage.management.title}
      description={app.organizationPage.management.description}
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
