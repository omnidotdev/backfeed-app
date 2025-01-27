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
import { useHotkeys } from "react-hotkeys-hook";
import { z } from "zod";

import { FormFieldError } from "components/core";
import {
  Role,
  useCreateOrganizationMutation,
  useCreateUserOrganizationMutation,
} from "generated/graphql";
import { app, isDevEnv } from "lib/config";
import { standardSchemaValidator } from "lib/constants";
import { getSdk } from "lib/graphql";
import { useAuth } from "lib/hooks";
import { useDialogStore } from "lib/hooks/store";
import { DialogType } from "store";

// TODO adjust schemas in this file after closure on https://linear.app/omnidev/issue/OMNI-166/strategize-runtime-and-server-side-validation-approach and https://linear.app/omnidev/issue/OMNI-167/refine-validation-schemas

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

    const sdk = await getSdk();

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

  const { isOpen: isCreateProjectDialogOpen } = useDialogStore({
    type: DialogType.CreateProject,
  });

  const { isOpen, setIsOpen } = useDialogStore({
    type: DialogType.CreateOrganization,
  });

  useHotkeys(
    "mod+o",
    () => setIsOpen(!isOpen),
    {
      enabled: !!user && !isCreateProjectDialogOpen,
      enableOnFormTags: true,
      preventDefault: true,
    },
    [user, isOpen, isCreateProjectDialogOpen]
  );

  const { data, mutateAsync: createOrganization } =
    useCreateOrganizationMutation();

  const { mutateAsync: addUserToOrganization } =
    useCreateUserOrganizationMutation({
      onSuccess: () => {
        router.push(
          `/${app.organizationsPage.breadcrumb.toLowerCase()}/${data?.createOrganization?.organization?.slug}`
        );

        setIsOpen(false);
        reset();
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
      onChange: baseSchema,
      onSubmitAsync: createOrganizationSchema,
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
              role: Role.Owner,
            },
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
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await handleSubmit();
        }}
      >
        <Field name="name">
          {({ handleChange, state }) => (
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
                error={state.meta.errorMap.onSubmit}
                isDirty={state.meta.isDirty}
              />
            </Stack>
          )}
        </Field>

        <Subscribe
          selector={(state) => [
            state.canSubmit,
            state.isSubmitting,
            state.isDirty,
          ]}
        >
          {([canSubmit, isSubmitting, isDirty]) => (
            <Button
              type="submit"
              disabled={!canSubmit || !isDirty || isSubmitting}
              mt={4}
            >
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
