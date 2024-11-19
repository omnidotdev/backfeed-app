import { Button, Grid, Icon, Stack, Text } from "@omnidev/sigil";
import { app } from "lib/config";
import { LuPlusCircle, LuSettings } from "react-icons/lu";
import { MdManageAccounts } from "react-icons/md";

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
  <Stack
    bgColor="background.default"
    borderRadius="lg"
    boxShadow="lg"
    borderColor="border.subtle"
    p={6}
    gap={6}
  >
    <Stack>
      <Text fontSize="2xl" fontWeight="semibold" lineHeight={1.2}>
        {app.organizationPage.actions.title}
      </Text>

      <Text color="foreground.subtle" fontSize="sm">
        {app.organizationPage.actions.description}
      </Text>
    </Stack>

    <Grid gap={4}>
      {ORGANIZATION_ACTIONS.map(({ label, icon, ...rest }) => (
        <Button key={label} variant="outline" {...rest}>
          <Icon src={icon} w={4} h={4} />
          {label}
        </Button>
      ))}
    </Grid>
  </Stack>
);

export default OrganizationActions;
