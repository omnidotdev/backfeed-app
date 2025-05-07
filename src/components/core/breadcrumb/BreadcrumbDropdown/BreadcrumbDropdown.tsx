import {
  Icon,
  Menu,
  MenuItemGroup,
  MenuItem,
  Text,
  Flex,
} from "@omnidev/sigil";
import { LuChevronRight } from "react-icons/lu";

import { Link } from "components/core";

import type { BreadcrumbRecord } from "components/core/breadcrumb";
import type { MenuProps } from "@omnidev/sigil";

interface Props extends MenuProps {
  /** Array of navigation breadcrumbs. */
  breadcrumbs: BreadcrumbRecord[];
}

/**
 * Breadcrumb dropdown.
 */
const BreadcrumbDropdown = ({ breadcrumbs, trigger, ...rest }: Props) => (
  <Menu trigger={trigger} {...rest}>
    <MenuItemGroup minW={32} w="full">
      {breadcrumbs.map(({ label, href, nestedSubItems }, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <Flex key={index} w="full">
          {nestedSubItems?.length ? (
            <Menu
              trigger={
                <MenuItem value={label} w="full" justifyContent="space-between">
                  <Text>{label}</Text>

                  <Icon
                    src={LuChevronRight}
                    color="foreground.subtle"
                    h={4}
                    w={4}
                  />
                </MenuItem>
              }
            >
              <MenuItemGroup minW={32}>
                {nestedSubItems.map(
                  ({ label: nestedLabel, href: nestedHref }) => (
                    <MenuItem
                      display="block"
                      key={nestedLabel}
                      value={nestedLabel}
                    >
                      {nestedHref ? (
                        <Link href={nestedHref}>
                          <Flex alignItems="center" w="full" h="full">
                            {nestedLabel}
                          </Flex>
                        </Link>
                      ) : (
                        <Text>{nestedLabel}</Text>
                      )}
                    </MenuItem>
                  ),
                )}
              </MenuItemGroup>
            </Menu>
          ) : (
            <MenuItem value={label} display="block" w="full">
              {href ? (
                <Link href={href}>
                  <Flex alignItems="center" w="full" h="full">
                    {label}
                  </Flex>
                </Link>
              ) : (
                <Text>{label}</Text>
              )}
            </MenuItem>
          )}
        </Flex>
      ))}
    </MenuItemGroup>
  </Menu>
);

export default BreadcrumbDropdown;
