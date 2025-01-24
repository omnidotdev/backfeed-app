"use client";

import {
  Button,
  Divider,
  Icon,
  Input,
  Label,
  sigil,
  Stack,
} from "@omnidev/sigil";
import { LuSave } from "react-icons/lu";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";

import { FormFieldError } from "components/core";
import { SectionContainer } from "components/layout";
import {
  useOrganizationQuery,
  useUpdateOrganizationMutation,
} from "generated/graphql";
import { app, isDevEnv } from "lib/config";
import { standardSchemaValidator } from "lib/constants";
import { sdk } from "lib/graphql";

const updateOrganizationDetails =
  app.organizationSettingsPage.cta.updateOrganization;

const emptyStringAsUndefined = z.literal("").transform(() => undefined);

/** Schema for defining the shape of the update organization form fields. */
const baseSchema = z.object({
  name: z
    .string()
    .min(3, updateOrganizationDetails.fields.organizationName.errors.minLength)
    .or(emptyStringAsUndefined)
    .optional(),
  slug: z
    .string()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      updateOrganizationDetails.fields.organizationSlug.errors.invalidFormat
    )
    .min(3, updateOrganizationDetails.fields.organizationSlug.errors.minLength)
    .max(50, updateOrganizationDetails.fields.organizationSlug.errors.maxLength)
    .or(emptyStringAsUndefined)
    .optional(),
});

/** Schema for validation of the update organization form. */
const updateOrganizationSchema = baseSchema.superRefine(
  async ({ slug }, ctx) => {
    if (!slug?.length) return z.NEVER;

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

  // NB: used to mock ownership
  const isOrganizationOwner = true;

  const { data: organization } = useOrganizationQuery(
    {
      slug: organizationSlug,
    },
    {
      select: (data) => data.organizationBySlug,
    }
  );

  const { mutateAsync: updateOrganization } = useUpdateOrganizationMutation({
    onSuccess: (data) => {
      router.replace(
        `/organizations/${data?.updateOrganization?.organization?.slug}/settings`
      );
      reset();
    },
  });

  const { handleSubmit, Field, Subscribe, reset } = useForm({
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

  return (
    <SectionContainer title={updateOrganizationDetails.title}>
      <Divider />

      <sigil.form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await handleSubmit();
          reset();
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
                  disabled={!isOrganizationOwner}
                />

                <FormFieldError
                  error={state.meta.errorMap.onChange}
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
                  disabled={!isOrganizationOwner}
                />

                <FormFieldError
                  error={state.meta.errorMap.onChange}
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
            // TODO: look into managing default state through `useStore` or better yet zod schema.
            isChanged:
              state.values.name !== organization?.name ||
              state.values.slug !== organization?.slug,
          })}
        >
          {({ canSubmit, isSubmitting, isDirty, isChanged }) => (
            <Button
              type="submit"
              width={48}
              disabled={
                isSubmitting ||
                !canSubmit ||
                !isDirty ||
                !isChanged ||
                !isOrganizationOwner
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
