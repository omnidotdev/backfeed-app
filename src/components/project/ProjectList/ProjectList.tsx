"use client";

import { Stack } from "@omnidev/sigil";
import { keepPreviousData } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { SkeletonArray } from "components/core";
import { ErrorBoundary } from "components/layout";
import { ProjectListItem } from "components/project";
import { useProjectsQuery } from "generated/graphql";
import { useDebounceValue, useSearchParams } from "lib/hooks";

import type { Project } from "generated/graphql";

/**
 * Project list.
 * TODO: apply either infinite scroll or pagination for the list once data fetching is implemented.
 */
const ProjectList = () => {
  const { organizationId } = useParams<{ organizationId: string }>();

  const [{ search }] = useSearchParams();

  const [debouncedSearch] = useDebounceValue({ value: search });

  const {
    data: projects,
    isLoading,
    isError,
  } = useProjectsQuery(
    {
      organizationId,
      search: debouncedSearch,
    },
    {
      placeholderData: keepPreviousData,
      select: (data) => data?.projects?.nodes,
    }
  );

  if (isError)
    return <ErrorBoundary message="Error fetching projects" minH={48} />;

  if (isLoading)
    return (
      <Stack>
        <SkeletonArray count={6} h={40} borderRadius="sm" />
      </Stack>
    );

  return (
    <Stack>
      {projects?.map((project, index) => (
        <ProjectListItem
          key={project?.rowId}
          project={project as Project}
          index={index}
        />
      ))}
    </Stack>
  );
};

export default ProjectList;
