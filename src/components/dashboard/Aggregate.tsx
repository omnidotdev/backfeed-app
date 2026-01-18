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
    bgLight: "amber.100",
    bgDark: "neutral.800",
    iconLight: "amber.600",
    iconDark: "amber.700",
  },
  emerald: {
    bgLight: "emerald.100",
    bgDark: "neutral.800",
    iconLight: "emerald.600",
    iconDark: "emerald.700",
  },
  sky: {
    bgLight: "sky.100",
    bgDark: "neutral.800",
    iconLight: "sky.600",
    iconDark: "sky.700",
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
          bgColor={
            accent
              ? { base: accent.bgLight, _dark: accent.bgDark }
              : "background.subtle"
          }
        >
          <Icon
            src={icon}
            w={4}
            h={4}
            color={
              accent
                ? { base: accent.iconLight, _dark: accent.iconDark }
                : "foreground.subtle"
            }
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
