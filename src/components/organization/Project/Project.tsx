import { Button, Grid, Icon, Stack, Text } from "@omnidev/sigil";
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
}

/**
 * Project, nested within an organization. A project outlines an application or other kind of product or service that aggregates and contains scoped feedback.
 */
const Project = ({
  name,
  description,
  totalFeedback,
  activeUsers,
  lastUpdated,
  ...rest
}: Props) => (
  <Stack
    position="relative"
    borderColor="border.subtle"
    borderRadius="lg"
    boxShadow="xs"
    h="100%"
    p={8}
    {...rest}
  >
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

    <Stack justifyContent="space-between" h="100%" gap={6}>
      <Stack>
        <Text
          fontSize={{ base: "md", lg: "lg" }}
          fontWeight="semibold"
          lineHeight={1.2}
        >
          {name}
        </Text>

        <Text
          lineClamp={2}
          fontSize={{ base: "xs", lg: "sm" }}
          color="foreground.subtle"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {description}
        </Text>
      </Stack>

      <Grid columns={{ base: 1, md: 3 }} alignItems="end">
        <OrganizationMetric
          icon={HiOutlineChatBubbleLeftRight}
          value={totalFeedback}
          type="Responses"
        />

        <OrganizationMetric
          icon={HiOutlineUserGroup}
          value={activeUsers}
          type="Users"
        />

        <OrganizationMetric
          icon={GoClock}
          value={dayjs(lastUpdated).fromNow()}
          type="Updated"
          containerProps={{ direction: "row" }}
        />
      </Grid>
    </Stack>
  </Stack>
);

export default Project;
