"use client";

import { Flex, Stack, Text } from "@omnidev/sigil";

import { Breadcrumb, CallToAction } from "components/core";

import type { FlexProps, StackProps } from "@omnidev/sigil";
import type { ActionButton, BreadcrumbRecord } from "components/core";

interface Props extends StackProps {
  /** Page breadcrumbs for navigation. */
  breadcrumbs?: BreadcrumbRecord[];
  /** Page header props. */
  header?: {
    /** Header section title. */
    title: string;
    /** Header section description. */
    description?: string;
    /** Header section call to action buttons. */
    cta?: ActionButton[];
    /** Props to pass to the header section. */
    headerProps?: FlexProps;
  };
}

/**
 * Page layout.
 */
const Page = ({ breadcrumbs, header, children, ...rest }: Props) => (
  <Stack
    h="100%"
    w="full"
    maxW={{ base: "90svw", lg: "8xl" }}
    mx="auto"
    px={{ lg: 6 }}
    pt={6}
    pb={6}
    gap={6}
    {...rest}
  >
    {breadcrumbs && <Breadcrumb breadcrumbs={breadcrumbs} />}

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

            {header.description && (
              <Text
                as="h2"
                fontSize={{ base: "sm", sm: "md" }}
                fontWeight="medium"
                color="foreground.subtle"
              >
                {header.description}
              </Text>
            )}
          </Stack>

          <Flex
            gap={4}
            width={{ base: "full", md: "auto" }}
            direction={{ base: "column", sm: "row" }}
          >
            {header.cta?.map((action) => (
              <CallToAction key={action.label} action={action} />
            ))}
          </Flex>
        </Flex>
      </Flex>
    )}

    {children}
  </Stack>
);

export default Page;
