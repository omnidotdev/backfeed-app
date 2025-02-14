"use client";

import { createListCollection } from "@ark-ui/react";
import {
  Button,
  Dialog,
  HStack,
  Input,
  Label,
  Select,
  Stack,
  Text,
  Textarea,
  sigil,
} from "@omnidev/sigil";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";
import { z } from "zod";

import { FormFieldError } from "components/core";
import {
  Role,
  useCreateProjectMutation,
  useOrganizationsQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { standardSchemaValidator, toaster } from "lib/constants";
import { getSdk } from "lib/graphql";
import { useAuth, useOrganizationMembership } from "lib/hooks";
import { useDialogStore } from "lib/hooks/store";
import { DialogType } from "store";

// TODO adjust schemas in this file after closure on https://linear.app/omnidev/issue/OMNI-166/strategize-runtime-and-server-side-validation-approach and https://linear.app/omnidev/issue/OMNI-167/refine-validation-schemas

/** Schema for defining the shape of the create project form fields. */
const baseSchema = z.object({
  organizationId: z
    .string()
    .uuid(app.dashboardPage.cta.newProject.selectOrganization.error),
  name: z.string().min(3, app.dashboardPage.cta.newProject.projectName.error),
  description: z
    .string()
    .min(10, app.dashboardPage.cta.newProject.projectDescription.error),
  slug: z
    .string()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      app.dashboardPage.cta.newProject.projectSlug.error.invalidFormat
    )
    .min(3, app.dashboardPage.cta.newProject.projectSlug.error.minLength)
    .max(50, app.dashboardPage.cta.newProject.projectSlug.error.maxLength),
});

/** Schema for validation of the create project form. */
const createProjectSchema = baseSchema.superRefine(
  async ({ organizationId, slug }, ctx) => {
    if (!organizationId.length || !slug.length) return z.NEVER;

    const sdk = await getSdk();

    const { projectBySlugAndOrganizationId } = await sdk.ProjectBySlug({
      organizationId,
      slug,
    });

    if (projectBySlugAndOrganizationId) {
      ctx.addIssue({
        code: "custom",
        message: app.dashboardPage.cta.newProject.projectSlug.error.duplicate,
        path: ["slug"],
      });
    }
  }
);

interface Props {
  /** Slug of the organization to create the project under. */
  organizationSlug?: string;
}

/**
 * Dialog for creating a new project.
 */
const CreateProject = ({ organizationSlug }: Props) => {
  const router = useRouter();

  const { user } = useAuth();

  const { isOpen: isCreateOrganizationDialogOpen } = useDialogStore({
    type: DialogType.CreateOrganization,
  });

  const { isOpen, setIsOpen } = useDialogStore({
    type: DialogType.CreateProject,
  });

  const { data: organizations } = useOrganizationsQuery(
    {
      userId: user?.rowId!,
      isMember: true,
      slug: organizationSlug,
      excludeRoles: [Role.Member],
    },
    {
      enabled: !!user?.rowId,
      select: (data) =>
        data?.organizations?.nodes?.map((organization) => ({
          label: organization?.name,
          value: organization?.rowId,
        })),
    }
  );

  const firstOrganization = organizations?.[0];

  const { isAdmin } = useOrganizationMembership({
    organizationId: firstOrganization?.value,
    userId: user?.rowId,
  });

  useHotkeys(
    "mod+p",
    () => {
      setIsOpen(!isOpen);
      reset();
    },
    {
      enabled:
        !!user &&
        !isCreateOrganizationDialogOpen &&
        // If the dialog is scoped to a specific organization, only allow the user to create projects in that organization if they are an admin
        (organizationSlug ? isAdmin : true),
      // enabled even if a form field is focused. For available options, see: https://github.com/JohannesKlauss/react-hotkeys-hook?tab=readme-ov-file#api
      enableOnFormTags: true,
      // prevent default browser behavior on keystroke. NOTE: certain keystrokes are not preventable.
      preventDefault: true,
    },
    [user, isOpen, isCreateOrganizationDialogOpen, organizationSlug, isAdmin]
  );

  const { mutateAsync: createProject, isPending } = useCreateProjectMutation({
    onSuccess: (data) => {
      router.push(
        `/${app.organizationsPage.breadcrumb.toLowerCase()}/${data?.createProject?.project?.organization?.slug}/${app.projectsPage.breadcrumb.toLowerCase()}/${data.createProject?.project?.slug}`
      );

      setIsOpen(false);
      reset();
    },
  });

  const { handleSubmit, Field, Subscribe, reset } = useForm({
    defaultValues: {
      organizationId: organizationSlug ? (firstOrganization?.value ?? "") : "",
      name: "",
      description: "",
      slug: "",
    },
    asyncDebounceMs: 300,
    validatorAdapter: standardSchemaValidator,
    validators: {
      onChange: baseSchema,
      onSubmitAsync: createProjectSchema,
    },
    onSubmit: async ({ value }) =>
      toaster.promise(
        createProject({
          input: {
            project: {
              name: value.name,
              description: value.description,
              slug: value.slug,
              organizationId: value.organizationId,
            },
          },
        }),
        {
          loading: {
            title: app.dashboardPage.cta.newProject.action.pending,
          },
          success: {
            title: app.dashboardPage.cta.newProject.action.success.title,
            description:
              app.dashboardPage.cta.newProject.action.success.description,
          },
          error: {
            title: app.dashboardPage.cta.newProject.action.error.title,
            description:
              app.dashboardPage.cta.newProject.action.error.description,
          },
        }
      ),
  });

  return (
    <Dialog
      title={app.dashboardPage.cta.newProject.label}
      description={app.dashboardPage.cta.newProject.description}
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
        <Field name="organizationId">
          {({ handleChange, state }) => (
            <Stack position="relative">
              <Select
                label={
                  app.dashboardPage.cta.newProject.selectOrganization.label
                }
                collection={createListCollection({
                  items: organizations ?? [],
                })}
                displayGroupLabel={false}
                clearTriggerProps={{
                  display: organizationSlug ? "none" : undefined,
                }}
                disabled={!!organizationSlug}
                valueTextProps={{
                  placeholder: "Select an organization",
                }}
                triggerProps={{
                  borderColor: "border.subtle",
                }}
                value={state.value?.length ? [state.value] : []}
                onValueChange={({ value }) =>
                  handleChange(value.length ? value[0] : "")
                }
              />

              <FormFieldError
                error={state.meta.errorMap.onSubmit}
                isDirty={state.meta.isDirty}
              />
            </Stack>
          )}
        </Field>

        <Field name="name">
          {({ handleChange, state, name }) => (
            <Stack position="relative" gap={1.5}>
              <Label htmlFor={name}>
                {app.dashboardPage.cta.newProject.projectName.id}
              </Label>

              <Input
                id={name}
                placeholder={
                  app.dashboardPage.cta.newProject.projectName.placeholder
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

        <Field name="description">
          {({ handleChange, state }) => (
            <Stack position="relative" gap={1.5}>
              <Label
                htmlFor={app.dashboardPage.cta.newProject.projectDescription.id}
              >
                {app.dashboardPage.cta.newProject.projectDescription.id}
              </Label>

              <Textarea
                id={app.dashboardPage.cta.newProject.projectDescription.id}
                placeholder={
                  app.dashboardPage.cta.newProject.projectDescription
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
              <Label htmlFor={app.dashboardPage.cta.newProject.projectSlug.id}>
                {app.dashboardPage.cta.newProject.projectSlug.id}
              </Label>

              <HStack>
                <Text
                  whiteSpace="nowrap"
                  fontSize="lg"
                >{`.../${app.projectsPage.breadcrumb.toLowerCase()}/`}</Text>

                <Input
                  id={app.dashboardPage.cta.newProject.projectSlug.id}
                  placeholder={
                    app.dashboardPage.cta.newProject.projectSlug.placeholder
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
              disabled={!canSubmit || !isDirty || isSubmitting || isPending}
              mt={4}
            >
              {isSubmitting || isPending
                ? app.dashboardPage.cta.newProject.action.pending
                : app.dashboardPage.cta.newProject.action.submit}
            </Button>
          )}
        </Subscribe>
      </sigil.form>
    </Dialog>
  );
};

export default CreateProject;
