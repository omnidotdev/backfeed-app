import {
  Badge,
  Button,
  Divider,
  Flex,
  Icon,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@omnidev/sigil";
import dayjs from "dayjs";
import {
  HiOutlineArrowDownCircle,
  HiOutlineArrowUpCircle,
} from "react-icons/hi2";

import { ResponseDialog } from "components/project";
import { getResponseTypeColor } from "lib/util";

import type { Response } from "components/project";
import { useState } from "react";

interface Props {
  /** Project response. */
  response: Response;
}

/**
 * Project response.
 */
const ProjectResponse = ({ response }: Props) => {
  const color = getResponseTypeColor(response.type);

  const {
    isOpen: isPostDialogOpen,
    onOpen: onPostDialogOpen,
    onClose: onPostDialogClose,
  } = useDisclosure();

  // NB: Simple configuration for the sake of the example. This will be handled in a separate PR.
  const [votes, setVotes] = useState(Math.floor(Math.random() * 11) - 5);
  const [userVoted, setUserVoted] = useState<"upvote" | "downvote" | null>(
    null
  );

  return (
    <>
      <Flex
        gap={6}
        p={6}
        bgColor="background.subtle"
        borderRadius="lg"
        boxShadow="xs"
        pos="relative"
      >
        {/* TODO: Handle all of this logic in a separate PR. I expect this to change and be refactored when this task is handled */}
        <VStack
          onClick={(e) => e.stopPropagation()}
          cursor="default"
          px={{ base: 2, md: 4 }}
          // NOTE: Maybe justify this center
        >
          <Button
            disabled={userVoted === "upvote"}
            size="xs"
            p={0}
            variant="icon"
            bgColor="transparent"
            role="group"
            onClick={(e) => {
              e.stopPropagation();
              setVotes(votes + 1);
              setUserVoted("upvote");
            }}
          >
            <Icon
              color={{
                base: "foreground.muted",
                _groupHover:
                  userVoted === "upvote" ? "foreground.disabled" : "green",
              }}
              src={HiOutlineArrowUpCircle}
              h={7}
              w={7}
            />
          </Button>

          <Text fontSize="lg">{votes}</Text>

          <Button
            disabled={userVoted === "downvote"}
            size="xs"
            p={0}
            variant="icon"
            bgColor="transparent"
            role="group"
            onClick={(e) => {
              e.stopPropagation();
              setVotes(votes - 1);
              setUserVoted("downvote");
            }}
          >
            <Icon
              color={{
                base: "foreground.muted",
                _groupHover:
                  userVoted === "downvote" ? "foreground.disabled" : "red",
              }}
              src={HiOutlineArrowDownCircle}
              h={7}
              w={7}
            />
          </Button>
        </VStack>

        <Divider orientation="vertical" />

        <Stack
          w="full"
          justify="space-between"
          // TODO: Maybe not open dialog here
          onClick={onPostDialogOpen}
          cursor="pointer"
        >
          <Stack>
            <Flex align="center" justify="space-between">
              <Text fontWeight="semibold">{response.title}</Text>

              <Badge color={color} borderColor={color}>
                {response.type}
              </Badge>
            </Flex>

            <Text fontSize="sm" color="foreground.subtle" py={2}>
              {response.description}
            </Text>
          </Stack>

          <Text color="foreground.muted" fontSize="xs">
            {dayjs(response.lastUpdated).fromNow()}
          </Text>
        </Stack>
      </Flex>

      {/* TODO: Consider using another component to display this information. Dialog may not be the best option */}
      <ResponseDialog
        isOpen={isPostDialogOpen}
        onClose={onPostDialogClose}
        onOpen={onPostDialogOpen}
        response={response}
      />
    </>
  );
};

export default ProjectResponse;
