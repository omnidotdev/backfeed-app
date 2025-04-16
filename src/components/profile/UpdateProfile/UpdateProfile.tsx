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

const accountInformation = app.profilePage.accountInformation;

// TODO: preftech userData from rsc.
// TODO: maybe rename this component

/**
 * Users account information.
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

  const profileData = [
    {
      label: accountInformation.fields.username,
      value: userData?.username ?? "",
    },
    {
      label: accountInformation.fields.firstName,
      value: userData?.firstName ?? "",
    },
    {
      label: accountInformation.fields.lastName,
      value: userData?.lastName ?? "",
    },
    {
      label: accountInformation.fields.email,
      value: userData?.email ?? "",
    },
  ];

  return (
    <SectionContainer
      title={accountInformation.title}
      description={accountInformation.description}
    >
      <Divider />

      <Stack gap={4}>
        {profileData.map(({ label, value }) => (
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
            {accountInformation.cta.updateProfile}
            <Icon src={HiOutlineExternalLink} />
          </Button>
        </Link>
      </Stack>
    </SectionContainer>
  );
};

export default UpdateProfile;
