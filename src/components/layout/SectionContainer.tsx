import { Flex, Icon, Stack, Text } from "@omnidev/sigil";

import type { FlexProps, TextProps } from "@omnidev/sigil";
import type { ReactNode } from "react";
import type { IconType } from "react-icons";

interface Props extends FlexProps {
  /** Container title */
  title: string;
  /** Container description */
  description?: string;
  /** Visual icon */
  icon?: IconType;
  /** Additional props for the title container. */
  titleProps?: FlexProps;
  /** Additional props for the description container. */
  descriptionProps?: TextProps;
  /** Header actions. */
  headerActions?: ReactNode;
}

/**
 * Section container.
 */
const SectionContainer = ({
  title,
  description,
  children,
  icon,
  titleProps,
  descriptionProps,
  headerActions,
  ...rest
}: Props) => (
  <Stack
    position="relative"
    bgColor="background.default"
    borderRadius="lg"
    boxShadow="card"
    p={{ base: 4, sm: 6 }}
    gap={6}
    {...rest}
  >
    <Stack>
      <Flex
        align="center"
        gap={2}
        fontSize={{ base: "xl", lg: "2xl" }}
        {...titleProps}
      >
        {icon && <Icon src={icon} w={5} h={5} color="foreground.subtle" />}

        <Text fontWeight="semibold" lineHeight={1.2}>
          {title}
        </Text>

        {headerActions && headerActions}
      </Flex>

      {description && (
        <Text
          color="foreground.subtle"
          fontSize={{ base: "xs", lg: "sm" }}
          {...descriptionProps}
        >
          {description}
        </Text>
      )}
    </Stack>

    {children}
  </Stack>
);

export default SectionContainer;
