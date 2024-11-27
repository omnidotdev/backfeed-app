"use client";

import {
  Grid,
  GridItem,
  Input,
  Select,
  createListCollection,
} from "@omnidev/sigil";
import {} from "nuqs";

import { app } from "lib/config";
import { useSearchParams } from "lib/hooks";

const STATUSES = ["Active", "Beta", "Inactive"];

/**
 * Project filters.
 */
const ProjectFilters = () => {
  const [, setSearchParams] = useSearchParams();

  return (
    <Grid columns={{ base: 1, md: 5 }}>
      <GridItem colSpan={{ base: 1, md: 4 }}>
        <Input
          placeholder={app.projectsPage.filters.search.placeholder}
          onChange={(e) =>
            setSearchParams({
              search: e.target.value.length ? e.target.value.toLowerCase() : "",
            })
          }
        />
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
          // @ts-ignore TODO figure out why this is throwing an error
          onValueChange={({ value }) =>
            setSearchParams({ status: value.length ? value[0] : null })
          }
        />
      </GridItem>
    </Grid>
  );
};

export default ProjectFilters;
