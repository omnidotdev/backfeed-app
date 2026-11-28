# @omnidotdev/backfeed-app

## 0.1.0

### Minor Changes

- [#268](https://github.com/omnidotdev/backfeed-app/pull/268) [`dfebf24`](https://github.com/omnidotdev/backfeed-app/commit/dfebf24004ab87d316519e41012d34d50e979d2a) Thanks [@coopbri](https://github.com/coopbri)! - Signing in or out of Omni in another app now carries over here

- [#267](https://github.com/omnidotdev/backfeed-app/pull/267) [`c558fea`](https://github.com/omnidotdev/backfeed-app/commit/c558fea7042aaeb6581803af66ae5aa8ea75af7d) Thanks [@coopbri](https://github.com/coopbri)! - The account menu lists the other Omni accounts signed in on your browser, so switching to one takes a single click. When more than one account is signed in, Sign out ends only the account you use in Backfeed, and a new Sign out of all accounts entry ends every one. Links to your Omni account now open it as the same account you use in Backfeed

### Patch Changes

- [#269](https://github.com/omnidotdev/backfeed-app/pull/269) [`e3cf656`](https://github.com/omnidotdev/backfeed-app/commit/e3cf656960741a46549079f0b7adf458c47f849f) Thanks [@coopbri](https://github.com/coopbri)! - The feedback form no longer disappears once 15 people have submitted feedback; feedback submissions are unlimited on every plan, as advertised. The Free plan fallback limits now match the plan (up to 2 projects), and the pricing comparison table shows only the Free, Pro, and Team plans with the features each plan includes

- [#251](https://github.com/omnidotdev/backfeed-app/pull/251) [`dfdcb0c`](https://github.com/omnidotdev/backfeed-app/commit/dfdcb0cece4e0276d033f5ebc3c660acf6e62eb2) Thanks [@coopbri](https://github.com/coopbri)! - Buy and manage plans on the Omni account hub. Upgrade Plan on a workspace's settings and the pricing page's paid plans now open the hub's confirm step for that plan and workspace, and Manage Subscription opens plan management on the hub (change, cancel, or renew the plan, payment method, invoices); both come back to Backfeed. A new workspace is created on the hub's workspaces console. The in-app checkout, billing portal, and renew action are removed.

- [#253](https://github.com/omnidotdev/backfeed-app/pull/253) [`704a702`](https://github.com/omnidotdev/backfeed-app/commit/704a7023f38659e1e6ba4da61908f5648a6175a1) Thanks [@coopbri](https://github.com/coopbri)! - Stop writing users' email addresses to the logs: a failed sign-in token check logs only the error message, not the user's email and name, by moving to `@omnidotdev/providers` v0.2.0.

- [#265](https://github.com/omnidotdev/backfeed-app/pull/265) [`3b0176f`](https://github.com/omnidotdev/backfeed-app/commit/3b0176f894e26f3745d111fdce10db4166888681) Thanks [@coopbri](https://github.com/coopbri)! - Sign-in session data sent to the browser no longer includes the session token

- [#259](https://github.com/omnidotdev/backfeed-app/pull/259) [`f68a64c`](https://github.com/omnidotdev/backfeed-app/commit/f68a64cb39330e90296af318956586ef74926a02) Thanks [@coopbri](https://github.com/coopbri)! - Secondary badges use the amethyst brand color again, matching other Omni apps

- [#266](https://github.com/omnidotdev/backfeed-app/pull/266) [`45207e8`](https://github.com/omnidotdev/backfeed-app/commit/45207e8475aa554b7d14c6f1bff393a4cd167b03) Thanks [@coopbri](https://github.com/coopbri)! - Add Switch account to the account menu, which opens the Omni account picker and brings you back to the same page as the chosen account, without signing out first. Sign-in session tokens also stay out of reach of scripts running on the page.

- [#254](https://github.com/omnidotdev/backfeed-app/pull/254) [`9b5e551`](https://github.com/omnidotdev/backfeed-app/commit/9b5e551c75f31774e72c5f86538b4224feb78cbe) Thanks [@coopbri](https://github.com/coopbri)! - The account menu is now the standard Omni account menu, both as the header avatar and as the account row in the phone sidebar: it shows your initials until your picture loads, is headed by your name and email, and every entry is reachable from the keyboard. The workspace switcher now shows each workspace's `@handle` under its name.

- [#257](https://github.com/omnidotdev/backfeed-app/pull/257) [`f8c74d5`](https://github.com/omnidotdev/backfeed-app/commit/f8c74d55a832eb3e50fe53d780b94086b2135ce3) Thanks [@coopbri](https://github.com/coopbri)! - Secondary buttons and badges use the theme's subtle surface color, and dialogs no longer shift the page when they open.

- [#252](https://github.com/omnidotdev/backfeed-app/pull/252) [`cd54715`](https://github.com/omnidotdev/backfeed-app/commit/cd54715724c9b3d3e62eff9c05caefb939d685cf) Thanks [@coopbri](https://github.com/coopbri)! - The pricing billing-period switch, the feedback view switcher, and the character counter now use the shared Omni component library, so they behave and look consistent with other Omni apps. The rich-text editor picks up the latest editor improvements

- [#270](https://github.com/omnidotdev/backfeed-app/pull/270) [`d7e3ad7`](https://github.com/omnidotdev/backfeed-app/commit/d7e3ad720527f48fda37ba720b3fb21c465cc091) Thanks [@coopbri](https://github.com/coopbri)! - The pricing page now shows unlimited members on every plan, including Free

- [#250](https://github.com/omnidotdev/backfeed-app/pull/250) [`a6914ce`](https://github.com/omnidotdev/backfeed-app/commit/a6914ce57aa2d56bb58562f1d5edd74368ca291c) Thanks [@coopbri](https://github.com/coopbri)! - Upgrading a workspace from its settings now subscribes the workspace itself through the same secure checkout as the pricing page, instead of an unauthenticated checkout that billed the person who clicked

- [#256](https://github.com/omnidotdev/backfeed-app/pull/256) [`f87bdaf`](https://github.com/omnidotdev/backfeed-app/commit/f87bdafaaa2fd43bb945f915b217a2ce1e47b9de) Thanks [@coopbri](https://github.com/coopbri)! - The workspace menu now scrolls when you belong to many workspaces, so every workspace stays reachable.
