"use client";

import { Button, Flex, Stack, Text } from "@omnidev/sigil";
import { Breadcrumb } from "components/core";
import { useRouter } from "next/navigation";

import type { ButtonProps, FlexProps, StackProps } from "@omnidev/sigil";
import type { BreadcrumbRecord } from "components/core";
import type { ReactNode } from "react";

interface ActionButton extends ButtonProps {
  /** Button label. */
  label: string;
  /** Button icon. */
  icon: ReactNode;
  /** URL path for navigation. */
  href?: string;
}

interface Props extends StackProps {
  /** Page breadcrumbs for navigation. */
  breadcrumbs?: BreadcrumbRecord[];
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
const Page = ({ breadcrumbs, header, children, ...rest }: Props) => {
  const router = useRouter();

  return (
    <Stack
      h="100%"
      maxW={{ base: "90svw", lg: "8xl" }}
      mx="auto"
      px={{ lg: 6 }}
      py={6}
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
              <Text
                as="h1"
                fontSize="3xl"
                fontWeight="semibold"
                lineHeight={1.3}
              >
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
              {header.cta.map(({ label, icon, href, onClick, ...rest }) => (
                <Button
                  key={label}
                  size="sm"
                  width={{ base: "full", md: "auto" }}
                  onClick={(e) => (href ? router.push(href) : onClick?.(e))}
                  {...rest}
                >
                  {icon}

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
};

export default Page;
