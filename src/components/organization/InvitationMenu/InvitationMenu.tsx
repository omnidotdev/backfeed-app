"use client";

import { Button, Icon, Menu, MenuItem, MenuItemGroup } from "@omnidev/sigil";
import { useAsyncQueuer } from "@tanstack/react-pacer/async-queuer";
import {
  useCreateInvitationMutation,
  useDeleteInvitationMutation,
  useInvitationsQuery,
} from "generated/graphql";
import { app, isDevEnv } from "lib/config";
import { useAuth } from "lib/hooks";
import { getQueryClient, toaster } from "lib/util";
import ms from "ms";
import { useRef, useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import { match } from "ts-pattern";

import type { MenuProps } from "@omnidev/sigil";
import type { Row } from "@tanstack/react-table";
import type { InvitationFragment, Organization } from "generated/graphql";
import type { JsxStyleProps } from "generated/panda/types";

const inviteMemberDetails = app.organizationInvitationsPage.cta.inviteMember;

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
  /** Organization ID. */
  organizationId: Organization["rowId"];
}

/**
 * Invitation menu to handle actions on selected organization invites.
 */
const InvitationMenu = ({
  selectedRows,
  toggleRowSelection,
  organizationId,
  ...rest
}: Props) => {
  const { user } = useAuth();

  const toastId = useRef<string>(undefined);

  const [isResending, setIsResending] = useState(false);

  const queryClient = getQueryClient();

  // NB: Resend's default rate limit is 2 requests per second. So we run 2 invites concurrently, and wait a second in between
  const queuer = useAsyncQueuer({
    concurrency: 2,
    started: false,
    wait: ms("1s"),
  });

  const { mutateAsync: deleteInvitation } = useDeleteInvitationMutation({
    onSettled: () => {
      if (!isResending) {
        return queryClient.invalidateQueries({
          queryKey: useInvitationsQuery.getKey({
            organizationId,
          }),
        });
      }
    },
  });
  const { mutateAsync: inviteToOrganization } = useCreateInvitationMutation({
    onSettled: () => {
      if (!queuer.getPendingItems().length) {
        setIsResending(false);

        return queryClient.invalidateQueries({
          queryKey: useInvitationsQuery.getKey({
            organizationId,
          }),
        });
      }
    },
    onSuccess: () => {
      // Wait until the queue is done processing all requests
      if (!queuer.getPendingItems().length) {
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
            inviterEmail: user?.email,
            inviterUsername: user?.name,
            recipientEmail: invitation.email,
            organizationName: invitation.organization?.name,
          }),
        }),
        inviteToOrganization({
          input: {
            invitation: {
              email: invitation.email,
              organizationId,
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
            queuer.addItem(async () => await sendInvite(invitation)),
          );

          await queuer.start();
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
          {app.organizationInvitationsPage.invitationsMenu.resend}
        </MenuItem>

        <MenuItem
          value={MenuAction.DeclineInvitation}
          color="red"
          {...menuItemStyles}
          onClick={() =>
            handleMenuAction({ type: MenuAction.DeclineInvitation })
          }
        >
          {app.organizationInvitationsPage.invitationsMenu.delete}
        </MenuItem>
      </MenuItemGroup>
    </Menu>
  );
};

export default InvitationMenu;
