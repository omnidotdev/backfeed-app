"use client";

import Link from "next/link";
import { Flex, Icon, Text } from "@omnidev/sigil";
import { LuChevronRight } from "react-icons/lu";
import { app } from "lib/config";

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

      {breadcrumbs.map(({ label, href }) => (
        <Flex key={label} align="center">
          <Icon src={LuChevronRight} color="foreground.subtle" mx={2} />

          {href ? (
            <Link href={href}>
              <Text
                color="foreground.subtle"
                _hover={{ color: "foreground.default" }}
              >
                {label}
              </Text>
            </Link>
          ) : (
            <Text>{label}</Text>
          )}
        </Flex>
      ))}
    </Flex>
  );
};

export default Breadcrumb;
