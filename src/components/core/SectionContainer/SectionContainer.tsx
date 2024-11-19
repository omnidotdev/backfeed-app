import { Flex, Stack, Text, Icon } from "@omnidev/sigil";

import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import type { FlexProps } from "@omnidev/sigil";

interface Props extends FlexProps {
  /** Container title */
  title?: string;
  /** Container description */
  description?: string;
  /** Container children */
  children: ReactNode;
  /** Visual icon */
  icon?: IconType;
}

/**
 * Section container.
 */
const SectionContainer = ({
  title,
  description,
  children,
  icon,
  ...rest
}: Props) => (
  <Stack
    bgColor="background.default"
    borderColor="border.subtle"
    borderRadius="lg"
    boxShadow="lg"
    p={{ base: 4, sm: 6 }}
    gap={6}
    {...rest}
  >
    <Stack>
      <Flex align="center" gap={2}>
        {icon && <Icon src={icon} w={5} h={5} color="foreground.subtle" />}

        <Text
          fontSize={{ base: "xl", lg: "2xl" }}
          fontWeight="semibold"
          lineHeight={1.2}
        >
          {title}
        </Text>
      </Flex>

      <Text color="foreground.subtle" fontSize={{ base: "xs", lg: "sm" }}>
        {description}
      </Text>
    </Stack>

    {children}
  </Stack>
);

export default SectionContainer;
