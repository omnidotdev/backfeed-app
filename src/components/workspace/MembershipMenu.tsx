import { Button, Icon, Menu, MenuItem, MenuItemGroup } from "@omnidev/sigil";
import { useRouteContext } from "@tanstack/react-router";
import { LuChevronDown } from "react-icons/lu";
import { match } from "ts-pattern";

import app from "@/lib/config/app.config";
import {
  useRemoveMember,
  useUpdateMemberRole,
} from "@/lib/hooks/useOrganizationMembers";

import type { MenuProps } from "@omnidev/sigil";
import type { Row } from "@tanstack/react-table";
import type { JsxStyleProps } from "@/generated/panda/types";
import type { IdpMember } from "@/lib/idp";

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
  /** The selected rows in the membership table */
  selectedRows: Row<IdpMember>[];
  /** Toggle the selection state of the rows. */
  toggleRowSelection: (value?: boolean) => void;
}

/**
 * Workspace membership menu to handle actions on selected members.
 */
const MembershipMenu = ({
  selectedRows,
  toggleRowSelection,
  ...rest
}: Props) => {
  const { isOwner, organizationId, session } = useRouteContext({
    from: "/_public/workspaces/$workspaceSlug/_layout/_manage/members",
  });

  const selectedRowsAreAdmins = selectedRows.every(
    (row) => row.original.role === "admin",
  );

  const { mutate: updateMemberRole } = useUpdateMemberRole();
  const { mutate: removeMember } = useRemoveMember();

  const handleMenuAction = ({ type }: { type: MenuAction }) => {
    // NB: this is safe as owners are already filtered out by default from the query.
    for (const row of selectedRows) {
      const member = row.original;

      match(type)
        .with(MenuAction.MakeAdmin, () =>
          updateMemberRole({
            organizationId: organizationId!,
            memberId: member.id,
            role: "admin",
            accessToken: session?.accessToken!,
          }),
        )
        .with(MenuAction.RemoveAdmin, () =>
          updateMemberRole({
            organizationId: organizationId!,
            memberId: member.id,
            role: "member",
            accessToken: session?.accessToken!,
          }),
        )
        .with(MenuAction.RemoveMember, () =>
          removeMember({
            organizationId: organizationId!,
            memberId: member.id,
            accessToken: session?.accessToken!,
          }),
        )
        .exhaustive();
    }

    toggleRowSelection(false);
  };

  return (
    <Menu
      trigger={
        <Button
          size="sm"
          variant="outline"
          className="border-primary text-primary hover:bg-primary/10"
        >
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
            onClick={() => handleMenuAction({ type: MenuAction.RemoveAdmin })}
          >
            {app.workspaceMembersPage.membersMenu.removeAdmin}
          </MenuItem>
        ) : (
          <MenuItem
            value={MenuAction.MakeAdmin}
            disabled={!isOwner}
            {...menuItemStyles}
            onClick={() => handleMenuAction({ type: MenuAction.MakeAdmin })}
          >
            {app.workspaceMembersPage.membersMenu.makeAdmin}
          </MenuItem>
        )}

        <MenuItem
          value={MenuAction.RemoveMember}
          color="red"
          disabled={!isOwner}
          {...menuItemStyles}
          onClick={() => handleMenuAction({ type: MenuAction.RemoveMember })}
        >
          {app.workspaceMembersPage.membersMenu.removeMember}
        </MenuItem>
      </MenuItemGroup>
    </Menu>
  );
};

export default MembershipMenu;
