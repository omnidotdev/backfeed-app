import { Menu, MenuItemGroup, MenuItem, Text } from "@omnidev/sigil";

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
    <MenuItemGroup minW={32}>
      {breadcrumbs.map(({ label, href }) => (
        <MenuItem key={label} value={label}>
          {href ? <Link href={href}>{label}</Link> : <Text>{label}</Text>}
        </MenuItem>
      ))}
    </MenuItemGroup>
  </Menu>
);

export default BreadcrumbDropdown;
