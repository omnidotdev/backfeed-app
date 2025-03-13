"use client";

import { Dialog, sigil } from "@omnidev/sigil";
import { useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";
import { z } from "zod";

import { app } from "lib/config";
import { DEBOUNCE_TIME } from "lib/constants";
import { getSdk } from "lib/graphql";
import { useAuth, useForm } from "lib/hooks";
import { useCreateOrganizationMutation } from "lib/hooks/mutations";
import { useDialogStore } from "lib/hooks/store";
import { DialogType } from "store";
import { toaster } from "lib/util";

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
    () => {
      setIsOpen(!isOpen);
      reset();
    },
    {
      enabled: !!user && !isCreateProjectDialogOpen,
      enableOnFormTags: true,
      preventDefault: true,
    },
    [user, isOpen, isCreateProjectDialogOpen]
  );

  const { mutateAsync: createOrganization, isPending } =
    useCreateOrganizationMutation({
      onSuccess: (data) => {
        router.push(
          `/${app.organizationsPage.breadcrumb.toLowerCase()}/${data?.organization?.slug}`
        );

        setIsOpen(false);
        reset();
      },
    });

  const { handleSubmit, AppField, AppForm, SubmitForm, reset } = useForm({
    defaultValues: {
      name: "",
      slug: "",
    },
    asyncDebounceMs: DEBOUNCE_TIME,
    validators: {
      onChange: baseSchema,
      onSubmitAsync: createOrganizationSchema,
    },
    onSubmit: async ({ value }) =>
      toaster.promise(
        createOrganization({
          input: {
            organization: {
              name: value.name,
              slug: value.slug,
            },
          },
        }),
        {
          loading: {
            title: app.dashboardPage.cta.newOrganization.action.pending,
          },
          success: {
            title: app.dashboardPage.cta.newOrganization.action.success.title,
            description:
              app.dashboardPage.cta.newOrganization.action.success.description,
          },
          error: {
            title: app.dashboardPage.cta.newOrganization.action.error.title,
            description:
              app.dashboardPage.cta.newOrganization.action.error.description,
          },
        }
      ),
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
        <AppField name="name">
          {({ InputField }) => (
            <InputField
              label={app.dashboardPage.cta.newOrganization.organizationName.id}
              placeholder={
                app.dashboardPage.cta.newOrganization.organizationName
                  .placeholder
              }
            />
          )}
        </AppField>

        <AppField name="slug">
          {({ InputField }) => (
            <InputField
              label={app.dashboardPage.cta.newOrganization.organizationSlug.id}
              placeholder={
                app.dashboardPage.cta.newOrganization.organizationSlug
                  .placeholder
              }
            />
          )}
        </AppField>

        <AppForm>
          <SubmitForm
            action={app.dashboardPage.cta.newOrganization.action}
            isPending={isPending}
          />
        </AppForm>
      </sigil.form>
    </Dialog>
  );
};

export default CreateOrganization;
