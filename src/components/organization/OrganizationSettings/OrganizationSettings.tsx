"use client";

import {
  Button,
  Divider,
  HStack,
  Icon,
  Input,
  Label,
  sigil,
  Stack,
  Text,
} from "@omnidev/sigil";
import { LuSave } from "react-icons/lu";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
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
import { app, isDevEnv } from "lib/config";
import { standardSchemaValidator } from "lib/constants";
import { useAuth } from "lib/hooks";

import type { DestructiveActionProps } from "components/core";

const updateOrganizationDetails =
  app.organizationSettingsPage.cta.updateOrganization;
const deleteOrganizationDetails =
  app.organizationSettingsPage.cta.deleteOrganization;
const leaveOrganizationDetails =
  app.organizationSettingsPage.cta.leaveOrganization;

const emptyStringAsUndefined = z.literal("").transform(() => undefined);

/** Schema for defining the shape of the update organization form fields. */
const updateOrganizationSchema = z.object({
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

/** Organization settings. */
const OrganizationSettings = () => {
  const { organizationSlug } = useParams<{ organizationSlug: string }>();
  const { user } = useAuth();
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
      onSuccess: (data) =>
        router.replace(
          `/organizations/${data?.updateOrganization?.organization?.slug}/settings`
        ),
    }),
    { mutate: deleteOrganization } = useDeleteOrganizationMutation({
      onMutate: () => router.replace("/"),
    }),
    { mutate: leaveOrganization } = useLeaveOrganizationMutation({
      onMutate: () => router.replace("/"),
    });

  const { handleSubmit, Field, Subscribe, reset } = useForm({
    defaultValues: {
      name: organization?.name ?? "",
      slug: organization?.slug ?? "",
    },
    asyncDebounceMs: 300,
    validatorAdapter: standardSchemaValidator,
    validators: {
      onMount: updateOrganizationSchema,
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

  const DELETE_ORGANIZATION: DestructiveActionProps = {
    title: deleteOrganizationDetails.destruciveAction.title,
    description: deleteOrganizationDetails.destruciveAction.description,
    triggerLabel: deleteOrganizationDetails.destruciveAction.actionLabel,
    action: {
      label: deleteOrganizationDetails.destruciveAction.actionLabel,
      onClick: () => deleteOrganization({ rowId: organization?.rowId! }),
    },
    triggerProps: {
      "aria-label": `${deleteOrganizationDetails.destruciveAction.actionLabel} organization`,
    },
  };

  const LEAVE_ORGANIZATION: DestructiveActionProps = {
    title: leaveOrganizationDetails.destruciveAction.title,
    description: leaveOrganizationDetails.destruciveAction.description,
    triggerLabel: leaveOrganizationDetails.destruciveAction.actionLabel,
    icon: RiUserSharedLine,
    action: {
      label: leaveOrganizationDetails.destruciveAction.actionLabel,
      onClick: () =>
        leaveOrganization({
          organizationId: organization?.rowId!,
          userId: user?.hidraId!,
        }),
    },
    triggerProps: {
      "aria-label": `${leaveOrganizationDetails.destruciveAction.actionLabel} organization`,
    },
  };

  const DESTRUCTIVE_ACTION = isOrganizationOwner
    ? DELETE_ORGANIZATION
    : LEAVE_ORGANIZATION;

  return (
    <Stack gap={6}>
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
            selector={(state) => [
              state.canSubmit,
              state.isSubmitting,
              state.isDirty,
            ]}
          >
            {([canSubmit, isSubmitting, isDirty]) => (
              <Button
                type="submit"
                width={48}
                disabled={!canSubmit || !isDirty || isSubmitting}
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

      <SectionContainer
        title={
          isOrganizationOwner
            ? deleteOrganizationDetails.title
            : leaveOrganizationDetails.title
        }
        description={
          isOrganizationOwner
            ? deleteOrganizationDetails.description
            : leaveOrganizationDetails.description
        }
        border="1px solid"
        borderColor="omni.ruby"
      >
        <Divider />

        <HStack alignItems="center" justifyContent="space-between">
          <Stack gap={1}>
            <Text fontWeight="semibold">{organization?.name}</Text>

            <Text
              fontSize="sm"
              color="foreground.muted"
            >{`Updated: ${dayjs(organization?.updatedAt).fromNow()}`}</Text>
          </Stack>

          <DestructiveAction {...DESTRUCTIVE_ACTION} />
        </HStack>
      </SectionContainer>
    </Stack>
  );
};

export default OrganizationSettings;
