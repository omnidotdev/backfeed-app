"use client";

import {
  Button,
  Divider,
  Icon,
  Input,
  Label,
  Stack,
  sigil,
} from "@omnidev/sigil";
import { useForm, useStore } from "@tanstack/react-form";
import { useParams, useRouter } from "next/navigation";
import { LuSave } from "react-icons/lu";
import { z } from "zod";

import { FormFieldError } from "components/core";
import { SectionContainer } from "components/layout";
import {
  useOrganizationQuery,
  useUpdateOrganizationMutation,
} from "generated/graphql";
import { app, isDevEnv } from "lib/config";
import { standardSchemaValidator } from "lib/constants";
import { getSdk } from "lib/graphql";
import { useAuth, useOrganizationMembership } from "lib/hooks";

const updateOrganizationDetails =
  app.organizationSettingsPage.cta.updateOrganization;

/** Schema for defining the shape of the update organization form fields. */
const baseSchema = z.object({
  name: z
    .string()
    .min(3, updateOrganizationDetails.fields.organizationName.errors.minLength),
  slug: z
    .string()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      updateOrganizationDetails.fields.organizationSlug.errors.invalidFormat
    )
    .min(3, updateOrganizationDetails.fields.organizationSlug.errors.minLength)
    .max(
      50,
      updateOrganizationDetails.fields.organizationSlug.errors.maxLength
    ),
});

/** Schema for validation of the update organization form. */
const updateOrganizationSchema = baseSchema.superRefine(
  async ({ slug }, ctx) => {
    if (!slug?.length) return z.NEVER;

    const sdk = await getSdk();

    const { organizationBySlug } = await sdk.Organization({ slug });

    if (organizationBySlug) {
      ctx.addIssue({
        code: "custom",
        message:
          updateOrganizationDetails.fields.organizationSlug.errors.duplicate,
        path: ["slug"],
      });
    }
  }
);

/**
 * Form for updating organization details.
 */
const UpdateOrganization = () => {
  const { organizationSlug } = useParams<{ organizationSlug: string }>();
  const router = useRouter();

  const { user } = useAuth();

  const { data: organization } = useOrganizationQuery(
    {
      slug: organizationSlug,
    },
    {
      select: (data) => data.organizationBySlug,
    }
  );

  const { isAdmin } = useOrganizationMembership({
    userId: user?.rowId,
    organizationId: organization?.rowId,
  });

  const { mutateAsync: updateOrganization } = useUpdateOrganizationMutation({
    onSuccess: (data) => {
      router.replace(
        `/organizations/${data?.updateOrganization?.organization?.slug}/settings`
      );
      reset();
    },
  });

  const { handleSubmit, Field, Subscribe, reset, store } = useForm({
    defaultValues: {
      name: organization?.name ?? "",
      slug: organization?.slug ?? "",
    },
    asyncDebounceMs: 300,
    validatorAdapter: standardSchemaValidator,
    validators: {
      onMount: baseSchema,
      onSubmitAsync: updateOrganizationSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await updateOrganization({
          rowId: organization?.rowId!,
          patch: {
            name: value.name,
            slug: value.slug,
            updatedAt: new Date(),
          },
        });
      } catch (error) {
        if (isDevEnv) {
          console.error(error);
        }
      }
    },
  });

  const isDefaultForm = useStore(store, ({ values }) =>
    Object.entries(values).every(
      // @ts-ignore this works as long as the key of the form does in fact match the key on the organization object. If that changes, this will break.
      ([key, value]) => value === organization?.[key]
    )
  );

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
          <Field name="name">
            {({ handleChange, state }) => (
              <Stack position="relative" gap={1.5}>
                <Label htmlFor="name" fontWeight="semibold">
                  {updateOrganizationDetails.fields.organizationName.label}
                </Label>

                <Input
                  id="name"
                  value={state.value}
                  onChange={(e) => handleChange(e.target.value)}
                  disabled={!isAdmin}
                />

                <FormFieldError
                  error={state.meta.errorMap.onSubmit}
                  isDirty={state.meta.isDirty}
                />
              </Stack>
            )}
          </Field>

          <Field name="slug">
            {({ handleChange, state }) => (
              <Stack position="relative" gap={1.5}>
                <Label htmlFor="slug" fontWeight="semibold">
                  {updateOrganizationDetails.fields.organizationSlug.label}
                </Label>

                <Input
                  id="slug"
                  value={state.value}
                  onChange={(e) => handleChange(e.target.value)}
                  disabled={!isAdmin}
                />

                <FormFieldError
                  error={state.meta.errorMap.onSubmit}
                  isDirty={state.meta.isDirty}
                />
              </Stack>
            )}
          </Field>
        </Stack>

        <Subscribe
          selector={(state) => ({
            canSubmit: state.canSubmit,
            isSubmitting: state.isSubmitting,
            isDirty: state.isDirty,
          })}
        >
          {({ canSubmit, isSubmitting, isDirty }) => (
            <Button
              type="submit"
              width={48}
              disabled={
                isDefaultForm ||
                isSubmitting ||
                !canSubmit ||
                !isDirty ||
                !isAdmin
              }
              mt={4}
            >
              {!isSubmitting && <Icon src={LuSave} h={4} w={4} />}

              {isSubmitting
                ? updateOrganizationDetails.statuses.pending
                : updateOrganizationDetails.actions.submit}
            </Button>
          )}
        </Subscribe>
      </sigil.form>
    </SectionContainer>
  );
};

export default UpdateOrganization;
