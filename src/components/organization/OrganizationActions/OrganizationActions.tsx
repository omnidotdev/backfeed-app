import { Button, Grid, Icon } from "@omnidev/sigil";
import { LuPlusCircle, LuSettings } from "react-icons/lu";
import { MdManageAccounts } from "react-icons/md";

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

const ORGANIZATION_ACTIONS: Action[] = [
  {
    label: app.organizationPage.actions.cta.createProject.label,
    icon: LuPlusCircle,
  },
  {
    label: app.organizationPage.actions.cta.manageTeam.label,
    icon: MdManageAccounts,
  },
  {
    label: app.organizationPage.actions.cta.settings.label,
    icon: LuSettings,
  },
];

/**
 * Organization actions.
 */
const OrganizationActions = () => (
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

export default OrganizationActions;
