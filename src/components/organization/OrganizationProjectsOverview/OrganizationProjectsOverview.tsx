"use client";

import { Grid } from "@omnidev/sigil";
import { HiOutlineFolder } from "react-icons/hi2";

import { SkeletonArray } from "components/core";
import { ErrorBoundary, SectionContainer } from "components/layout";
import { ProjectCard } from "components/organization";
import { app } from "lib/config";
import { useOrganizationQuery } from "generated/graphql";

import type { Project } from "generated/graphql";

interface Props {
  /** Organization ID. */
  organizationSlug: string;
}

/**
 * Organization projects overview.
 */
const OrganizationProjectsOverview = ({ organizationSlug }: Props) => {
  const {
    data: projects,
    isLoading,
    isError,
  } = useOrganizationQuery(
    {
      slug: organizationSlug,
    },
    {
      select: (data) => data?.organizationBySlug?.projects?.nodes,
    }
  );

  return (
    <SectionContainer
      title={app.organizationPage.projects.title}
      description={app.organizationPage.projects.description}
      icon={HiOutlineFolder}
    >
      {isError ? (
        <ErrorBoundary message="Error fetching projects" h={48} p={8} />
      ) : (
        <Grid
          maxH="md"
          overflow="auto"
          // NB: The padding is necessary to prevent clipping of the card borders/box shadows
          p="1px"
          gap={6}
          columns={{ base: 1, md: 2 }}
        >
          {isLoading ? (
            <SkeletonArray count={6} h={48} borderRadius="lg" w="100%" />
          ) : (
            projects?.map((project) => (
              <ProjectCard
                key={project?.rowId}
                project={project as Partial<Project>}
                // !!NB: explicitly set the height of the card to prevent CLS issues with loading and error states.
                h={48}
              />
            ))
          )}
        </Grid>
      )}
    </SectionContainer>
  );
};

export default OrganizationProjectsOverview;
