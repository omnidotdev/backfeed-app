import { Portal } from "@ark-ui/react/portal";
import { getRouteApi } from "@tanstack/react-router";
import { LuChevronDown } from "react-icons/lu";
import { match } from "ts-pattern";

import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuPositioner,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import app from "@/lib/config/app.config";
import {
  useRemoveMember,
  useUpdateMemberRole,
} from "@/lib/hooks/useOrganizationMembers";

import type { Row } from "@tanstack/react-table";
import type { ComponentProps } from "react";
import type { IdpMember } from "@/lib/idp";

const menuItemClassName = "disabled:cursor-not-allowed disabled:opacity-50";

const membersRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout/_manage/members",
);

enum MenuAction {
  MakeAdmin = "admin",
  RemoveAdmin = "removeAdmin",
  RemoveMember = "removeMember",
}

interface Props extends ComponentProps<typeof MenuRoot> {
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
  const { isOwner, organizationId, session } = membersRoute.useRouteContext();

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
    <MenuRoot {...rest}>
      <MenuTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="border-primary text-primary hover:bg-primary/10"
        >
          {`${selectedRows.length} Selected`}

          <LuChevronDown />
        </Button>
      </MenuTrigger>

      <Portal>
        <MenuPositioner>
          <MenuContent>
            <MenuItemGroup>
              {selectedRowsAreAdmins ? (
                <MenuItem
                  value={MenuAction.RemoveAdmin}
                  disabled={!isOwner}
                  className={`text-primary ${menuItemClassName}`}
                  onClick={() =>
                    handleMenuAction({ type: MenuAction.RemoveAdmin })
                  }
                >
                  {app.workspaceMembersPage.membersMenu.removeAdmin}
                </MenuItem>
              ) : (
                <MenuItem
                  value={MenuAction.MakeAdmin}
                  disabled={!isOwner}
                  className={menuItemClassName}
                  onClick={() =>
                    handleMenuAction({ type: MenuAction.MakeAdmin })
                  }
                >
                  {app.workspaceMembersPage.membersMenu.makeAdmin}
                </MenuItem>
              )}

              <MenuItem
                value={MenuAction.RemoveMember}
                disabled={!isOwner}
                className={`text-primary ${menuItemClassName}`}
                onClick={() =>
                  handleMenuAction({ type: MenuAction.RemoveMember })
                }
              >
                {app.workspaceMembersPage.membersMenu.removeMember}
              </MenuItem>
            </MenuItemGroup>
          </MenuContent>
        </MenuPositioner>
      </Portal>
    </MenuRoot>
  );
};

export default MembershipMenu;
