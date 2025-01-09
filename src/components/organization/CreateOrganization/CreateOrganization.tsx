"use client";

import {
  Button,
  Dialog,
  HStack,
  Input,
  Label,
  Stack,
  Text,
  sigil,
} from "@omnidev/sigil";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { FormFieldError } from "components/core";
import {
  useCreateOrganizationMutation,
  useCreateUserOrganizationMutation,
} from "generated/graphql";
import { app } from "lib/config";
import { standardSchemaValidator } from "lib/constants";
import { sdk } from "lib/graphql";
import { DialogType, useAuth, useDialogStore } from "lib/hooks";

/** Schema for defining the shape of the create organization form fields. */
const baseSchema = z.object({
  name: z
    .string()
    .min(3, app.dashboardPage.cta.newOrganization.organizationName.error),
  slug: z
    .string()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      app.dashboardPage.cta.newOrganization.organizationSlug.error.invalidFormat
    )
    .min(
      3,
      app.dashboardPage.cta.newOrganization.organizationSlug.error.minLength
    )
    .max(
      50,
      app.dashboardPage.cta.newOrganization.organizationSlug.error.maxLength
    ),
});

/** Schema for validation of the create organization form. */
const createOrganizationSchema = baseSchema.superRefine(
  async ({ slug }, ctx) => {
    if (!slug.length) return z.NEVER;

    const { organizationBySlug } = await sdk.Organization({
      slug,
    });

    if (organizationBySlug) {
      ctx.addIssue({
        code: "custom",
        message:
          app.dashboardPage.cta.newOrganization.organizationSlug.error
            .duplicate,
        path: ["slug"],
      });
    }
  }
);

/**
 * Dialog for creating a new organization.
 */
const CreateOrganization = () => {
  const router = useRouter();

  const { user } = useAuth();

  const { isOpen, setIsOpen } = useDialogStore({
    type: DialogType.CreateOrganization,
  });

  const { data, mutateAsync: createOrganization } =
    useCreateOrganizationMutation();

  const { mutateAsync: addUserToOrganization } =
    useCreateUserOrganizationMutation({
      onSuccess: () => {
        router.push(
          `/${app.organizationsPage.breadcrumb.toLowerCase()}/${data?.createOrganization?.organization?.slug}`
        );

        setIsOpen(false);
      },
    });

  const { handleSubmit, Field, Subscribe, reset } = useForm({
    defaultValues: {
      name: "",
      slug: "",
    },
    asyncDebounceMs: 300,
    validatorAdapter: standardSchemaValidator,
    validators: {
      onMount: baseSchema,
      onChangeAsync: createOrganizationSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { createOrganization: createOrganizationResponse } =
          await createOrganization({
            input: {
              organization: {
                name: value.name,
                slug: value.slug,
              },
            },
          });

        await addUserToOrganization({
          input: {
            userOrganization: {
              userId: user?.rowId!,
              organizationId: createOrganizationResponse?.organization?.rowId!,
            },
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Dialog
      title={app.dashboardPage.cta.newOrganization.label}
      description={app.dashboardPage.cta.newOrganization.description}
      open={isOpen}
      onOpenChange={({ open }) => {
        reset();
        setIsOpen(open);
      }}
    >
      <sigil.form
        display="flex"
        flexDirection="column"
        gap={4}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
        }}
      >
        <Field
          name="name"
          asyncDebounceMs={300}
          validators={{
            onBlurAsync: baseSchema.shape.name,
          }}
        >
          {({ handleChange, handleBlur, state }) => (
            <Stack position="relative" gap={1.5}>
              <Label
                htmlFor={
                  app.dashboardPage.cta.newOrganization.organizationName.id
                }
              >
                {app.dashboardPage.cta.newOrganization.organizationName.id}
              </Label>

              <Input
                id={app.dashboardPage.cta.newOrganization.organizationName.id}
                placeholder={
                  app.dashboardPage.cta.newOrganization.organizationName
                    .placeholder
                }
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
              />

              <FormFieldError
                error={state.meta.errorMap.onBlur}
                isDirty={state.meta.isDirty}
              />
            </Stack>
          )}
        </Field>

        <Field
          name="slug"
          asyncDebounceMs={300}
          // `onChangeAsync` validation is used here to keep in sync with the async form level validation of the slug field
          validators={{
            onChangeAsync: baseSchema.shape.slug,
          }}
        >
          {({ handleChange, state }) => (
            <Stack position="relative" gap={1.5}>
              <Label
                htmlFor={
                  app.dashboardPage.cta.newOrganization.organizationSlug.id
                }
              >
                {app.dashboardPage.cta.newOrganization.organizationSlug.id}
              </Label>

              <HStack>
                <Text
                  whiteSpace="nowrap"
                  fontSize="lg"
                >{`/${app.organizationsPage.breadcrumb.toLowerCase()}/`}</Text>

                <Input
                  id={app.dashboardPage.cta.newOrganization.organizationSlug.id}
                  placeholder={
                    app.dashboardPage.cta.newOrganization.organizationSlug
                      .placeholder
                  }
                  value={state.value}
                  onChange={(e) => handleChange(e.target.value)}
                />
              </HStack>

              <FormFieldError
                error={state.meta.errorMap.onChange}
                isDirty={state.meta.isDirty}
              />
            </Stack>
          )}
        </Field>

        <Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit} mt={4}>
              {isSubmitting
                ? app.dashboardPage.cta.newOrganization.action.pending
                : app.dashboardPage.cta.newOrganization.action.submit}
            </Button>
          )}
        </Subscribe>
      </sigil.form>
    </Dialog>
  );
};

export default CreateOrganization;
