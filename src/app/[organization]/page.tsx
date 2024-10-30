"use client";

import { Card, Flex, Text } from "@omnidev/sigil";
import Link from "next/link";
// import { useParams } from "next/navigation";

import { useOrganizationQuery, useProjectsQuery } from "generated/graphql";

/**
 * Organization overview page.
 */
const OrganizationPage = () => {
  // const params = useParams();

  const { data: organization } = useOrganizationQuery(
    { slug: "beau" },
    // { slug: params.organization as string },
    { select: (data) => data.organizationBySlug }
  );

  const { data: projects } = useProjectsQuery(
    { organizationId: organization?.rowId },
    { select: (data) => data.projects?.nodes }
  );

  console.log("organization", organization);
  console.log("projects", projects);

  return (
    <Flex direction="column" align="center" gap={4}>
      {/* TODO: Problem here if slug equals organization? */}
      <Text fontSize="xl" fontWeight="bold">
        {organization?.name}
      </Text>

      {projects?.map((project) => (
        <Link
          key={project?.name}
          href={`/${organization?.slug}/${project?.slug}`}
        >
          <Card w="240px" p={4} gap={4} textAlign="center">
            <Text fontWeight="bold">{project?.name}</Text>
            <Text>{project?.description}</Text>
          </Card>
        </Link>
      ))}
    </Flex>
  );
};

export default OrganizationPage;
