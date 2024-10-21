"use client";

import { Card, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { useOrganizationQuery, useProjectsQuery } from "generated/graphql";

/**
 * Organization overview page.
 */
const OrganizationPage = () => {
  const params = useParams();

  const { data: organization } = useOrganizationQuery(
      { slug: params.organization as string },
      { select: (data) => data.organizationBySlug }
    ),
    { data: projects } = useProjectsQuery(
      { organizationId: organization?.rowId },
      { select: (data) => data.allProjects?.nodes }
    );

  return (
    <Flex direction="column" align="center">
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
