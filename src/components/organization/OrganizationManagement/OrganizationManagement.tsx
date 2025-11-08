"use client";

import { Button, Grid, Icon } from "@omnidev/sigil";
import { useParams, useRouter } from "next/navigation";
import { FiUserPlus } from "react-icons/fi";
import { HiOutlineFolder, HiOutlineUserGroup } from "react-icons/hi2";
import { LuSettings } from "react-icons/lu";

import { SectionContainer } from "components/layout";
import { app } from "lib/config";
import { useOrganizationMembership } from "lib/hooks";

import type { ButtonProps } from "@omnidev/sigil";
import type { Organization } from "generated/graphql";
import type { Session } from "next-auth";
import type { IconType } from "react-icons";

interface Action extends ButtonProps {
  /** Action label. */
  label: string;
  /** Visual icon. */
  icon: IconType;
}

interface Props {
  /** Authenticated user. */
  user: Session["user"] | undefined;
  /** Organization ID. */
  organizationId: Organization["rowId"];
  /** Whether the user has admin privileges for the organization. */
  hasAdminPrivileges: boolean;
}

const managementDetails = app.organizationPage.management;

/**
 * Organization management.
 */
const OrganizationManagement = ({
  user,
  organizationId,
  hasAdminPrivileges,
}: Props) => {
  const { organizationSlug } = useParams<{ organizationSlug: string }>();
  const router = useRouter();

  const { isMember } = useOrganizationMembership({
    userId: user?.rowId,
    organizationId,
  });

  const ORGANIZATION_ACTIONS: Action[] = [
    {
      label: managementDetails.cta.manageTeam.label,
      icon: HiOutlineUserGroup,
      onClick: () => router.push(`/organizations/${organizationSlug}/members`),
    },
    {
      label: managementDetails.cta.invitations.label,
      icon: FiUserPlus,
      onClick: () =>
        router.push(`/organizations/${organizationSlug}/invitations`),
      disabled: !hasAdminPrivileges,
    },
    {
      label: managementDetails.cta.settings.label,
      icon: LuSettings,
      onClick: () => router.push(`/organizations/${organizationSlug}/settings`),
      disabled: !isMember,
    },
    {
      label: app.organizationPage.header.cta.viewProjects.label,
      icon: HiOutlineFolder,
      onClick: () => router.push(`/organizations/${organizationSlug}/projects`),
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
