import { Button, Icon, Menu, MenuItem, MenuItemGroup } from "@omnidev/sigil";
import { LuChevronDown } from "react-icons/lu";
import { match } from "ts-pattern";

import {
  useDeleteInvitationMutation,
  useInvitationsQuery,
  useCreateInvitationMutation,
} from "generated/graphql";
import { app, isDevEnv } from "lib/config";
import { useAuth } from "lib/hooks";
import { getQueryClient, toaster } from "lib/util";

import type { MenuProps } from "@omnidev/sigil";
import type { Row } from "@tanstack/react-table";
import type { Organization, InvitationFragment } from "generated/graphql";
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

  const queryClient = getQueryClient();

  const onSettled = () =>
    queryClient.invalidateQueries({
      queryKey: useInvitationsQuery.getKey({
        organizationId,
      }),
    });

  const { mutateAsync: deleteInvitation } = useDeleteInvitationMutation({
    onSettled,
  });
  const { mutateAsync: inviteToOrganization } = useCreateInvitationMutation({
    onSettled,
  });

  const handleMenuAction = ({ type }: { type: MenuAction }) => {
    for (const row of selectedRows) {
      const invitation = row.original;

      match(type)
        .with(MenuAction.ResendInvitation, async () => {
          await deleteInvitation({
            rowId: invitation.rowId,
          });

          toaster.promise(
            async () => {
              try {
                const [sendEmailResponse] = await Promise.all([
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

                if (!sendEmailResponse.ok) {
                  throw new Error(inviteMemberDetails.toast.errors.default);
                }
              } catch (error) {
                if (isDevEnv) {
                  console.error("Error resending invitation:", error);
                }
                throw error;
              }
            },
            {
              loading: {
                title: inviteMemberDetails.toast.loading.title,
              },
              success: {
                title: inviteMemberDetails.toast.success.title,
                description: inviteMemberDetails.toast.success.description,
              },
              error: (error) => ({
                title: inviteMemberDetails.toast.errors.title,
                description:
                  error instanceof Error && error.message
                    ? error.message
                    : inviteMemberDetails.toast.errors.default,
              }),
            },
          );
        })
        .with(
          MenuAction.DeclineInvitation,
          async () =>
            await deleteInvitation({
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
