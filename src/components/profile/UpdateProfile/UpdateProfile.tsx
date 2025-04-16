"use client";

import { Divider, sigil, Stack } from "@omnidev/sigil";
import { useParams } from "next/navigation";
import { z } from "zod";

import { SectionContainer } from "components/layout";
import { useUserQuery } from "generated/graphql";
import { app, isDevEnv } from "lib/config";
import { useAuth, useForm } from "lib/hooks";
import { DEBOUNCE_TIME } from "lib/constants";

const updateProfileDetails = app.profilePage.cta.updateProfile;

/** Schema for depeing the shape of the update proile form fields. */
// TODO: update schema after finalizing constraints.
// TODO: add messages/errors to congif file.
const baseSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(32, "Username must be at most 32 characters long")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  firstName: z
    .string()
    .min(1, "First name cannot be empty")
    .max(50, "First name must be at most 50 characters long"),
  lastName: z
    .string()
    .min(1, "Last name cannot be empty")
    .max(50, "Last name must be at most 50 characters long"),
  email: z.string().email("Must be a valid email address"),
});

/**
 * Form for updating profile details.
 */
const UpdateProfile = () => {
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

  const { handleSubmit, AppField, AppForm, SubmitForm, reset } = useForm({
    defaultValues: {
      username: userData?.username ?? "",
      firstName: userData?.firstName ?? "",
      lastName: userData?.lastName ?? "",
      email: userData?.email ?? "",
    },
    asyncDebounceMs: DEBOUNCE_TIME,
    validators: {
      onChange: baseSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const values = { value };
        return values;
      } catch (error) {
        if (isDevEnv) {
          console.error(error);
        }
      }
    },
  });

  // TODO: add all static text to config file.
  return (
    <SectionContainer title="Update Profile">
      <Divider />

      <sigil.form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await handleSubmit();
        }}
      >
        <Stack>
          <AppField name="username">
            {({ InputField }) => <InputField label="Username" />}
          </AppField>
          <AppField name="firstName">
            {({ InputField }) => <InputField label="First Name" />}
          </AppField>
          <AppField name="lastName">
            {({ InputField }) => <InputField label="Last Name" />}
          </AppField>
          <AppField name="email">
            {({ InputField }) => <InputField label="Email" />}
          </AppField>
        </Stack>

        <AppForm>
          <SubmitForm
            action={{
              submit: "Update Profile",
              pending: "Updating Profile...",
            }}
            mt={4}
          />
        </AppForm>
      </sigil.form>
    </SectionContainer>
  );
};

export default UpdateProfile;
