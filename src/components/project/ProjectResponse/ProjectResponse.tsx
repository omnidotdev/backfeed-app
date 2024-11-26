import {
  Badge,
  Button,
  Divider,
  Flex,
  Icon,
  Stack,
  Text,
  VStack,
} from "@omnidev/sigil";
import dayjs from "dayjs";
import { useState } from "react";
import {
  HiOutlineArrowDownCircle,
  HiOutlineArrowUpCircle,
} from "react-icons/hi2";

import { getResponseTypeColor } from "lib/util";

import type { ResponseType } from "lib/util";

interface Props {
  /** Title of the post. */
  title: string;
  /** Description providing more details about the post. */
  description: string;
  /** Timestamp when the post was last updated. */
  lastUpdated: string;
  /** Type of post (e.g., feature request, bug report, etc.). */
  type: ResponseType;
}

/**
 * Project response.
 */
const ProjectResponse = ({ title, description, type, lastUpdated }: Props) => {
  const color = getResponseTypeColor(type);

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
        <VStack cursor="default" px={{ base: 2, md: 4 }}>
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

        <Stack w="full" justify="space-between">
          <Stack>
            <Flex align="center" justify="space-between">
              <Text fontWeight="semibold">{title}</Text>

              <Badge color={color} borderColor={color}>
                {type}
              </Badge>
            </Flex>

            <Text fontSize="sm" color="foreground.subtle" py={2}>
              {description}
            </Text>
          </Stack>

          <Text color="foreground.muted" fontSize="xs">
            {dayjs(lastUpdated).fromNow()}
          </Text>
        </Stack>
      </Flex>
    </>
  );
};

export default ProjectResponse;
