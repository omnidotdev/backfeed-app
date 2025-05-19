"use client";

import { Flex, Icon, Text } from "@omnidev/sigil";
import { LuChevronRight, LuEllipsis } from "react-icons/lu";

import { BreadcrumbDropdown, BreadcrumbTrigger, Link } from "components/core";
import { app } from "lib/config";

const sharedIconStyles = {
  color: "foreground.subtle",
  h: 4,
  w: 4,
  mx: 1.5,
};

interface NestedItemRecord {
  /** Label for the sub-item. */
  label: string;
  /** URL path the sub-item navigates to. */
  href: `/${string}`;
}

interface SubItemRecord {
  /** Label for the sub-item. */
  label: string;
  /** URL path the sub-item navigates to. */
  href: `/${string}`;
}

export interface BreadcrumbRecord {
  /** Label for the breadcrumb. */
  label: string;
  /** URL path the breadcrumb navigates to. */
  href?: `/${string}`;
  /** Sub-items for the breadcrumb. */
  subItems?: SubItemRecord[];
  /** Nested sub-items for the breadcrumb. */
  nestedSubItems?: NestedItemRecord[];
}

interface Props {
  /** Array of navigation breadcrumbs. */
  breadcrumbs: BreadcrumbRecord[];
}

/**
 * Breadcrumb.
 */
const Breadcrumb = ({ breadcrumbs }: Props) => {
  const lastItem = breadcrumbs[breadcrumbs.length - 1];

  return (
    <Flex fontSize="sm" align="center">
      <Link href="/">
        <Text
          color="foreground.subtle"
          _hover={{ color: "foreground.default" }}
        >
          {app.breadcrumb}
        </Text>
      </Link>

      {/* base viewport */}
      <Flex align="center" display={{ base: "flex", lg: "none" }}>
        <Icon src={LuChevronRight} {...sharedIconStyles} />

        {breadcrumbs.length > 1 && (
          <Flex>
            <BreadcrumbDropdown
              positioning={{
                offset: {
                  mainAxis: 12,
                },
              }}
              trigger={
                <Flex align="center" cursor="pointer">
                  <Icon
                    src={LuEllipsis}
                    size="sm"
                    color={{
                      base: "foreground.subtle",
                      _hover: "foreground.default",
                    }}
                  />
                </Flex>
              }
              breadcrumbs={breadcrumbs.slice(0, -1)}
            />

            <Icon src={LuChevronRight} {...sharedIconStyles} />
          </Flex>
        )}

        {lastItem.subItems?.length ? (
          <BreadcrumbDropdown
            trigger={
              <Flex>
                <BreadcrumbTrigger
                  label={lastItem.label}
                  isLastItem={true}
                  icon
                />
              </Flex>
            }
            breadcrumbs={lastItem.subItems}
          />
        ) : (
          <BreadcrumbTrigger label={lastItem.label} isLastItem={true} />
        )}
      </Flex>

      {/* Large viewport */}
      <Flex display={{ base: "none", lg: "flex" }}>
        {breadcrumbs.map(({ label, href, subItems }, index) => {
          const isLastItem = breadcrumbs.length - 1 === index;

          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: index used in the key in case an organization and project have the same label
            <Flex key={`${label}-${index}`} align="center">
              <Icon src={LuChevronRight} {...sharedIconStyles} />

              {subItems?.length ? (
                <BreadcrumbDropdown
                  trigger={
                    <Flex>
                      <BreadcrumbTrigger
                        label={label}
                        isLastItem={isLastItem}
                        icon
                      />
                    </Flex>
                  }
                  breadcrumbs={subItems}
                />
              ) : href ? (
                <Link href={href}>
                  <BreadcrumbTrigger label={label} isLastItem={isLastItem} />
                </Link>
              ) : (
                <Text>{label}</Text>
              )}
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default Breadcrumb;
