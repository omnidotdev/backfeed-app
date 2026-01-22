import { Grid, GridItem, Input } from "@omnidev/sigil";
import { getRouteApi } from "@tanstack/react-router";

import app from "@/lib/config/app.config";
import useHandleSearch from "@/lib/hooks/useHandleSearch";

const projectsRoute = getRouteApi(
  "/_public/workspaces/$workspaceSlug/_layout/projects/",
);

/**
 * Project filters.
 */
const ProjectFilters = () => {
  const search = projectsRoute.useSearch({ select: ({ search }) => search });

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
