"use client";

import { Flex, Icon, Text, useBreakpointValue } from "@omnidev/sigil";
import { app } from "lib/config";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

export interface BreadcrumbRecord {
  /** Label for the breadcrumb. */
  label: string;
  /** URL path the breadcrumb navigates to. */
  href?: string;
}

interface Props {
  /** Array of navigation breadcrumbs. */
  breadcrumbs: BreadcrumbRecord[];
}

/**
 * Breadcrumb.
 */
const Breadcrumb = ({ breadcrumbs }: Props) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <Flex fontSize="sm">
      <Link href="/">
        <Text
          color="foreground.subtle"
          _hover={{ color: "foreground.default" }}
        >
          {app.breadcrumb}
        </Text>
      </Link>

      {breadcrumbs.map(({ label, href }, index) => {
        const isLastItem = breadcrumbs.length - 1 === index;

        return (
          <Flex key={label} align="center">
            <Icon src={LuChevronRight} color="foreground.subtle" mx={2} />

            {href ? (
              <Link href={href}>
                <Text
                  color="foreground.subtle"
                  _hover={{ color: "foreground.default" }}
                >
                  {!isDesktop && !isLastItem ? "..." : label}
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
};

export default Breadcrumb;
