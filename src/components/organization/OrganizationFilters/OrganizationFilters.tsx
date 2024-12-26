"use client";

import { Grid, GridItem, Input } from "@omnidev/sigil";

import { app } from "lib/config";
import { useSearchParams } from "lib/hooks";

/**
 * Organization filters.
 */
const OrganizationFilters = () => {
  const [{ search }, setSearchParams] = useSearchParams();

  return (
    <Grid columns={1} w="full">
      <GridItem colSpan={1}>
        <Input
          borderColor="border.subtle"
          placeholder={app.organizationsPage.filters.search.placeholder}
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

export default OrganizationFilters;
