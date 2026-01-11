import { Grid, GridItem, Input } from "@omnidev/sigil";
import { useSearch } from "@tanstack/react-router";

import app from "@/lib/config/app.config";
import useHandleSearch from "@/lib/hooks/useHandleSearch";

/**
 * Workspace filters.
 */
const WorkspaceFilters = () => {
  const search = useSearch({
    from: "/_public/workspaces/",
    select: ({ search }) => search,
  });

  const onSearchChange = useHandleSearch();

  return (
    <Grid columns={1} w="full">
      <GridItem colSpan={1}>
        <Input
          borderColor="border.subtle"
          placeholder={app.workspacesPage.filters.search.placeholder}
          defaultValue={search}
          onChange={onSearchChange}
        />
      </GridItem>
    </Grid>
  );
};

export default WorkspaceFilters;
