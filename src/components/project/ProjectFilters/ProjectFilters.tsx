import {
  Grid,
  GridItem,
  Input,
  Select,
  createListCollection,
} from "@omnidev/sigil";

import { app } from "lib/config";

const STATUSES = ["Active", "Beta", "Inactive"];

/**
 * Project filters.
 */
const ProjectFilters = () => (
  <Grid columns={{ base: 1, md: 5 }}>
    <GridItem colSpan={{ base: 1, md: 4 }}>
      <Input placeholder={app.projectsPage.filters.search.placeholder} />
    </GridItem>

    <GridItem colSpan={1}>
      <Select
        label={app.projectsPage.filters.select.status.label}
        // @ts-ignore TODO figure out why this is throwing an error
        collection={createListCollection({
          items: STATUSES.map((status) => ({ label: status, value: status })),
        })}
        displayFieldLabel={false}
        displayGroupLabel={false}
        valueTextProps={{
          placeholder: "Select a status",
        }}
      />
    </GridItem>
  </Grid>
);

export default ProjectFilters;
