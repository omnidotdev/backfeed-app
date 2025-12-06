import { Icon } from "@omnidev/sigil";
import { createFileRoute } from "@tanstack/react-router";
import { FaRegEdit } from "react-icons/fa";

import Page from "@/components/layout/Page";
import Account from "@/components/profile/Account";
import app from "@/lib/config/app.config";
import { AUTH_ISSUER } from "@/lib/config/env.config";

export const Route = createFileRoute("/_auth/profile/$userId/_layout/account")({
  component: UserAccountPage,
});

function UserAccountPage() {
  return (
    <Page
      header={{
        title: app.profileAccountPage.breadcrumb,
        description: app.profileAccountPage.description,
        cta: [
          {
            label: app.profileAccountPage.cta.updateProfile.label,
            icon: <Icon src={FaRegEdit} />,
            // TODO remove this split once `NEXT_PUBLIC_AUTH_ISSUER` set to base URL (https://linear.app/omnidev/issue/OMNI-254/move-apiauth-paths-to-base-path-or-subpath-eg-auth)
            linkOptions: {
              href: AUTH_ISSUER!.split("/api")[0],
            },
          },
        ],
      }}
      pt={0}
    >
      <Account />
    </Page>
  );
}
