"use client";

import {
  Button,
  Card,
  Center,
  Flex,
  HStack,
  Icon,
  Skeleton,
  Text,
  VStack,
  useDisclosure,
} from "@omnidev/sigil";
import Image from "next/image";
import { useParams } from "next/navigation";
import { AiOutlinePlus as PlusIcon } from "react-icons/ai";
import { useAccount } from "wagmi";

import { CreateFeedbackModal, Feed } from "components/feedback";
import { useOrganizationQuery, useProjectQuery } from "generated/graphql";
import { NODE_ENV } from "lib/config";

// ? change all params to unique IDs instead of readable slugs?

/**
 * Project overview page.
 */
const ProjectPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const params = useParams();

  const { isConnected } = useAccount();

  const {
      data: organization,
      isPending: isOrganizationPending,
      isError: isOrganizationError,
    } = useOrganizationQuery(
      { slug: params.organization as string },
      {
        select: (data) => data.organizationBySlug,
      }
    ),
    { data: project, isPending: isProjectPending } = useProjectQuery(
      {
        organizationId: organization?.rowId!,
        projectSlug: params.project as string,
      },
      {
        enabled: !!organization,
        select: (data) => data.projectBySlugAndOrganizationId,
      }
    );

  if (isOrganizationPending) return <Center>Loading...</Center>;
  if (isOrganizationError) return <Center>Error</Center>;

  return (
    <Flex flexDirection="column">
      <Skeleton isLoaded={!isOrganizationPending} w="1/6" h={8} mb={4}>
        <Text fontSize="xl" fontWeight="bold" opacity={0.8} mb={4}>
          {organization?.name} test
        </Text>
      </Skeleton>

      <Flex w="full" gap={4} flexDirection={{ base: "column", md: "row" }}>
        <VStack
          shadow="1px 1px 5px rgba(0,0,0,0.3)"
          p={4}
          bg="background.muted"
          gap={4}
          w={{ base: "full", md: "30%" }}
          rounded="md"
        >
          <HStack>
            <Skeleton isLoaded={!isProjectPending} w={10} h={10} rounded="full">
              {project?.image && (
                <Image
                  src={project?.image}
                  alt={`${project?.image} image`}
                  width={40}
                  height={40}
                  style={{
                    borderRadius: "50%",
                    flexShrink: 0,
                    objectFit: "cover",
                  }}
                />
              )}
            </Skeleton>

            <Skeleton isLoaded={!isProjectPending} h={8} w={40}>
              <Text ml={2} fontWeight="bold" fontSize="xl">
                {project?.name}
              </Text>
            </Skeleton>
          </HStack>

          <Skeleton isLoaded={!isProjectPending} w="full" h="full">
            <Text>{project?.description}</Text>
          </Skeleton>
        </VStack>

        <VStack
          shadow="1px 1px 5px rgba(0,0,0,0.3)"
          p={4}
          bg="background.muted"
          gap={4}
          w={{ base: "full", md: "70%" }}
          rounded="md"
        >
          <Button
            // TODO remove env check once ready
            disabled={NODE_ENV !== "development" || !isConnected}
            alignSelf="flex-end"
            gap={2}
            onClick={onOpen}
          >
            <Icon src={PlusIcon} />
            Create Post
          </Button>

          {/* TODO: Fetch project posts total count here to use for the Skeleton array count. */}
          <Feed projectId={project?.rowId || ""} overflow="auto" py={4} />
        </VStack>
      </Flex>

      <CreateFeedbackModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        projectId={project?.rowId || ""}
      />
    </Flex>
  );
};

export default ProjectPage;
