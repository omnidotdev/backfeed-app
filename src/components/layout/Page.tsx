import { Flex, HStack, Icon, Stack, Text, css } from "@omnidev/sigil";
import { Link } from "@tanstack/react-router";
import { LuArrowLeft } from "react-icons/lu";

import CallToAction from "@/components/core/CallToAction";

import type { FlexProps, StackProps } from "@omnidev/sigil";
import type { LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { ActionButton } from "@/components/core/CallToAction";

interface Props extends StackProps {
  /** Page header props. */
  header?: {
    /** Header section title. */
    title: ReactNode;
    /** Header section description. */
    description?: string;
    /** Header section call to action buttons. */
    cta?: ActionButton[];
    /** Back link displayed above the title. */
    backLink?: {
      label: string;
      to: LinkProps["to"];
      params?: LinkProps["params"];
    };
    /** Props to pass to the header section. */
    headerProps?: FlexProps;
  };
}

/**
 * Page layout.
 */
const Page = ({ header, children, ...rest }: Props) => (
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
    {header && (
      <Flex direction="column" w="100%" {...header.headerProps}>
        {header.backLink && (
          <Link
            to={header.backLink.to}
            params={header.backLink.params}
            className={css({
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              color: "foreground.muted",
              fontSize: "sm",
              mb: 2,
              w: "fit-content",
              _hover: { color: "foreground.default" },
            })}
          >
            <Icon src={LuArrowLeft} w={4} h={4} />
            {header.backLink.label}
          </Link>
        )}
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "flex-start", md: "center" }}
          justify="space-between"
          gap={4}
        >
          <Stack gap={1}>
            <HStack gap={2} alignItems="center">
              {typeof header.title === "string" ? (
                <Text
                  as="h1"
                  fontSize={{ base: "2xl", md: "3xl" }}
                  fontWeight="bold"
                  lineHeight={1.2}
                  letterSpacing="-0.02em"
                >
                  {header.title}
                </Text>
              ) : (
                header.title
              )}

              {header.headerProps?.children}
            </HStack>

            {header.description && (
              <Text
                as="h2"
                fontSize={{ base: "sm", sm: "md" }}
                fontWeight="normal"
                color="foreground.muted"
                maxW="2xl"
                lineHeight={1.5}
              >
                {header.description}
              </Text>
            )}
          </Stack>

          {!!header.cta?.length && (
            <Flex
              gap={2}
              width={{ base: "full", md: "auto" }}
              direction={{ base: "column", sm: "row" }}
              flexShrink={0}
            >
              {header.cta?.map((action) => (
                <CallToAction key={action.label} action={action} />
              ))}
            </Flex>
          )}
        </Flex>
      </Flex>
    )}

    {children}
  </Stack>
);

export default Page;
