import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";

import Page from "@/components/layout/Page";
import NotificationSettings from "@/components/profile/NotificationSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import app from "@/lib/config/app.config";
import { AUTH_BASE_URL, CONSOLE_URL } from "@/lib/config/env.config";
import createMetaTags from "@/lib/util/createMetaTags";

interface ProfileField {
  /** Field label and input id. */
  id: string;
  /** Field value. */
  value?: string;
  /** Input type. */
  type?: string;
}

export const Route = createFileRoute("/_app/profile/$userId/_layout/account")({
  head: () => ({ meta: createMetaTags({ title: "Account" }) }),
  component: UserAccountPage,
});

function UserAccountPage() {
  const { user } = Route.useRouteContext();
  const { userId } = Route.useParams();

  const [showEmail, setShowEmail] = useState(false);

  const profileData = useMemo<ProfileField[]>(
    () => [
      {
        id: app.profileAccountPage.fields.username.label,
        value: user?.username ?? "",
      },
      {
        id: app.profileAccountPage.fields.name.label,
        value: user?.name ?? "",
      },
      {
        id: app.profileAccountPage.fields.email.label,
        value: user?.email,
        type: "password",
      },
    ],
    [user],
  );

  return (
    <Page
      header={{
        breadcrumbs: [
          {
            label: user?.username ?? user?.name ?? "Profile",
            to: "/profile/$userId/account",
            params: { userId },
          },
          { label: app.profileAccountPage.breadcrumb },
        ],
        title: app.profileAccountPage.breadcrumb,
        description: app.profileAccountPage.description,
        cta: [
          {
            label: app.profileAccountPage.cta.updateProfile.label,
            icon: <LuPencil />,
            linkOptions: {
              // Account/profile management lives in the account console
              href: CONSOLE_URL ? `${CONSOLE_URL}/profile` : AUTH_BASE_URL!,
            },
          },
        ],
      }}
      className="pt-0"
    >
      <div className="flex h-full flex-col justify-between gap-8">
        <div className="flex flex-col gap-4">
          {profileData.map(({ id, value, type }) => {
            const isEmail = id === app.profileAccountPage.fields.email.label;

            return (
              <div key={id} className="flex flex-col gap-1">
                <Label htmlFor={id}>{id}</Label>

                <div className="relative flex gap-4">
                  <Input
                    disabled
                    id={id}
                    type={showEmail && isEmail ? "text" : type}
                    value={value}
                    className="border-border-subtle text-foreground-subtle opacity-100"
                  />

                  {isEmail && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0.5 bottom-0.5 w-fit hover:bg-transparent hover:opacity-40"
                      onClick={() => setShowEmail((prev) => !prev)}
                      aria-label={
                        showEmail
                          ? app.profileAccountPage.fields.email.ariaLabel.hide
                          : app.profileAccountPage.fields.email.ariaLabel.show
                      }
                    >
                      {showEmail ? (
                        <IoEyeOutline aria-hidden="true" />
                      ) : (
                        <IoEyeOffOutline aria-hidden="true" />
                      )}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <NotificationSettings />
      </div>
    </Page>
  );
}
