"use client";

import { Divider, Stack, sigil } from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";

import { SectionContainer } from "components/layout";
import {
  useOrganizationQuery,
  useUpdateOrganizationMutation,
} from "generated/graphql";
import { app, isDevEnv } from "lib/config";
import {
  DEBOUNCE_TIME,
  organizationNameSchema,
  slugSchema,
} from "lib/constants";
import { getSdk } from "lib/graphql";
import { useForm, useOrganizationMembership } from "lib/hooks";
import { generateSlug, getAuthSession } from "lib/util";

import type { Session } from "next-auth";

const updateOrganizationDetails =
  app.organizationSettingsPage.cta.updateOrganization;

/** Schema for defining the shape of the update organization form fields, as well as validating the form. */
const updateOrganizationSchema = z
  .object({
    name: organizationNameSchema,
    currentSlug: slugSchema,
  })
  .superRefine(async ({ name, currentSlug }, ctx) => {
    const session = await getAuthSession();

    const updatedSlug = generateSlug(name);

    if (!updatedSlug?.length || updatedSlug === currentSlug || !session)
      return z.NEVER;

    const sdk = getSdk({ session });

    const { organizationBySlug } = await sdk.Organization({
      slug: updatedSlug,
    });

    if (organizationBySlug) {
      ctx.addIssue({
        code: "custom",
        message:
          updateOrganizationDetails.fields.organizationSlug.errors.duplicate,
        path: ["name"],
      });
    }
  });

interface Props {
  /** Authenticated user. */
  user: Session["user"];
}

/**
 * Form for updating organization details.
 */
const UpdateOrganization = ({ user }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { organizationSlug } = useParams<{ organizationSlug: string }>();

  const { data: organization } = useOrganizationQuery(
    {
      slug: organizationSlug,
    },
    {
      select: (data) => data.organizationBySlug,
    },
  );

  const { isAdmin } = useOrganizationMembership({
    userId: user.rowId,
    organizationId: organization?.rowId,
  });

  const { mutateAsync: updateOrganization } = useUpdateOrganizationMutation({
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: useOrganizationQuery.getKey({
          slug: data?.updateOrganization?.organization?.slug!,
        }),
      });

      router.replace(
        `/organizations/${data?.updateOrganization?.organization?.slug}/settings`,
      );

      reset();
    },
  });

  const { handleSubmit, AppField, AppForm, SubmitForm, reset } = useForm({
    defaultValues: {
      name: organization?.name ?? "",
      currentSlug: organization?.slug ?? "",
    },
    asyncDebounceMs: DEBOUNCE_TIME,
    validators: {
      onSubmitAsync: updateOrganizationSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await updateOrganization({
          rowId: organization?.rowId!,
          patch: {
            name: value.name,
            slug: generateSlug(value.name),
            updatedAt: new Date(),
          },
        });
      } catch (err) {
        if (isDevEnv) console.error(err);
      }
    },
  });

  return (
    <SectionContainer
      title={
        isAdmin
          ? updateOrganizationDetails.title
          : updateOrganizationDetails.memberTitle
      }
    >
      <Divider />

      <sigil.form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await handleSubmit();
        }}
      >
        <Stack gap={4} maxW="lg">
          <AppField name="name">
            {({ InputField }) => (
              <InputField
                label={updateOrganizationDetails.fields.organizationName.label}
                disabled={!isAdmin}
              />
            )}
          </AppField>
        </Stack>

        <AppForm>
          <SubmitForm
            action={updateOrganizationDetails.action}
            disabled={!isAdmin}
            mt={4}
          />
        </AppForm>
      </sigil.form>
    </SectionContainer>
  );
};

export default UpdateOrganization;
