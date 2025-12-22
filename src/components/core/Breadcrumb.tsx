import { Flex, Icon, Text } from "@omnidev/sigil";
import { Link } from "@tanstack/react-router";
import { LuChevronRight } from "react-icons/lu";

import app from "@/lib/config/app.config";

import type { LinkOptions } from "@tanstack/react-router";

export interface BreadcrumbRecord extends Omit<LinkOptions, "href"> {
  /** Label for the breadcrumb. */
  label: string;
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
    <Link to="/">
      <Text color="foreground.subtle" _hover={{ color: "foreground.default" }}>
        {app.breadcrumb}
      </Text>
    </Link>

    {breadcrumbs.map(({ label, to, params }, index) => {
      const isLastItem = breadcrumbs.length - 1 === index;

      return (
        // biome-ignore lint/suspicious/noArrayIndexKey: index used in the key in case an organization and project have the same label
        <Flex key={`${label}-${index}`} align="center">
          <Icon
            src={LuChevronRight}
            color="foreground.subtle"
            h={4}
            w={4}
            mx={1.5}
          />

          {to ? (
            <Link to={to} params={params}>
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
