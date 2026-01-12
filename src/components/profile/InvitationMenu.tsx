import { Button, Icon, Menu, MenuItem, MenuItemGroup } from "@omnidev/sigil";
import { useRouteContext } from "@tanstack/react-router";
import { LuChevronDown } from "react-icons/lu";
import { match } from "ts-pattern";

import {
  Role,
  useCreateMemberMutation,
  useDeleteInvitationMutation,
} from "@/generated/graphql";
import app from "@/lib/config/app.config";

import type { MenuProps } from "@omnidev/sigil";
import type { Row } from "@tanstack/react-table";
import type { InvitationFragment } from "@/generated/graphql";
import type { JsxStyleProps } from "@/generated/panda/types";

enum MenuAction {
  AcceptInvitation = "acceptInvitation",
  DeclineInvitation = "declineInvitation",
}

const menuItemStyles: JsxStyleProps = {
  bgColor: { _disabled: "inherit" },
  opacity: { _disabled: 0.5 },
  cursor: { _disabled: "not-allowed" },
};

interface Props extends MenuProps {
  /** The selected rows in the invitation table. */
  selectedRows: Row<InvitationFragment>[];
  /** Toggle the selection state of the rows. */
  toggleRowSelection: (value?: boolean) => void;
}

/**
 * Invitation menu to handle actions on selected workspace invites.
 */
const InvitationMenu = ({
  selectedRows,
  toggleRowSelection,
  ...rest
}: Props) => {
  const { user, queryClient } = useRouteContext({
    from: "/_auth/profile/$userId/_layout/invitations",
  });

  // NB: when a user accepts an invitation, all queries should be invalidated to populate data that is based on the new workspace they are now a part of
  const onSettled = async () => queryClient.invalidateQueries();

  const { mutate: acceptInvitation } = useCreateMemberMutation({
    onSettled,
  });
  const { mutate: deleteInvitation } = useDeleteInvitationMutation({
    onSettled,
  });

  const handleMenuAction = ({ type }: { type: MenuAction }) => {
    for (const row of selectedRows) {
      const invitation = row.original;

      match(type)
        .with(MenuAction.AcceptInvitation, () => {
          acceptInvitation({
            input: {
              member: {
                userId: user?.rowId!,
                workspaceId: invitation.workspaceId,
                role: Role.Member,
              },
            },
          });

          deleteInvitation({
            rowId: invitation.rowId,
          });
        })
        .with(MenuAction.DeclineInvitation, () =>
          deleteInvitation({
            rowId: invitation.rowId,
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
        <MenuItem
          value={MenuAction.AcceptInvitation}
          color="green"
          {...menuItemStyles}
          onClick={() =>
            handleMenuAction({ type: MenuAction.AcceptInvitation })
          }
        >
          {app.profileInvitationsPage.table.actions.accept.label}
        </MenuItem>

        <MenuItem
          value={MenuAction.DeclineInvitation}
          color="red"
          {...menuItemStyles}
          onClick={() =>
            handleMenuAction({ type: MenuAction.DeclineInvitation })
          }
        >
          {app.profileInvitationsPage.table.actions.delete.label}
        </MenuItem>
      </MenuItemGroup>
    </Menu>
  );
};

export default InvitationMenu;
