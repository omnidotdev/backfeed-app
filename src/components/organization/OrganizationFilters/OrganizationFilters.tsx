"use client";

import { Grid, GridItem, Input } from "@omnidev/sigil";

import { app } from "lib/config";
import { useHandleSearch, useSearchParams } from "lib/hooks";

/**
 * Organization filters.
 */
const OrganizationFilters = () => {
  const [{ search }] = useSearchParams();

  const onSearchChange = useHandleSearch();

  return (
    <Grid columns={1} w="full">
      <GridItem colSpan={1}>
        <Input
          borderColor="border.subtle"
          placeholder={app.organizationsPage.filters.search.placeholder}
          defaultValue={search}
          onChange={onSearchChange}
        />
      </GridItem>
    </Grid>
  );
};

export default OrganizationFilters;
