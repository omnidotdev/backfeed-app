"use client";

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
  createListCollection,
  sigil,
} from "@omnidev/sigil";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { FormFieldError } from "components/core";
import {
  useCreateProjectMutation,
  useOrganizationsQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { sdk } from "lib/graphql";
import { useAuth } from "lib/hooks";

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
    .min(3, app.dashboardPage.cta.newProject.projectSlug.error.invalid),
});

/** Schema for validation of the create project form. */
const createProjectSchema = baseSchema.superRefine(
  async ({ organizationId, slug }, ctx) => {
    if (!organizationId.length || !slug.length) return z.NEVER;

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
  /** State to determine if the dialog is open. */
  isOpen: boolean;
  /** Callback to manage the open state of the dialog. */
  setIsOpen: (isOpen: boolean) => void;
}

/**
 * Dialog for creating a new project.
 */
const CreateProject = ({ isOpen, setIsOpen }: Props) => {
  const router = useRouter();

  const { user } = useAuth();

  const { data: organizations } = useOrganizationsQuery(
    {
      userId: user?.rowId!,
    },
    {
      enabled: !!user,
      select: (data) =>
        data?.organizations?.nodes?.map((organization) => ({
          label: organization?.name,
          value: organization?.rowId,
        })),
    }
  );

  const { mutate: createProject } = useCreateProjectMutation({
    onSuccess: (data) => {
      router.push(
        `/${app.organizationsPage.breadcrumb.toLowerCase()}/${data?.createProject?.project?.organization?.slug}/${app.projectsPage.breadcrumb.toLowerCase()}/${data.createProject?.project?.slug}`
      );

      setIsOpen(false);
    },
  });

  const { handleSubmit, Field, Subscribe, reset } = useForm({
    defaultValues: {
      organizationId: "",
      name: "",
      description: "",
      slug: "",
    },
    asyncDebounceMs: 300,
    validators: {
      onMount: baseSchema,
      onChangeAsync: createProjectSchema,
    },
    onSubmit: ({ value }) =>
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
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
        }}
      >
        <Field
          name="organizationId"
          validators={{
            onBlur: baseSchema.shape.organizationId,
          }}
        >
          {({ handleChange, handleBlur, state }) => (
            <Stack position="relative">
              <Select
                label={
                  app.dashboardPage.cta.newProject.selectOrganization.label
                }
                collection={createListCollection({
                  items: organizations ?? [],
                })}
                displayGroupLabel={false}
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
          name="name"
          asyncDebounceMs={300}
          validators={{
            onBlurAsync: baseSchema.shape.name,
          }}
        >
          {({ handleChange, handleBlur, state }) => (
            <Stack position="relative" gap={1.5}>
              <Label htmlFor={app.dashboardPage.cta.newProject.projectName.id}>
                {app.dashboardPage.cta.newProject.projectName.id}
              </Label>

              <Input
                id={app.dashboardPage.cta.newProject.projectName.id}
                placeholder={
                  app.dashboardPage.cta.newProject.projectName.placeholder
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
          name="description"
          asyncDebounceMs={300}
          validators={{
            onBlurAsync: baseSchema.shape.description,
          }}
        >
          {({ handleChange, handleBlur, state }) => (
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
          // onChange validation is used here to keep in sync with the async form level validation of the slug field
          validators={{
            onChangeAsync: baseSchema.shape.slug,
          }}
        >
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
