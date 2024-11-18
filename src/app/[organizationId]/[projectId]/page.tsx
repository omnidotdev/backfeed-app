"use client";

import {
  Button,
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

import { CreateFeedbackDialog, Feed } from "components/feedback";
import { useProjectQuery } from "generated/graphql";
import { NODE_ENV } from "lib/config";

// ? change all params to unique IDs instead of readable slugs?

/**
 * Project overview page.
 */
const ProjectPage = () => {
  const {
    isOpen: isCreatePostDialogOpen,
    onOpen: onCreatePostDialogOpen,
    onClose: onCreatePostDialogClose,
  } = useDisclosure();

  const params = useParams();

  const { isConnected } = useAccount();

  const { data: project, isPending: isProjectPending } = useProjectQuery(
    {
      organizationId: params.organization as string,
      projectSlug: params.project as string,
    },
    { select: (data) => data.projectBySlugAndOrganizationId }
  );

  return (
    <Flex flexDirection="column">
      <Skeleton isLoaded={!isProjectPending} w="1/6" h={8} mb={4}>
        <Text fontSize="xl" fontWeight="bold" opacity={0.8} mb={4}>
          {project?.name}
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
            onClick={onCreatePostDialogOpen}
          >
            <Icon src={PlusIcon} />
            Create Post
          </Button>

          {/* TODO: Fetch project posts total count here to use for the Skeleton array count. */}
          <Feed projectId={project?.rowId || ""} overflow="auto" py={4} />
        </VStack>
      </Flex>

      <CreateFeedbackDialog
        isOpen={isCreatePostDialogOpen}
        onClose={onCreatePostDialogClose}
        onOpen={onCreatePostDialogOpen}
        projectId={project?.rowId || ""}
      />
    </Flex>
  );
};

export default ProjectPage;
