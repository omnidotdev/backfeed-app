import { accountUrl } from "@omnidotdev/providers/react";
import {
  AccountMenu,
  AccountMenuItem,
} from "@omnidotdev/thornberry/account-menu";
import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { FiUser } from "react-icons/fi";

import signOut from "@/lib/auth/signOut";
import switchAccount from "@/lib/auth/switchAccount";
import { useMenuAccounts } from "@/lib/auth/useMenuAccounts";
import app from "@/lib/config/app.config";
import { ACCOUNT_URL, AUTH_BASE_URL, isDevEnv } from "@/lib/config/env.config";
import useViewportSize from "@/lib/hooks/useViewportSize";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";

import type { IdpLogoutConfig } from "@omnidotdev/providers/auth";

/**
 * The signed-in user's account menu: the standard Omni account menu, as the
 * header avatar on wide screens and as a full-width row in the phone sidebar
 */
const AccountInformation = () => {
  const { session } = useRouteContext({ from: "__root__" });
  const navigate = useNavigate();
  // The other accounts signed in on this browser, one click to switch to
  const accounts = useMenuAccounts(AUTH_BASE_URL, !!session);
  const isWideViewport = useViewportSize({
    minWidth: "40rem",
  });

  const { setIsOpen: setIsMobileSidebarOpen } = useDialogStore({
    type: DialogType.MobileSidebar,
  });

  if (!session) return null;

  const handleProfileClick = () => {
    setIsMobileSidebarOpen(false);
    navigate({
      to: "/profile/$userId/account",
      params: { userId: session.user.identityProviderId! },
    });
  };

  const handleLogout = async (
    signOutOf: IdpLogoutConfig["accounts"] = "current",
  ) => {
    try {
      await signOut({ accounts: signOutOf });
    } catch (err) {
      if (isDevEnv) console.error(err);
    }
  };

  return (
    <AccountMenu
      variant={isWideViewport ? "avatar" : "sidebar"}
      user={{
        // The username is the user's handle here, so it heads the menu when
        // no display name is set
        name: session.user.name || session.user.username,
        email: session.user.email,
        image: session.user.image,
      }}
      onSignOut={() => void handleLogout("current")}
      onSignOutAll={() => void handleLogout("all")}
      onSwitchAccount={() => void switchAccount()}
      accounts={accounts}
      onSelectAccount={(account) => void switchAccount(account.id)}
      manageAccountUrl={
        accountUrl(ACCOUNT_URL, {
          loginHint: session.user.identityProviderId,
        }) || undefined
      }
      signOutLabel={app.auth.signOut.label}
      // Opens upward from the bottom of the phone sidebar
      positioning={isWideViewport ? undefined : { placement: "top" }}
    >
      <AccountMenuItem value="profile" onSelect={handleProfileClick}>
        <FiUser />
        {app.auth.profile.label}
      </AccountMenuItem>
    </AccountMenu>
  );
};

export default AccountInformation;
