import { Grid, GridItem, Input } from "@omnidev/sigil";
import { useSearch } from "@tanstack/react-router";

import app from "@/lib/config/app.config";
import useHandleSearch from "@/lib/hooks/useHandleSearch";

/**
 * Project filters.
 */
const ProjectFilters = () => {
  const search = useSearch({
    from: "/_public/workspaces/$workspaceSlug/_layout/projects/",
    select: ({ search }) => search,
  });

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
