"use client";

import {
  Button,
  Divider,
  Input,
  Label,
  Stack,
  Link,
  Icon,
} from "@omnidev/sigil";
import { HiOutlineExternalLink } from "react-icons/hi";

import { SectionContainer } from "components/layout";
import { useUserQuery } from "generated/graphql";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

const updateProfileDetails = app.profilePage.cta.updateProfile;

// TODO: preftech userData from rsc.
// TODO: add all static text to config file.

/**
 * Form for updating profile details.
 */
const UpdateProfile = () => {
  const { user } = useAuth();

  const { data: userData } = useUserQuery(
    {
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

  return (
    <SectionContainer title="Update Profile">
      <Divider />

      <Stack gap={4}>
        {defaultUserData.map(({ label, value }) => (
          <Stack key={label} gap={1}>
            <Label>{label}</Label>
            <Input readOnly defaultValue={value} borderColor="border.subtle" />
          </Stack>
        ))}

        <Link
          href="https://identity.omni.dev/"
          isExternal
          textDecoration="none"
        >
          <Button>
            Update Profile
            <Icon src={HiOutlineExternalLink} />
          </Button>
        </Link>
      </Stack>
    </SectionContainer>
  );
};

export default UpdateProfile;
