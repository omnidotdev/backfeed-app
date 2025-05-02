"use client";

import { Button, Flex, Icon, Text } from "@omnidev/sigil";
import { LuChevronRight } from "react-icons/lu";

import { BreadcrumbTrigger, HoverCard, Link } from "components/core";
import { app } from "lib/config";

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

    {breadcrumbs.map(({ label, href, subItems }, index) => {
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

          {href || subItems ? (
            subItems?.length ? (
              <HoverCard
                openDelay={0}
                trigger={
                  <Link href={href}>
                    <BreadcrumbTrigger
                      label={label}
                      isLastItem={isLastItem}
                      icon={true}
                    />
                  </Link>
                }
              >
                <Flex direction="column" p={2} gap={2}>
                  {subItems?.map(({ label, href }) => (
                    <Link key={label} href={href}>
                      <Button variant="ghost" size="xs">
                        <Text>{label}</Text>
                      </Button>
                    </Link>
                  ))}
                </Flex>
              </HoverCard>
            ) : (
              href && (
                <Link href={href}>
                  <BreadcrumbTrigger label={label} isLastItem={isLastItem} />
                </Link>
              )
            )
          ) : (
            <Text>{label}</Text>
          )}
        </Flex>
      );
    })}
  </Flex>
);

export default Breadcrumb;
