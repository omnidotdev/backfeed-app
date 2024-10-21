"use client";

import {
  Button,
  Card,
  Flex,
  Icon,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
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
  const {
    isOpen: isCreatePostModalOpen,
    onOpen: onCreatePostModalOpen,
    onClose: onCreatePostModalClose,
  } = useDisclosure();

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
        organizationId: organization?.rowId,
        projectSlug: params.project as string,
      },
      { select: (data) => data.allProjects?.nodes?.[0] }
    );

  if (isOrganizationPending) return <div>Loading...</div>;
  if (isOrganizationError) return <div>Error</div>;

  return (
    <Flex direction="column" align={{ base: "center", md: "initial" }}>
      <Text fontSize="xl" fontWeight="bold" opacity={0.8} mb={4}>
        {organization?.name}
      </Text>

      <Flex gap={6} direction={{ base: "column", md: "initial" }}>
        <Card p={6} w={{ md: "30%" }} align="center" gap={4}>
          <Flex gap={4}>
            <SkeletonCircle isLoaded={!isProjectPending}>
              {project?.image && (
                <Image
                  src={project?.image}
                  alt={`${project?.image} image`}
                  width={50}
                  height={50}
                />
              )}
            </SkeletonCircle>

            <Skeleton
              isLoaded={!isProjectPending}
              w={isProjectPending ? "120px" : undefined}
            >
              <Text fontWeight="bold" fontSize="xl">
                {project?.name}
              </Text>
            </Skeleton>
          </Flex>

          <SkeletonText
            isLoaded={!isProjectPending}
            mt="4"
            noOfLines={4}
            spacing="4"
            skeletonHeight="2"
            w="100%"
          >
            {/* TODO collapsible menu on mobile */}
            {/* TODO overflow */}
            <Text>{project?.description}</Text>
          </SkeletonText>
        </Card>

        <Card p={6} w={{ md: "70%" }}>
          <Tooltip
            hasArrow
            isDisabled={NODE_ENV !== "development" || !isConnected}
            label="Coming soon"
            placement="top"
          >
            <Button
              // TODO remove env check once ready
              isDisabled={NODE_ENV !== "development" || !isConnected}
              alignSelf="flex-end"
              gap={2}
              onClick={onCreatePostModalOpen}
            >
              <Icon as={PlusIcon} />
              Create Post
            </Button>
          </Tooltip>

          <Feed projectId={project?.rowId} overflow="auto" py={4} />
        </Card>
      </Flex>

      <CreateFeedbackModal
        isOpen={isCreatePostModalOpen}
        onClose={onCreatePostModalClose}
        projectId={project?.rowId}
      />
    </Flex>
  );
};

export default ProjectPage;
