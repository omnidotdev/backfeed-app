import {
  Icon,
  Menu,
  MenuItemGroup,
  MenuItem,
  Text,
  Flex,
} from "@omnidev/sigil";
import { LuChevronRight } from "react-icons/lu";
import { useRouter } from "next/navigation";

import type { BreadcrumbRecord } from "components/core/breadcrumb";
import type { MenuProps } from "@omnidev/sigil";

interface Props extends MenuProps {
  /** Array of navigation breadcrumbs. */
  breadcrumbs: BreadcrumbRecord[];
}

/**
 * Breadcrumb dropdown.
 */
const BreadcrumbDropdown = ({ breadcrumbs, trigger, ...rest }: Props) => {
  const router = useRouter();

  return (
    <Menu trigger={trigger} {...rest}>
      <MenuItemGroup minW={32} w="full">
        {breadcrumbs.map(({ label, href, children }, index) => (
          <Flex
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={`${label}-${index}`}
            w="full"
          >
            {children?.length ? (
              <Menu
                trigger={
                  <MenuItem
                    value={label}
                    w="full"
                    justifyContent="space-between"
                  >
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
                  {children.map(({ label: childLabel, href: childHref }) => (
                    <MenuItem
                      key={childLabel}
                      value={childLabel}
                      onSelect={() => childHref && router.push(childHref)}
                    >
                      <Flex alignItems="center" w="full" h="full">
                        {childLabel}
                      </Flex>
                    </MenuItem>
                  ))}
                </MenuItemGroup>
              </Menu>
            ) : (
              <MenuItem
                value={label}
                w="full"
                onSelect={() => href && router.push(href)}
              >
                <Flex alignItems="center" w="full" h="full">
                  {label}
                </Flex>
              </MenuItem>
            )}
          </Flex>
        ))}
      </MenuItemGroup>
    </Menu>
  );
};

export default BreadcrumbDropdown;
