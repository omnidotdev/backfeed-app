"use client";

import {
  Button,
  Flex,
  HStack,
  Icon,
  Input,
  Label,
  sigil,
  Stack,
  Text,
} from "@omnidev/sigil";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { RiUserSharedLine } from "react-icons/ri";
import dayjs from "dayjs";

import { DestructiveAction, FormFieldError } from "components/core";
import { SectionContainer } from "components/layout";
import {
  useDeleteOrganizationMutation,
  useLeaveOrganizationMutation,
  useOrganizationQuery,
  useUpdateOrganizationMutation,
} from "generated/graphql";
import { app } from "lib/config";
import { standardSchemaValidator } from "lib/constants";
import { useAuth } from "lib/hooks";

import type { DestructiveActionProps } from "components/core";

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

const deleteOrganizationDetails =
  app.organizationsPage.dialogs.deleteOrganization;
const leaveOrganizationDetails =
  app.organizationsPage.dialogs.leaveOrganization;

interface Props {
  /** Organization slug. */
  organizationSlug: string;
}

/** Organization settings. */
const OrganizationSettings = ({ organizationSlug }: Props) => {
  const { user } = useAuth();
  const router = useRouter();

  const [readOnly, setReadOnly] = useState(true);
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
      onSuccess: (data) =>
        router.replace(
          `/organizations/${data.updateOrganization?.organization?.slug}/settings`
        ),
    }),
    { mutate: deleteOrganization } = useDeleteOrganizationMutation(),
    { mutate: leaveOrganization } = useLeaveOrganizationMutation();

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
            updatedAt: new Date(),
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
  });

  const DELETE_ORGANIZATION: DestructiveActionProps = {
    title: deleteOrganizationDetails.title,
    description: deleteOrganizationDetails.description,
    buttonText: "Delete",
    action: {
      label: deleteOrganizationDetails.action.label,
      onClick: () => deleteOrganization({ rowId: organization?.rowId! }),
    },
    triggerProps: {
      "aria-label": `${deleteOrganizationDetails.action.label} organization`,
      color: "foreground.primary",
    },
    iconProps: {
      color: "foreground.primary",
    },
    buttonProps: {
      borderColor: "omni.ruby",
      backgroundColor: "omni.ruby",
    },
  };

  const LEAVE_ORGANIZATION: DestructiveActionProps = {
    title: leaveOrganizationDetails.title,
    description: leaveOrganizationDetails.description,
    buttonText: "Delete",
    icon: RiUserSharedLine,
    action: {
      label: leaveOrganizationDetails.action.label,
      onClick: () =>
        leaveOrganization({
          organizationId: organization?.rowId!,
          userId: user?.hidraId!,
        }),
    },
    triggerProps: {
      "aria-label": `${leaveOrganizationDetails.action.label} organization`,
      color: "blue",
    },
    buttonProps: {
      variant: "solid",
      borderColor: "omni.ruby",
      backgroundColor: "omni.ruby",
    },
  };

  const DESTRUCTIVE_ACTION = isOrganizationOwner
    ? DELETE_ORGANIZATION
    : LEAVE_ORGANIZATION;

  // TODO: add loading state
  if (!organization) return null;

  return (
    <Stack>
      <SectionContainer title="Update organization">
        <sigil.form
          onSubmit={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            await handleSubmit();
            reset();
          }}
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

                {
                  app.organizationSettingsPage.cta.updateOrganization.action
                    .edit
                }
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
      </SectionContainer>

      <SectionContainer
        title="Delete Organization"
        description="The organization will be permanently deleted, including its projects, posts and comments. This action is irreversible and can not be undone."
        border="1px solid"
        borderColor="brand.quinary"
      >
        <HStack alignItems="center" justifyContent="space-between">
          <Stack gap={1}>
            <Text fontWeight="semibold">{organization.name}</Text>

            <Text
              fontSize="sm"
              color="foreground.muted"
            >{`Updated: ${dayjs(organization.updatedAt).fromNow()}`}</Text>
          </Stack>

          <DestructiveAction {...DESTRUCTIVE_ACTION} />
        </HStack>
      </SectionContainer>
    </Stack>
  );
};

export default OrganizationSettings;
