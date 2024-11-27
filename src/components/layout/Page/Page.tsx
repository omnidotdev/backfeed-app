"use client";

import { Button, Flex, Icon, Stack, Text } from "@omnidev/sigil";

import type { ButtonProps, FlexProps, StackProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";

interface ActionButton extends ButtonProps {
  /** Button label. */
  label: string;
  /** Button icon. */
  icon: IconType;
}

interface Props extends StackProps {
  /** Page header props. */
  header?: {
    /** Header section title. */
    title: string;
    /** Header section description. */
    description: string;
    /** Header section call to action buttons. */
    cta: ActionButton[];
    /** Props to pass to the header section. */
    headerProps?: FlexProps;
  };
}

/**
 * Page layout.
 */
const Page = ({ header, children, ...rest }: Props) => (
  <Stack
    maxW={{ base: "90svw", lg: "8xl" }}
    mx="auto"
    px={{ lg: 6 }}
    py={6}
    gap={6}
    {...rest}
  >
    {header && (
      <Flex direction="column" w="100%" {...header.headerProps}>
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "flex-start", md: "center" }}
          justify="space-between"
          gap={4}
        >
          <Stack>
            <Text as="h1" fontSize="3xl" fontWeight="semibold" lineHeight={1.3}>
              {header.title}
            </Text>

            <Text
              as="h2"
              fontSize={{ base: "sm", sm: "md" }}
              fontWeight="medium"
              color="foreground.subtle"
            >
              {header.description}
            </Text>
          </Stack>

          <Flex
            gap={4}
            width={{ base: "full", md: "auto" }}
            direction={{ base: "column", sm: "row" }}
          >
            {header.cta.map(({ label, icon, ...rest }) => (
              <Button
                key={label}
                size="sm"
                width={{ base: "full", md: "auto" }}
                {...rest}
              >
                <Icon src={icon} w={4} h={4} />

                <Text>{label}</Text>
              </Button>
            ))}
          </Flex>
        </Flex>
      </Flex>
    )}

    {children}
  </Stack>
);

export default Page;
