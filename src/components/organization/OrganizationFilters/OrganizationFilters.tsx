"use client";

import { Grid, GridItem, Input } from "@omnidev/sigil";

import { app } from "lib/config";
import { useSearchParams } from "lib/hooks";

interface Props {
  /** Whether the data is loading. */
  isLoading?: boolean;
  /** Whether an error was encountered while loading the data. */
  isError?: boolean;
}

/**
 * Organization filters.
 */
const OrganizationFilters = ({ isLoading = true, isError = false }: Props) => {
  const [{ search }, setSearchParams] = useSearchParams();

  const isFilterDisabled = isLoading || isError;

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
          disabled={isFilterDisabled}
        />
      </GridItem>
    </Grid>
  );
};

export default OrganizationFilters;
