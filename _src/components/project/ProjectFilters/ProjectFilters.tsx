"use client";

import { Grid, GridItem, Input } from "@omnidev/sigil";

import { app } from "lib/config";
import { useHandleSearch, useSearchParams } from "lib/hooks";

/**
 * Project filters.
 */
const ProjectFilters = () => {
  const [{ search }] = useSearchParams();

  const onSearchChange = useHandleSearch();

  return (
    <Grid w="full">
      <GridItem>
        <Input
          borderColor="border.subtle"
          placeholder={app.projectsPage.filters.search.placeholder}
          defaultValue={search}
          onChange={onSearchChange}
        />
      </GridItem>
    </Grid>
  );
};

export default ProjectFilters;
