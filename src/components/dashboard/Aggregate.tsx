import { Flex, Icon, Skeleton, Text } from "@omnidev/sigil";

import type { FlexProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";

interface Props extends FlexProps {
  /** Statistic title (human-readable label). */
  title: string;
  /** Statistic value. */
  value: string | number;
  /** Visual icon. */
  icon: IconType;
  /** Accent color for the icon background. */
  accentColor?: "amber" | "emerald" | "sky";
  /** Whether the statistic data is loaded. */
  isLoaded?: boolean;
  /** Whether loading the statistic data encountered an error. */
  isError?: boolean;
}

const accentStyles = {
  amber: {
    bg: { base: "amber.100", _dark: "amber.900/30" },
    icon: { base: "amber.600", _dark: "amber.400" },
  },
  emerald: {
    bg: { base: "emerald.100", _dark: "emerald.900/30" },
    icon: { base: "emerald.600", _dark: "emerald.400" },
  },
  sky: {
    bg: { base: "sky.100", _dark: "sky.900/30" },
    icon: { base: "sky.600", _dark: "sky.400" },
  },
};

/**
 * Aggregate statistic card. Displays KPI information such as total feedback, active users, or average response time.
 */
const Aggregate = ({
  title,
  value,
  icon,
  accentColor,
  isLoaded = true,
  isError = false,
  ...rest
}: Props) => {
  const accent = accentColor ? accentStyles[accentColor] : null;

  return (
    <Flex
      direction="column"
      gap={2}
      p={5}
      bgColor="background.default"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="border.subtle"
      {...rest}
    >
      <Flex align="center" gap={2}>
        <Flex
          align="center"
          justify="center"
          w={8}
          h={8}
          borderRadius="lg"
          bgColor={accent?.bg ?? "background.subtle"}
        >
          <Icon
            src={icon}
            w={4}
            h={4}
            color={accent?.icon ?? "foreground.subtle"}
          />
        </Flex>

        <Text color="foreground.subtle" fontSize="sm" fontWeight="medium">
          {title}
        </Text>
      </Flex>

      <Skeleton isLoaded={isLoaded} maxW={!isLoaded ? 24 : undefined}>
        <Text
          fontSize="3xl"
          fontWeight="bold"
          lineHeight={1}
          letterSpacing="tight"
        >
          {isError ? "—" : value}
        </Text>
      </Skeleton>
    </Flex>
  );
};

export default Aggregate;
