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

interface Data extends InputProps {
  /** Label for the field. */
  label: string;
}

/**
 * Details of the user's account information.
 */
const Account = ({ user }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const profileData = useMemo<Data[]>(
    () => [
      {
        label: app.profileAccountPage.fields.username.label,
        value: user?.username ?? "",
      },
      {
        label: app.profileAccountPage.fields.firstName.label,
        value: user?.firstName ?? "",
      },
      {
        label: app.profileAccountPage.fields.lastName.label,
        value: user?.lastName ?? "",
      },
      {
        label: app.profileAccountPage.fields.email.label,
        value: user?.email,
        type: "password",
      },
      {
        label: app.profileAccountPage.fields.password.label,
        value: app.profileAccountPage.fields.password.value,
        type: "password",
      },
    ],
    [user]
  );

  return (
    <Stack gap={8} h="full" justifyContent="space-between">
      <Stack gap={4}>
        {profileData.map(({ label, value, type }) => (
          <Stack key={label} gap={1}>
            <Label htmlFor={label}>{label}</Label>

            <Flex position="relative" gap={4}>
              <Input
                disabled
                readOnly
                id={label}
                type={
                  showPassword &&
                  label === app.profileAccountPage.fields.email.label
                    ? "text"
                    : type
                }
                value={value}
                opacity={1}
                borderColor="border.subtle"
                bgColor="background.subtle"
                color="foreground.subtle"
              />

              {label === app.profileAccountPage.fields.email.label && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  pos="absolute"
                  right={0.5}
                  bottom={0.5}
                  w="fit"
                  _hover={{ opacity: "40%", bgColor: "transparent" }}
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <IoEyeOutline aria-hidden="true" />
                  ) : (
                    <IoEyeOffOutline aria-hidden="true" />
                  )}
                </Button>
              )}

              {label === "Password" && (
                <Link
                  isExternal
                  href={app.forgotPasswordUrl}
                  textDecoration="none"
                >
                  <Button>Change Password</Button>
                </Link>
              )}
            </Flex>
          </Stack>
        ))}
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
