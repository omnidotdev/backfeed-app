import { Button, Icon, Menu, MenuItem, MenuItemGroup } from "@omnidev/sigil";
import { LuChevronDown } from "react-icons/lu";

import {
  Role,
  useRemoveMemberMutation,
  useUpdateMemberMutation,
} from "generated/graphql";
import { useAuth, useOrganizationMembership } from "lib/hooks";

import type { MenuProps } from "@omnidev/sigil";
import type { Row } from "@tanstack/react-table";
import type { MemberFragment } from "generated/graphql";
import type { JsxStyleProps } from "generated/panda/types";

enum MenuAction {
  MakeAdmin = "admin",
  Remove = "remove",
}

const menuItemStyles: JsxStyleProps = {
  bgColor: { _disabled: "inherit" },
  opacity: { _disabled: 0.5 },
  cursor: { _disabled: "not-allowed" },
};

interface Props extends MenuProps {
  /** Organization ID. */
  organizationId: string;
  /** The selected rows in the membership table */
  selectedRows: Row<MemberFragment>[];
  /** Toggle the selection state of the rows. */
  toggleRowSelection: (value?: boolean) => void;
}

/**
 * Organization membership menu to handle actions on selected members.
 */
const MembershipMenu = ({
  organizationId,
  selectedRows,
  toggleRowSelection,
  ...rest
}: Props) => {
  const { user } = useAuth();

  const { isOwner } = useOrganizationMembership({
    userId: user?.rowId,
    organizationId,
  });

  const { mutate: updateMember } = useUpdateMemberMutation();
  const { mutate: removeMember } = useRemoveMemberMutation();

  const handleMenuAction = ({ type }: { type: MenuAction }) => {
    // NB: this is safe as owners are already filtered out by default from the query.
    for (const row of selectedRows) {
      const member = row.original;

      if (type === MenuAction.MakeAdmin) {
        updateMember({
          rowId: member.rowId,
          patch: {
            role: Role.Admin,
          },
        });
      } else {
        removeMember({
          rowId: member.rowId,
        });
      }
    }

    toggleRowSelection(false);
  };

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
        <MenuItem
          value={MenuAction.MakeAdmin}
          disabled={!isOwner}
          {...menuItemStyles}
          onClick={() => handleMenuAction({ type: MenuAction.MakeAdmin })}
        >
          Give administrative privileges
        </MenuItem>
        <MenuItem
          value={MenuAction.Remove}
          color="red"
          disabled={!isOwner}
          {...menuItemStyles}
          onClick={() => handleMenuAction({ type: MenuAction.Remove })}
        >
          Remove from organization
        </MenuItem>
      </MenuItemGroup>
    </Menu>
  );
};

export default MembershipMenu;
