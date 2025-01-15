"use client";

import { Button, Flex, Icon, Input, Label, sigil, Stack } from "@omnidev/sigil";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { FormFieldError } from "components/core";
import {
  useOrganizationQuery,
  useUpdateOrganizationMutation,
} from "generated/graphql";
import { app } from "lib/config";
import { standardSchemaValidator } from "lib/constants";

/** Schema for defining the shape of the update organization form fields. */
const baseSchema = z.object({
  name: z
    .string()
    .min(
      3,
      app.organizationSettingsPage.cta.updateOrganization.organizationName.error
    ),
  slug: z
    .string()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      app.organizationSettingsPage.cta.updateOrganization.organizationSlug.error
        .invalidFormat
    )
    .min(
      3,
      app.organizationSettingsPage.cta.updateOrganization.organizationSlug.error
        .minLength
    )
    .max(
      50,
      app.organizationSettingsPage.cta.updateOrganization.organizationSlug.error
        .maxLength
    ),
});

interface Props {
  /** Organization slug. */
  organizationSlug: string;
}

/** Organization settings. */
const OrganizationSettings = ({ organizationSlug }: Props) => {
  const [readOnly, setReadOnly] = useState(true);
  const router = useRouter();

  const { data: organization } = useOrganizationQuery(
    {
      slug: organizationSlug,
    },
    {
      select: (data) => data.organizationBySlug,
    }
  );

  const { mutateAsync: updateOrganization } = useUpdateOrganizationMutation({
    onSuccess: (data) =>
      router.replace(
        `/organizations/${data.updateOrganization?.organization?.slug}/settings`
      ),
  });

  const inputStyles = {
    minWidth: "lg",
    border: readOnly ? "transparent" : "brand.primary",
    _focus: {
      borderColor: readOnly ? "none" : "brand.primary",
      boxShadow: readOnly ? "none" : "0 0 0 1px var(--colors-brand-primary)",
    },
  };

  const { handleSubmit, Field, Subscribe, reset } = useForm({
    defaultValues: {
      name: organization?.name ?? "",
      slug: organization?.slug ?? "",
    },
    asyncDebounceMs: 300,
    validatorAdapter: standardSchemaValidator,
    validators: {
      onMount: baseSchema,
      onChangeAsync: baseSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await updateOrganization({
          rowId: organization?.rowId!,
          patch: {
            name: value.name,
            slug: value.slug,
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
  });

  // TODO: add loading state
  if (!organization) return null;

  return (
    // TODO: Maybe use SectionContainer component here
    <Flex
      bgColor="background.default"
      borderRadius="lg"
      boxShadow="lg"
      p={{ base: 4, sm: 6 }}
      gap={6}
    >
      <sigil.form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await handleSubmit();
          reset();
        }}
        w="full"
      >
        <Flex justifyContent="space-between">
          <Stack gap={2}>
            <Field name="name" asyncDebounceMs={300}>
              {({ handleChange, handleBlur, state }) => (
                <Stack position="relative" gap={1.5}>
                  <Label htmlFor="name">
                    {
                      app.organizationSettingsPage.cta.updateOrganization
                        .organizationName.label
                    }
                  </Label>

                  <Input
                    value={state.value}
                    readOnly={readOnly}
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                    {...inputStyles}
                  />

                  <FormFieldError
                    error={state.meta.errorMap.onBlur}
                    isDirty={state.meta.isDirty}
                  />
                </Stack>
              )}
            </Field>

            <Field name="slug" asyncDebounceMs={300}>
              {({ handleChange, handleBlur, state }) => (
                <Stack position="relative" gap={1.5}>
                  <Label htmlFor="slug">
                    {
                      app.organizationSettingsPage.cta.updateOrganization
                        .organizationSlug.label
                    }
                  </Label>

                  <Input
                    value={state.value}
                    readOnly={readOnly}
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                    {...inputStyles}
                  />

                  <FormFieldError
                    error={state.meta.errorMap.onBlur}
                    isDirty={state.meta.isDirty}
                  />
                </Stack>
              )}
            </Field>
          </Stack>

          {readOnly && (
            <Button onClick={() => setReadOnly(false)} gap={2}>
              <Icon src={FaRegEdit} />

              {app.organizationSettingsPage.cta.updateOrganization.action.edit}
            </Button>
          )}
        </Flex>

        <Subscribe
          selector={(state) => [
            state.canSubmit,
            state.isSubmitting,
            state.isDirty,
          ]}
        >
          {([canSubmit, isSubmitting, isDirty]) => (
            <Button type="submit" disabled={!canSubmit || !isDirty} mt={4}>
              {isSubmitting
                ? app.organizationSettingsPage.cta.updateOrganization.action
                    .pending
                : app.organizationSettingsPage.cta.updateOrganization.action
                    .submit}
            </Button>
          )}
        </Subscribe>
      </sigil.form>
    </Flex>
  );
};

export default OrganizationSettings;
