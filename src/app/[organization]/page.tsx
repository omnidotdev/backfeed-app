"use client";

import { Stack, Grid } from "@omnidev/sigil";
import {
  OrganizationActions,
  OrganizationHeader,
  OrganizationProjects,
  OrganizationStats,
} from "components/organization";

import { useParams } from "next/navigation";

// import { Flex } from "@omnidev/sigil";
// import Image from "next/image";
// import Link from "next/link";
// import { useAccount } from "wagmi";

// import { useUserQuery } from "generated/graphql";

// interface Props {
//   params: Promise<{ organization: string }>;
// }

export interface Project {
  id: string;
  name: string;
  description: string;
  totalFeedback: number;
  activeUsers: number;
  lastUpdated: string;
}

const projects: Project[] = [
  {
    id: "1",
    name: "Mobile App Feedback",
    description:
      "Collecting user feedback for our iOS and Android applications",
    totalFeedback: 234,
    activeUsers: 1200,
    lastUpdated: "2024-11-05T18:40:27.761Z",
  },
  {
    id: "2",
    name: "Web Platform Beta",
    description: "Beta testing feedback for the new web platform",
    totalFeedback: 567,
    activeUsers: 890,
    lastUpdated: "2024-11-17T18:40:27.761Z",
  },
  {
    id: "3",
    name: "Desktop Client",
    description: "User experience feedback for desktop applications",
    totalFeedback: 123,
    activeUsers: 450,
    lastUpdated: "2024-11-12T18:40:27.761Z",
  },
];

/**
 * Organization overview page.
 */
const OrganizationPage = () => {
  // const { organization: slug } = await params;
  const params = useParams<{ organization: string }>();

  // const { address: connectedAddress } = useAccount();

  // const { data: user } = useUserQuery(
  //   {
  //     walletAddress: connectedAddress as string,
  //   },
  //   {
  //     select: (data) => data.userByWalletAddress,
  //   }
  // );

  // const organizations = user?.userOrganizations?.nodes;

  return (
    <Stack
      // TODO: Check what our defualt padding is on parent containers
      p={6}
      gap={6}
    >
      <OrganizationHeader orgId={params.organization} />

      <OrganizationProjects projects={projects} />

      <Grid columns={{ base: 1, md: 2 }} gap={6}>
        <OrganizationStats projects={projects} />
        <OrganizationActions />
      </Grid>
    </Stack>
  );
};

export default OrganizationPage;

// <Flex direction="column" align="center" gap={4}>

/* {organizations?.map((organization) => (
        <VStack key={organization?.organizationId}>
          <Text fontWeight="bold">{organization?.organization?.name}</Text>

          {organization?.organization?.projects?.nodes?.map((project) => (
            <Link
              key={project?.id}
              href={`/${organization?.organizationId}/${project?.slug}`}
            >
              <Card cursor="pointer" p={4}>
                {project?.image && (
                  <Image
                    alt={`${project?.name} image`}
                    src={project?.image}
                    height={40}
                    width={40}
                  />
                )}

                <Text>{project?.name}</Text>

                <Text>{project?.description}</Text>
              </Card>
            </Link>
          ))}
        </VStack>
      ))} */

// </Flex>
