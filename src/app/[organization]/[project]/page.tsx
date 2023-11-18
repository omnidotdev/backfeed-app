"use client";

import {
  Button,
  Flex,
  Text,
  useDisclosure,
  Icon,
  Card,
  SkeletonCircle,
  SkeletonText,
  Skeleton,
  Tooltip,
} from "@chakra-ui/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { AiOutlinePlus as PlusIcon } from "react-icons/ai";
import { useAccount } from "wagmi";

import { Feed, CreateFeedbackModal } from "components/feedback";
import { useOrganizationQuery, useProjectQuery } from "generated/graphql";
import { NODE_ENV } from "lib/config/env.config";

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

  const { data: organization } = useOrganizationQuery(
      { slug: params.organization },
      { select: (data) => data.findUniqueOrganization }
    ),
    { data: project, isLoading: isProjectLoading } = useProjectQuery(
      { organizationId: organization?.id, projectSlug: params.project },
      { select: (data) => data.findFirstProject }
    );

  return (
    <Flex direction="column" align={{ base: "center", md: "initial" }}>
      <Text fontSize="xl" fontWeight="bold" opacity={0.8} mb={4}>
        {organization?.name}
      </Text>

      <Flex gap={6} direction={{ base: "column", md: "initial" }}>
        <Card p={6} w={{ md: "30%" }} align="center" gap={4}>
          <Flex gap={4}>
            <SkeletonCircle isLoaded={!isProjectLoading}>
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
              isLoaded={!isProjectLoading}
              w={isProjectLoading ? "120px" : undefined}
            >
              <Text fontWeight="bold" fontSize="xl">
                {project?.name}
              </Text>
            </Skeleton>
          </Flex>

          <SkeletonText
            isLoaded={!isProjectLoading}
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

          <Feed projectId={project?.id || ""} overflow="auto" py={4} />
        </Card>
      </Flex>

      <CreateFeedbackModal
        isOpen={isCreatePostModalOpen}
        onClose={onCreatePostModalClose}
        projectId={project?.id || ""}
      />
    </Flex>
  );
};

export default ProjectPage;
