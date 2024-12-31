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
import { z } from "zod";

import { FormFieldError } from "components/core";
import { useOrganizationsQuery } from "generated/graphql";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

/** Schema for validating new project forms.*/
const newProjectSchema = z.object({
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

interface Props {
  /** State to determine if the dialog is open. */
  isOpen: boolean;
  /** Callback to manage the open state of the dialog. */
  setIsOpen: (isOpen: boolean) => void;
}

/**
 * Dialog for creating a new project.
 */
const NewProject = ({ isOpen, setIsOpen }: Props) => {
  const { user } = useAuth();

  const { data: organizations } = useOrganizationsQuery(
    {
      userId: user?.id!,
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

  const { handleSubmit, Field, Subscribe, reset } = useForm({
    defaultValues: {
      organizationId: "",
      name: "",
      description: "",
      slug: "",
    },
    validators: {
      onChange: newProjectSchema,
    },
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
      <sigil.form display="flex" flexDirection="column" gap={4}>
        <Field
          name="organizationId"
          validators={{
            onChange: newProjectSchema.shape.organizationId,
          }}
        >
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
                errors={state.meta.errors}
                isDirty={state.meta.isDirty}
              />
            </Stack>
          )}
        </Field>

        <Field
          name="name"
          asyncDebounceMs={300}
          validators={{
            onChangeAsync: newProjectSchema.shape.name,
          }}
        >
          {({ handleChange, state }) => (
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
              />

              <FormFieldError
                errors={state.meta.errors}
                isDirty={state.meta.isDirty}
              />
            </Stack>
          )}
        </Field>

        <Field
          name="description"
          asyncDebounceMs={300}
          validators={{
            onChangeAsync: newProjectSchema.shape.description,
          }}
        >
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
                errors={state.meta.errors}
                isDirty={state.meta.isDirty}
              />
            </Stack>
          )}
        </Field>

        <Field
          name="slug"
          asyncDebounceMs={300}
          validators={{
            onChangeAsync: newProjectSchema.shape.slug,
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
                errors={state.meta.errors}
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
              disabled={!canSubmit || isSubmitting || !isDirty}
              mt={4}
              onClick={handleSubmit}
            >
              {app.dashboardPage.cta.newProject.action}
            </Button>
          )}
        </Subscribe>
      </sigil.form>
    </Dialog>
  );
};

export default NewProject;
