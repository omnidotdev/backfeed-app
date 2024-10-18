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
      { select: (data) => data.findUniqueOrganization },
    ),
    { data: projects } = useProjectsQuery(
      { organizationId: organization?.id },
      { select: (data) => data.findManyProject },
    );

  return (
    <Flex direction="column" align="center">
      <Text fontSize="xl" fontWeight="bold">
        {organization?.name}
      </Text>

      {projects?.map(({ name, description, slug }) => (
        <Link key={name} href={`/${organization?.slug}/${slug}`}>
          <Card w="240px" p={4} gap={4} textAlign="center">
            <Text fontWeight="bold">{name}</Text>
            <Text>{description}</Text>
          </Card>
        </Link>
      ))}
    </Flex>
  );
};

export default OrganizationPage;
