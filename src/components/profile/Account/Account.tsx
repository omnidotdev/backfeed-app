"use client";

import { Button, Flex, Input, Label, Stack } from "@omnidev/sigil";
import { app } from "lib/config";
import { useMemo, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import type { InputProps } from "@omnidev/sigil";
import type { UserFragment } from "generated/graphql";

interface Props {
  /** User account information. */
  user: UserFragment;
}

/**
 * Details of the user's account information.
 */
const Account = ({ user }: Props) => {
  const [showEmail, setShowEmail] = useState(false);

  const profileData = useMemo<InputProps[]>(
    () => [
      {
        id: app.profileAccountPage.fields.username.label,
        value: user?.username ?? "",
      },
      {
        id: app.profileAccountPage.fields.firstName.label,
        value: user?.firstName ?? "",
      },
      {
        id: app.profileAccountPage.fields.lastName.label,
        value: user?.lastName ?? "",
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
    <Stack gap={8} h="full" justifyContent="space-between">
      <Stack gap={4}>
        {profileData.map(({ id, value, type }) => {
          const isEmail = id === app.profileAccountPage.fields.email.label;

          return (
            <Stack key={id} gap={1}>
              <Label htmlFor={id}>{id}</Label>

              <Flex position="relative" gap={4}>
                <Input
                  disabled
                  id={id}
                  type={showEmail && isEmail ? "text" : type}
                  value={value}
                  opacity={1}
                  borderColor="border.subtle"
                  color="foreground.subtle"
                />

                {isEmail && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    pos="absolute"
                    right={0.5}
                    bottom={0.5}
                    w="fit"
                    _hover={{ opacity: "40%", bgColor: "transparent" }}
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
              </Flex>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Account;
