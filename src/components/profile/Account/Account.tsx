"use client";

import { Input, Label, Stack } from "@omnidev/sigil";

import { app } from "lib/config";

import type { User } from "generated/graphql";

interface Props {
  /** User's username. */
  username: User["username"];
  /** User's first name. */
  firstName: User["firstName"];
  /** User's last name. */
  lastName: User["lastName"];
  /** User's email. */
  email?: User["email"];
}

/**
 * Details of the user's account information.
 */
const Account = ({ username, firstName, lastName, email }: Props) => {
  const profileData = [
    {
      label: app.profileAccountPage.fields.username,
      value: username,
    },
    {
      label: app.profileAccountPage.fields.firstName,
      value: firstName,
    },
    {
      label: app.profileAccountPage.fields.lastName,
      value: lastName,
    },
    {
      label: app.profileAccountPage.fields.email,
      value: email,
    },
  ];

  return (
    <Stack gap={4}>
      {profileData.map(({ label, value }) => (
        <Stack key={label} gap={1}>
          <Label>{label}</Label>
          <Input
            disabled
            readOnly
            defaultValue={value ?? ""}
            borderColor="border.subtle"
            opacity={1}
          />
        </Stack>
      ))}
    </Stack>
  );
};

export default Account;
