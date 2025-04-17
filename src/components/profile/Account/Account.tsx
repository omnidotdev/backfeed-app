"use client";

import {
  Button,
  Flex,
  Input,
  Label,
  Link,
  Stack,
  Text,
  sigil,
} from "@omnidev/sigil";
import { useMemo, useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import { SectionContainer } from "components/layout";
import { app } from "lib/config";

import type { UserFragment } from "generated/graphql";
import type { InputProps } from "@omnidev/sigil";

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
      {
        id: app.profileAccountPage.fields.password.label,
        value: app.profileAccountPage.fields.password.value,
        type: "password",
      },
    ],
    [user]
  );

  return (
    <Stack gap={8} h="full" justifyContent="space-between">
      <Stack gap={4}>
        {profileData.map(({ id, value, type }) => {
          const isEmail = id === app.profileAccountPage.fields.email.label;
          const isPassword =
            id === app.profileAccountPage.fields.password.label;

          return (
            <Stack key={id} gap={1}>
              <Label htmlFor={id}>{id}</Label>

              <Flex position="relative" gap={4}>
                <Input
                  disabled
                  readOnly
                  id={id}
                  type={showEmail && isEmail ? "text" : type}
                  value={value}
                  opacity={1}
                  borderColor="border.subtle"
                  bgColor="background.subtle"
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

                {isPassword && (
                  <Link
                    isExternal
                    href={app.forgotPasswordUrl}
                    textDecoration="none"
                  >
                    <Button>
                      {app.profileAccountPage.cta.changePassword.label}
                    </Button>
                  </Link>
                )}
              </Flex>
            </Stack>
          );
        })}
      </Stack>

      <SectionContainer
        title={app.profileAccountPage.cta.deleteAccount.title}
        outline="1px solid"
        outlineColor="omni.ruby"
      >
        <Text
          color="foreground.subtle"
          fontSize={{ base: "xs", lg: "sm" }}
          mt={-3}
        >
          {app.profileAccountPage.cta.deleteAccount.description}{" "}
          <sigil.span color="foreground.default">{app.supportEmail}</sigil.span>
          .
        </Text>
      </SectionContainer>
    </Stack>
  );
};

export default Account;
