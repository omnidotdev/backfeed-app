"use client";

import { Flex, Icon, Text } from "@omnidev/sigil";
import { LuChevronRight } from "react-icons/lu";

import { Link } from "components/core";
import { app } from "lib/config";

export interface BreadcrumbRecord {
  /** Label for the breadcrumb. */
  label: string;
  /** URL path the breadcrumb navigates to. */
  href?: `/${string}`;
}

interface Props {
  /** Array of navigation breadcrumbs. */
  breadcrumbs: BreadcrumbRecord[];
}

/**
 * Breadcrumb.
 */
const Breadcrumb = ({ breadcrumbs }: Props) => (
  <Flex fontSize="sm">
    <Link href="/">
      <Text color="foreground.subtle" _hover={{ color: "foreground.default" }}>
        {app.breadcrumb}
      </Text>
    </Link>

    {breadcrumbs.map(({ label, href }, index) => {
      const isLastItem = breadcrumbs.length - 1 === index;

      return (
        // biome-ignore lint/suspicious/noArrayIndexKey: index used in the key in case an organization and project have the same label
        <Flex key={`${label}-${index}`} align="center">
          <Icon src={LuChevronRight} color="foreground.subtle" mx={2} />

          {href ? (
            <Link href={href}>
              <Text
                display={isLastItem ? "none" : { base: "inline", lg: "none" }}
                color={{
                  base: "foreground.subtle",
                  _hover: "foreground.default",
                }}
              >
                ...
              </Text>
              <Text
                display={isLastItem ? "inline" : { base: "none", lg: "inline" }}
                color={{
                  base: "foreground.subtle",
                  _hover: "foreground.default",
                }}
              >
                {label}
              </Text>
            </Link>
          ) : (
            <Text>{label}</Text>
          )}
        </Flex>
      );
    })}
  </Flex>
);

export default Breadcrumb;
