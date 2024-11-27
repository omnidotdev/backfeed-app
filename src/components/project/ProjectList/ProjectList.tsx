"use client";

import { Stack, useDebounceValue } from "@omnidev/sigil";
import Link from "next/link";
import { useParams } from "next/navigation";

import { SkeletonArray } from "components/core";
import { ErrorBoundary } from "components/layout";
import { ProjectListItem } from "components/project";
import { useSearchParams } from "lib/hooks";

import type { StackProps } from "@omnidev/sigil";
import type { Project } from "components/project";

interface Props extends StackProps {
  /** Projects to display. */
  projects: Project[];
  /** Whether the data is loading. */
  isLoading?: boolean;
  /** Whether an error was encountered while loading the data. */
  isError?: boolean;
}

/**
 * Project list.
 */
const ProjectList = ({
  projects,
  isLoading = true,
  isError = false,
  ...rest
}: Props) => {
  const [{ search, status }] = useSearchParams();

  const [debouncedSearch] = useDebounceValue(search, 300);

  const { organizationId } = useParams<{ organizationId: string }>();

  if (isError)
    return <ErrorBoundary message="Error fetching projects" minH={48} />;

  if (isLoading)
    return (
      <Stack>
        <SkeletonArray count={6} h={36} borderRadius="sm" />
      </Stack>
    );

  return (
    <Stack {...rest}>
      {/* TODO: update logic handler / filters once data fetching is implemented */}
      {projects
        .filter((project) => (status ? project.status === status : true))
        .filter((project) =>
          project.name.toLowerCase().includes(debouncedSearch)
        )
        .map((project) => (
          <Link
            key={project.id}
            href={`/organizations/${organizationId}/projects/${project.id}`}
          >
            <ProjectListItem {...project} />
          </Link>
        ))}
    </Stack>
  );
};

export default ProjectList;
