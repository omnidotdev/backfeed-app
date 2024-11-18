import { Button, Grid, Stack, Text } from "@omnidev/sigil";
import { app } from "lib/config";

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
      <Button variant="outline">Create New Project</Button>
      <Button variant="outline">Manage Team</Button>
      <Button variant="outline">Organization Settings</Button>
    </Grid>
  </Stack>
);

export default OrganizationActions;
