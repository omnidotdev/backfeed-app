import { Flex, Stack, css } from "@omnidev/sigil";
import { HiOutlineFolder } from "react-icons/hi2";

import OverflowText from "@/components/core/OverflowText";
import DashboardMetric from "@/components/dashboard/DashboardMetric";

import type { FlexProps } from "@omnidev/sigil";
import type { Workspace } from "@/generated/graphql";

interface Props extends FlexProps {
  /** Workspace details. */
  workspace: Partial<Workspace>;
  /** Workspace name from organization context. */
  workspaceName?: string;
}

/**
 * Workspace card.
 */
const WorkspaceCard = ({ workspace, workspaceName, ...rest }: Props) => (
  <Flex
    position="relative"
    direction="column"
    bgColor="card-item"
    borderRadius="xl"
    borderWidth="1px"
    borderColor={{ base: "neutral.200", _dark: "neutral.800" }}
    p={6}
    cursor="pointer"
    className={css({
      transition: "all 0.2s ease",
      _groupHover: {
        bgColor: { base: "neutral.50", _dark: "neutral.800/50" },
        borderColor: { base: "neutral.300", _dark: "neutral.700" },
        transform: "translateY(-2px)",
        boxShadow: "glow-card",
      },
    })}
    {...rest}
  >
    <Stack gap={6} h="100%" justify="space-between">
      <Stack minH={{ base: 16, md: 24 }}>
        <OverflowText
          fontSize={{ base: "md", lg: "lg" }}
          fontWeight="semibold"
          lineHeight={1.2}
          lineClamp={2}
        >
          {workspaceName}
        </OverflowText>
      </Stack>

      <DashboardMetric
        type="project"
        value={workspace?.projects?.totalCount}
        icon={HiOutlineFolder}
      />
    </Stack>
  </Flex>
);

export default WorkspaceCard;
