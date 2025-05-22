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

export interface BreadcrumbRecord {
  label: string;
  href?: `/${string}`;
  /** Sub-items or nested dropdown items (unified) */
  children?: {
    label: string;
    href?: `/${string}`;
  }[];
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

        {lastItem.children?.length ? (
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
            breadcrumbs={lastItem.children}
          />
        ) : (
          <BreadcrumbTrigger label={lastItem.label} isLastItem={true} />
        )}
      </Flex>

      {/* Large viewport */}
      <Flex display={{ base: "none", lg: "flex" }}>
        {breadcrumbs.map(({ label, href, children }, index) => {
          const isLastItem = breadcrumbs.length - 1 === index;

          return (
            <Flex
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={`${label}-${index}`}
              align="center"
            >
              <Icon src={LuChevronRight} {...sharedIconStyles} />

              {children?.length ? (
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
                  breadcrumbs={children}
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
