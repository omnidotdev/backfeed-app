import { Button, Flex, Icon, Skeleton, Stack, Text } from "@omnidev/sigil";
import { OrganizationMetric } from "components/organization";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { GoClock } from "react-icons/go";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
} from "react-icons/hi2";

dayjs.extend(relativeTime);

interface Props {
  /** Name of the organization. */
  name: string;
  /** Description of the organization. */
  description: string;
  /** Total feedback for the project. */
  totalFeedback: number;
  /** Number of active users for the project. */
  activeUsers: number;
  /** The last updated date of the project. */
  lastUpdated: string;
  /** Whether the organization data is loaded. */
  isLoaded?: boolean;
  /** Whether loading the organization data encountered an error. */
  isError?: boolean;
}

const Project = ({
  name,
  description,
  isLoaded,
  isError,
  totalFeedback,
  activeUsers,
  lastUpdated,
  ...rest
}: Props) => {
  return (
    <Skeleton isLoaded={isLoaded}>
      <Stack
        position="relative"
        borderColor="border.subtle"
        borderRadius="lg"
        boxShadow="xs"
        p={8}
        {...rest}
      >
        <Button
          position="absolute"
          top={1}
          right={1}
          p={2}
          variant="icon"
          color={{
            base: "foreground.muted",
            _hover: "brand.primary",
          }}
          bgColor="transparent"
        >
          <Icon src={FiArrowUpRight} w={5} h={5} />
        </Button>

        <Stack>
          <Text
            fontSize={{ base: "md", lg: "lg" }}
            fontWeight="semibold"
            lineHeight={1.2}
          >
            {isError ? "Error" : name}
          </Text>

          <Text fontSize={{ base: "xs", lg: "sm" }} color="foreground.subtle">
            {isError ? "Error" : description}
          </Text>
        </Stack>

        <Link href="#">
          <Button
            position="absolute"
            top={1}
            right={1}
            p={2}
            variant="icon"
            color={{ base: "foreground.muted", _hover: "brand.primary" }}
            bgColor="transparent"
          >
            <Icon src={FiArrowUpRight} w={5} h={5} />
          </Button>
        </Link>

        <Flex justifyContent="space-between">
          <OrganizationMetric
            icon={HiOutlineChatBubbleLeftRight}
            value={isError ? 0 : totalFeedback}
            type="Responses"
          />
          <OrganizationMetric
            icon={HiOutlineUserGroup}
            value={isError ? 0 : activeUsers}
            type="Users"
          />
          <OrganizationMetric
            icon={GoClock}
            value={isError ? "Error" : dayjs(lastUpdated).fromNow()}
            type="Updated"
            position="before"
          />
        </Flex>
      </Stack>
    </Skeleton>
  );
};

export default Project;
