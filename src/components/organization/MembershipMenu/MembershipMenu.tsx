import { Button, Icon, Menu, MenuItem, MenuItemGroup } from "@omnidev/sigil";
import { LuChevronDown } from "react-icons/lu";

import type { MenuProps } from "@omnidev/sigil";
import type { Row } from "@tanstack/react-table";
import type { MemberFragment } from "generated/graphql";

interface Props extends MenuProps {
  /** The selected rows in the membership table */
  selectedRows: Row<MemberFragment>[];
}

const MembershipMenu = ({ selectedRows, ...rest }: Props) => {
  return (
    <Menu
      trigger={
        <Button size="sm" variant="outline">
          {`${selectedRows.length} Selected`}
          <Icon src={LuChevronDown} />
        </Button>
      }
      {...rest}
    >
      <MenuItemGroup>
        <MenuItem value="admin">Give administrative privileges</MenuItem>
        <MenuItem value="remove" color="red">
          Remove from organization
        </MenuItem>
      </MenuItemGroup>
    </Menu>
  );
};

export default MembershipMenu;
