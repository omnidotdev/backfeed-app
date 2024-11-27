"use client";

import {
  Grid,
  GridItem,
  Input,
  Select,
  createListCollection,
} from "@omnidev/sigil";
import { parseAsString, useQueryState } from "nuqs";

import { app } from "lib/config";

const STATUSES = ["Active", "Beta", "Inactive"];

/**
 * Project filters.
 */
const ProjectFilters = () => {
  const [, setStatus] = useQueryState("status", parseAsString);
  const [, setSearch] = useQueryState("search", parseAsString.withDefault(""));

  return (
    <Grid columns={{ base: 1, md: 5 }}>
      <GridItem colSpan={{ base: 1, md: 4 }}>
        <Input
          placeholder={app.projectsPage.filters.search.placeholder}
          onChange={(e) =>
            setSearch(e.target.value.length ? e.target.value.toLowerCase() : "")
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
            value?.length ? setStatus(value[0]) : setStatus(null)
          }
        />
      </GridItem>
    </Grid>
  );
};

export default ProjectFilters;
