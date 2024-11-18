import { Card, Button, Grid } from "@omnidev/sigil";
import { app } from "lib/config";

const OrganizationActions = () => {
  return (
    <Card
      title={app.organizationPage.actions.title}
      description={app.organizationPage.actions.description}
    >
      <Grid gap={4}>
        <Button variant="outline">Create New Project</Button>
        <Button variant="outline">Manage Team</Button>
        <Button variant="outline">Organization Settings</Button>
      </Grid>
    </Card>
  );
};

export default OrganizationActions;
