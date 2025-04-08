import { Button, Icon, Menu, MenuItem, MenuItemGroup } from "@omnidev/sigil";
import { LuChevronDown } from "react-icons/lu";
import { match } from "ts-pattern";

import {
  Role,
  useRemoveMemberMutation,
  useUpdateMemberMutation,
} from "generated/graphql";
import { app } from "lib/config";
import { useAuth, useOrganizationMembership } from "lib/hooks";

import type { MenuProps } from "@omnidev/sigil";
import type { Row } from "@tanstack/react-table";
import type { MemberFragment } from "generated/graphql";
import type { JsxStyleProps } from "generated/panda/types";

enum MenuAction {
  MakeAdmin = "admin",
  RemoveAdmin = "removeAdmin",
  RemoveMember = "removeMember",
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

  const selectedRowsAreAdmins = selectedRows.every(
    (row) => row.original.role === Role.Admin
  );

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

      match(type)
        .with(MenuAction.MakeAdmin, () =>
          updateMember({
            rowId: member.rowId,
            patch: {
              role: Role.Admin,
            },
          })
        )
        .with(MenuAction.RemoveAdmin, () =>
          updateMember({
            rowId: member.rowId,
            patch: {
              role: Role.Member,
            },
          })
        )
        .with(MenuAction.RemoveMember, () =>
          removeMember({
            rowId: member.rowId,
          })
        )
        .exhaustive();
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
        {selectedRowsAreAdmins ? (
          <MenuItem
            value={MenuAction.RemoveAdmin}
            color="red"
            disabled={!isOwner}
            {...menuItemStyles}
            onMouseDown={() =>
              handleMenuAction({ type: MenuAction.RemoveAdmin })
            }
          >
            {app.organizationMembersPage.membersMenu.removeAdmin}
          </MenuItem>
        ) : (
          <MenuItem
            value={MenuAction.MakeAdmin}
            disabled={!isOwner}
            {...menuItemStyles}
            onMouseDown={() => handleMenuAction({ type: MenuAction.MakeAdmin })}
          >
            {app.organizationMembersPage.membersMenu.makeAdmin}
          </MenuItem>
        )}

        <MenuItem
          value={MenuAction.RemoveMember}
          color="red"
          disabled={!isOwner}
          {...menuItemStyles}
          onMouseDown={() =>
            handleMenuAction({ type: MenuAction.RemoveMember })
          }
        >
          {app.organizationMembersPage.membersMenu.removeMember}
        </MenuItem>
      </MenuItemGroup>
    </Menu>
  );
};

export default MembershipMenu;
