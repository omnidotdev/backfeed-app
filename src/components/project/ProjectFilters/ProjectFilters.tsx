"use client";

import {
  Grid,
  GridItem,
  Input,
  Select,
  createListCollection,
} from "@omnidev/sigil";

import { app } from "lib/config";
import { useSearchParams } from "lib/hooks";

const STATUSES = ["Active", "Beta", "Inactive"];

interface Props {
  /** Whether the data is loading. */
  isLoading?: boolean;
  /** Whether an error was encountered while loading the data. */
  isError?: boolean;
}

/**
 * Project filters.
 */
const ProjectFilters = ({ isLoading = true, isError = false }: Props) => {
  const [{ status, search }, setSearchParams] = useSearchParams();

  const isFilterDisabled = isLoading || isError;

  return (
    <Grid columns={{ base: 1, lg: 5 }} w="full">
      <GridItem colSpan={{ base: 1, lg: 4 }}>
        <Input
          borderColor="border.subtle"
          placeholder={app.projectsPage.filters.search.placeholder}
          defaultValue={search}
          onChange={(e) =>
            setSearchParams({
              search: e.target.value.length ? e.target.value.toLowerCase() : "",
            })
          }
          disabled={isFilterDisabled}
        />
      </GridItem>

      <GridItem colSpan={1}>
        <Select
          label={app.projectsPage.filters.select.status.label}
          collection={createListCollection({
            items: STATUSES.map((status) => ({ label: status, value: status })),
          })}
          displayFieldLabel={false}
          displayGroupLabel={false}
          valueTextProps={{
            placeholder: "Select a status",
          }}
          triggerProps={{
            borderColor: "border.subtle",
          }}
          defaultValue={status ? [status] : []}
          onValueChange={({ value }) =>
            setSearchParams({ status: value.length ? value[0] : null })
          }
          disabled={isFilterDisabled}
        />
      </GridItem>
    </Grid>
  );
};

export default ProjectFilters;
