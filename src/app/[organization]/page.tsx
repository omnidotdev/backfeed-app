"use client";

import { Card, Flex, Text, VStack } from "@omnidev/sigil";
import Image from "next/image";
import Link from "next/link";
import { useAccount } from "wagmi";

import { useUserQuery } from "generated/graphql";

/**
 * Organization overview page.
 */
const OrganizationPage = () => {
  const { address: connectedAddress } = useAccount();

  const { data: user } = useUserQuery(
    {
      walletAddress: connectedAddress as string,
    },
    {
      select: (data) => data.userByWalletAddress,
    }
  );

  const organizations = user?.userOrganizations?.nodes;

  return (
    <Flex direction="column" align="center" gap={4}>
      {organizations?.map((organization) => (
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
      ))}
    </Flex>
  );
};

export default OrganizationPage;
