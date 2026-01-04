import { Button, Icon, Menu, MenuItem, MenuItemGroup } from "@omnidev/sigil";
import { useAsyncQueuer } from "@tanstack/react-pacer/async-queuer";
import { useRouteContext } from "@tanstack/react-router";
import ms from "ms";
import { useRef, useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import { match } from "ts-pattern";

import {
  useCreateInvitationMutation,
  useDeleteInvitationMutation,
} from "@/generated/graphql";
import app from "@/lib/config/app.config";
import { isDevEnv } from "@/lib/config/env.config";
import { invitationsOptions } from "@/lib/options/invitations";
import toaster from "@/lib/util/toaster";

import type { MenuProps } from "@omnidev/sigil";
import type { Row } from "@tanstack/react-table";
import type { InvitationFragment } from "@/generated/graphql";
import type { JsxStyleProps } from "@/generated/panda/types";

const inviteMemberDetails = app.workspaceInvitationsPage.cta.inviteMember;

enum MenuAction {
  ResendInvitation = "resendInvitation",
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
  const { session, workspaceId, queryClient } = useRouteContext({
    from: "/_auth/workspaces/$workspaceSlug/_layout/_manage/invitations",
  });

  const toastId = useRef<string>(undefined);

  const [isResending, setIsResending] = useState(false);

  const { mutateAsync: deleteInvitation } = useDeleteInvitationMutation({
    onSettled: () => {
      if (!isResending) {
        return queryClient.invalidateQueries({
          queryKey: invitationsOptions({ workspaceId }).queryKey,
        });
      }
    },
  });
  const { mutateAsync: inviteToWorkspace } = useCreateInvitationMutation({
    onSettled: () => {
      if (!queuer.peekPendingItems().length) {
        setIsResending(false);

        return queryClient.invalidateQueries({
          queryKey: invitationsOptions({ workspaceId }).queryKey,
        });
      }
    },
    onSuccess: () => {
      // Wait until the queue is done processing all requests
      if (!queuer.peekPendingItems().length) {
        if (toastId.current) {
          toaster.update(toastId.current, {
            title: inviteMemberDetails.toast.success.title,
            description: inviteMemberDetails.toast.success.description,
            type: "success",
          });
        }
      }
    },
  });

  const sendInvite = async (invitation: InvitationFragment) => {
    try {
      await deleteInvitation({
        rowId: invitation.rowId,
      });

      const responses = await Promise.allSettled([
        fetch("/api/invite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            inviterEmail: session?.user?.email,
            inviterUsername: session?.user?.name,
            recipientEmail: invitation.email,
            workspaceName: invitation.workspace?.name,
          }),
        }),
        inviteToWorkspace({
          input: {
            invitation: {
              email: invitation.email,
              workspaceId,
            },
          },
        }),
      ]);

      if (!responses.every((res) => res.status === "fulfilled")) {
        setIsResending(false);

        if (toastId.current) {
          toaster.update(toastId.current, {
            title: inviteMemberDetails.toast.errors.title,
            description: `${inviteMemberDetails.toast.errors.default} to ${invitation.email}`,
            type: "error",
          });
        }
      }
    } catch (error) {
      setIsResending(false);

      if (isDevEnv) {
        console.error(error);
      }
    }
  };

  // NB: Resend's default rate limit is 2 requests per second. So we run 2 invites concurrently, and wait a second in between
  const queuer = useAsyncQueuer(sendInvite, {
    concurrency: 2,
    started: false,
    wait: ms("1s"),
  });

  const handleMenuAction = ({ type }: { type: MenuAction }) => {
    match(type)
      .with(MenuAction.ResendInvitation, async () => {
        setIsResending(true);

        toastId.current = toaster.create({
          title: inviteMemberDetails.toast.loading.title,
          type: "loading",
        });

        try {
          selectedRows.map(({ original: invitation }) =>
            queuer.addItem(invitation),
          );

          queuer.start();
        } catch (error) {
          if (toastId.current) {
            toaster.update(toastId.current, {
              title: inviteMemberDetails.toast.errors.title,
              description:
                error instanceof Error && error.message
                  ? error.message
                  : inviteMemberDetails.toast.errors.default,
              type: "error",
            });
          }
        }
      })
      .with(
        MenuAction.DeclineInvitation,
        async () =>
          await Promise.all(
            selectedRows.map(
              async (row) =>
                await deleteInvitation({
                  rowId: row.original.rowId,
                }),
            ),
          ),
      )
      .exhaustive();

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
          value={MenuAction.ResendInvitation}
          {...menuItemStyles}
          onClick={() =>
            handleMenuAction({ type: MenuAction.ResendInvitation })
          }
        >
          {app.workspaceInvitationsPage.invitationsMenu.resend}
        </MenuItem>

        <MenuItem
          value={MenuAction.DeclineInvitation}
          color="red"
          {...menuItemStyles}
          onClick={() =>
            handleMenuAction({ type: MenuAction.DeclineInvitation })
          }
        >
          {app.workspaceInvitationsPage.invitationsMenu.delete}
        </MenuItem>
      </MenuItemGroup>
    </Menu>
  );
};

export default InvitationMenu;
