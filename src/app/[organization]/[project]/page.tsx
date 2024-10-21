"use client";

import {
  Button,
  Flex,
  Text,
  Icon,
  useDisclosure,
  Skeleton,
  Center,
  VStack,
  HStack,
} from "@omnidev/sigil";
import Image from "next/image";
import { useParams } from "next/navigation";
import { AiOutlinePlus as PlusIcon } from "react-icons/ai";
import { useAccount } from "wagmi";

import { Feed, CreateFeedbackModal } from "components/feedback";
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
        select: (data) => data.findUniqueOrganization,
      },
    ),
    { data: project, isPending: isProjectPending } = useProjectQuery(
      {
        organizationId: organization?.id,
        projectSlug: params.project as string,
      },
      { select: (data) => data.findFirstProject },
    );

  if (isOrganizationPending) return <Center>Loading...</Center>;
  if (isOrganizationError) return <Center>Error</Center>;

  return (
    <Flex>
      <Text fontSize="xl" fontWeight="bold" opacity={0.8} mb={4}>
        {organization?.name}
      </Text>

      <Flex w="full" gap={4} flexDirection={{ base: "column", md: "row" }}>
        <VStack
          p={4}
          bg="background.subtle"
          gap={4}
          w={{ base: "full", md: "30%" }}
        >
          <HStack>
            {project?.image && (
              <Image
                src={project?.image}
                alt={`${project?.image} image`}
                width={40}
                height={40}
              />
            )}

            <Text ml={2} fontWeight="bold" fontSize="xl">
              {project?.name}
            </Text>
          </HStack>

          <Text>{project?.description}</Text>
        </VStack>

        <VStack
          p={4}
          bg="background.subtle"
          gap={4}
          w={{ base: "full", md: "70%" }}
        >
          <Button
            // TODO remove env check once ready
            disabled={NODE_ENV !== "development" || !isConnected}
            alignSelf="flex-end"
            gap={2}
            onClick={onCreatePostModalOpen}
          >
            <Icon src={PlusIcon} />
            Create Post
          </Button>
          <Feed projectId={project?.id || ""} overflow="auto" py={4} />
        </VStack>
      </Flex>

      <CreateFeedbackModal
        isOpen={isCreatePostModalOpen}
        onClose={onCreatePostModalClose}
        onOpen={onCreatePostModalOpen}
        projectId={project?.id || ""}
      />
    </Flex>
  );
};

export default ProjectPage;

// <Flex direction="column" align={{ baseToMd: "center", md: "initial" }}>
//   <Text fontSize="xl" fontWeight="bold" opacity={0.8} mb={4}>
//     {organization?.name}
//   </Text>

//   <Flex gap={6} direction={{ baseToMd: "column", md: "initial" }}>
//     <Card
//       p={6}
//       w={{ baseToMd: "100%", md: "30%" }}
//       alignItems="center"
//       gap={4}
//     >
//       <HStack gap={4}>
//         {project?.image && (
//           <Image
//             src={project?.image}
//             alt={`${project?.image} image`}
//             width={50}
//             height={50}
//           />
//         )}

//         <Text fontWeight="bold" fontSize="xl">
//           {project?.name}
//         </Text>
//       </HStack>

//       {/* TODO collapsible menu on mobile */}
//       {/* TODO overflow */}
//       <Text>{project?.description}</Text>
//     </Card>

//     <Card p={6} w={{ baseToMd: "100%", md: "70%" }}>
// <Tooltip
//   hasArrow
//   positioning={{ placement: "top" }}
//   isDisabled={NODE_ENV !== "development" || !isConnected}
//   trigger={
//     <Button
//       bgColor="red"
//       // TODO remove env check once ready
//       disabled={NODE_ENV !== "development" || !isConnected}
//       alignSelf="flex-end"
//       gap={2}
//       onClick={onCreatePostModalOpen}
//     >
//       <Icon src={PlusIcon} />
//       Create Post
//     </Button>
//   }
// >
//   Coming soon
// </Tooltip>
//       <Feed projectId={project?.id || ""} overflow="auto" py={4} />
//     </Card>
//   </Flex>

// </Flex>
