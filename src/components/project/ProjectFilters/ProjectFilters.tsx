"use client";

import { Grid, GridItem, Input } from "@omnidev/sigil";

import { app } from "lib/config";
import { useSearchParams } from "lib/hooks";

/**
 * Project filters.
 */
const ProjectFilters = () => {
  const [{ search }, setSearchParams] = useSearchParams();

  return (
    <Grid w="full">
      <GridItem>
        <Input
          borderColor="border.subtle"
          placeholder={app.projectsPage.filters.search.placeholder}
          defaultValue={search}
          onChange={(e) =>
            setSearchParams({
              search: e.target.value.length ? e.target.value.toLowerCase() : "",
            })
          }
        />
      </GridItem>
    </Grid>
  );
};

export default ProjectFilters;
