import { Flex, Icon, Stack, Text, css } from "@omnidev/sigil";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuChevronRight } from "react-icons/lu";

import OverflowText from "@/components/core/OverflowText";

import type { FlexProps } from "@omnidev/sigil";

/**
 * Workspace/org data shape for display purposes.
 * Organization data comes from JWT claims, not a local database table.
 */
interface WorkspaceData {
  rowId?: string;
  name?: string;
  slug?: string;
  organizationId?: string;
  projects?: {
    totalCount?: number;
  };
}

interface Props extends FlexProps {
  /** Workspace details. */
  workspace: Partial<WorkspaceData>;
}

/**
 * Workspace card.
 */
const WorkspaceCard = ({ workspace, ...rest }: Props) => {
  const projectCount = workspace?.projects?.totalCount ?? 0;

  return (
    <Flex
      position="relative"
      direction="column"
      justify="space-between"
      bgColor="background.default"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="border.subtle"
      p={5}
      cursor="pointer"
      h="100%"
      className={css({
        transition: "all 0.15s ease",
        _groupHover: {
          borderColor: { base: "neutral.400", _dark: "neutral.500" },
          bgColor: { base: "neutral.50", _dark: "neutral.800/50" },
          boxShadow: "0 4px 12px -2px oklch(0 0 0 / 0.08)",
        },
      })}
      {...rest}
    >
      <Stack gap={3}>
        <OverflowText
          fontSize="md"
          fontWeight="semibold"
          lineHeight={1.3}
          lineClamp={2}
        >
          {workspace.name}
        </OverflowText>

        <Flex align="center" gap={1.5} color="foreground.subtle" fontSize="sm">
          <Icon src={HiOutlineFolder} w={4} h={4} />
          <Text>
            {projectCount} {projectCount === 1 ? "project" : "projects"}
          </Text>
        </Flex>
      </Stack>

      <Flex
        align="center"
        justify="flex-end"
        mt={4}
        color="foreground.subtle"
        className={css({
          transition: "all 0.15s ease",
          _groupHover: {
            color: "foreground.default",
            transform: "translateX(2px)",
          },
        })}
      >
        <Icon src={LuChevronRight} w={4} h={4} />
      </Flex>
    </Flex>
  );
};

export default WorkspaceCard;
