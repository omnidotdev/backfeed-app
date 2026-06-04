import { getRouteApi } from "@tanstack/react-router";

import { Input } from "@/components/ui/input";
import app from "@/lib/config/app.config";
import useHandleSearch from "@/lib/hooks/useHandleSearch";

const projectsRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout/projects/",
);

/**
 * Project filters.
 */
const ProjectFilters = () => {
  const search = projectsRoute.useSearch({ select: ({ search }) => search });

  const onSearchChange = useHandleSearch();

  return (
    <div className="w-full">
      <Input
        placeholder={app.projectsPage.filters.search.placeholder}
        defaultValue={search}
        onChange={onSearchChange}
      />
    </div>
  );
};

export default ProjectFilters;
