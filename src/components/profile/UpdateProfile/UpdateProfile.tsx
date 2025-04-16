"use client";

import { Button, Divider, Input, Label, Link, Stack } from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { SectionContainer } from "components/layout";
import { useUserQuery } from "generated/graphql";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

const updateProfileDetails = app.profilePage.cta.updateProfile;

// TODO: preftech userData from rsc.

/**
 * Form for updating profile details.
 */
const UpdateProfile = () => {
  const queryClient = useQueryClient();

  const { userId } = useParams<{ userId: string }>();

  const { user } = useAuth();

  const { data: userData } = useUserQuery(
    {
      // TODO: determine whether params of auth hooks should be used for query variable.
      hidraId: user?.hidraId!,
    },
    {
      select: (data) => data.userByHidraId,
    }
  );

  const defaultUserData = [
    {
      label: "Username",
      value: userData?.username ?? "",
    },
    {
      label: "First Name",
      value: userData?.firstName ?? "",
    },
    {
      label: "Last Name",
      value: userData?.lastName ?? "",
    },
    {
      label: "Email",
      value: userData?.email ?? "",
    },
  ];

  // TODO: add all static text to config file.
  return (
    <SectionContainer title="Update Profile">
      <Divider />

      <Stack>
        {defaultUserData.map(({ label, value }) => (
          <Stack key={label} gap={1}>
            <Label>{label}</Label>
            <Input readOnly defaultValue={value} borderColor="border.subtle" />
          </Stack>
        ))}

        <Link href="https://identity.omni.dev/">
          <Button>Update Profile</Button>
        </Link>
      </Stack>
    </SectionContainer>
  );
};

export default UpdateProfile;
