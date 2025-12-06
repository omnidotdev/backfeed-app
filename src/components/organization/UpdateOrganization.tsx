import { Divider, Stack, sigil } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import {
  useNavigate,
  useParams,
  useRouteContext,
} from "@tanstack/react-router";
import { z } from "zod";

import SectionContainer from "@/components/layout/SectionContainer";
import { useUpdateOrganizationMutation } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import { isDevEnv } from "@/lib/config/env.config";
import DEBOUNCE_TIME from "@/lib/constants/debounceTime.constant";
import {
  organizationNameSchema,
  slugSchema,
} from "@/lib/constants/schema.constant";
import getSdk from "@/lib/graphql/getSdk";
import useForm from "@/lib/hooks/useForm";
import useOrganizationMembership from "@/lib/hooks/useOrganizationMembership";
import { organizationOptions } from "@/lib/options/organizations";
import generateSlug from "@/lib/util/generateSlug";
import { fetchSession } from "@/server/functions/auth";

const updateOrganizationDetails =
  app.organizationSettingsPage.cta.updateOrganization;

/** Schema for defining the shape of the update organization form fields, as well as validating the form. */
const updateOrganizationSchema = z
  .object({
    name: organizationNameSchema,
    currentSlug: slugSchema,
  })
  .superRefine(async ({ name, currentSlug }, ctx) => {
    const { session } = await fetchSession();

    const updatedSlug = generateSlug(name);

    if (!updatedSlug?.length || updatedSlug === currentSlug || !session)
      return z.NEVER;

    const sdk = await getSdk();

    const { organizationBySlug } = await sdk.Organization({
      slug: updatedSlug,
    });

    if (organizationBySlug) {
      ctx.addIssue({
        code: "custom",
        message:
          updateOrganizationDetails.fields.organizationSlug.errors.duplicate,
        path: ["name"],
      });
    }
  });

/**
 * Form for updating organization details.
 */
const UpdateOrganization = () => {
  const { session, queryClient } = useRouteContext({
    from: "/_auth/organizations/$organizationSlug/_layout/_manage/settings",
  });
  const { organizationSlug } = useParams({
    from: "/_auth/organizations/$organizationSlug/_layout/_manage/settings",
  });
  const navigate = useNavigate();

  const { data: organization } = useQuery({
    ...organizationOptions({
      slug: organizationSlug,
    }),
    select: (data) => data.organizationBySlug,
  });

  const { isAdmin } = useOrganizationMembership({
    userId: session?.user.rowId,
    organizationId: organization?.rowId,
  });

  const { mutateAsync: updateOrganization } = useUpdateOrganizationMutation({
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: organizationOptions({ slug: organizationSlug }).queryKey,
      });

      navigate({
        to: "/organizations/$organizationSlug/settings",
        params: {
          organizationSlug: data?.updateOrganization?.organization?.slug!,
        },
        replace: true,
      });

      reset();
    },
  });

  const { handleSubmit, AppField, AppForm, SubmitForm, reset } = useForm({
    defaultValues: {
      name: organization?.name ?? "",
      currentSlug: organization?.slug ?? "",
    },
    asyncDebounceMs: DEBOUNCE_TIME,
    validators: {
      onSubmitAsync: updateOrganizationSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await updateOrganization({
          rowId: organization?.rowId!,
          patch: {
            name: value.name,
            slug: generateSlug(value.name),
            updatedAt: new Date(),
          },
        });
      } catch (err) {
        if (isDevEnv) console.error(err);
      }
    },
  });

  return (
    <SectionContainer
      title={
        isAdmin
          ? updateOrganizationDetails.title
          : updateOrganizationDetails.memberTitle
      }
    >
      <Divider />

      <sigil.form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await handleSubmit();
        }}
      >
        <Stack gap={4} maxW="lg">
          <AppField name="name">
            {({ InputField }) => (
              <InputField
                label={updateOrganizationDetails.fields.organizationName.label}
                disabled={!isAdmin}
              />
            )}
          </AppField>
        </Stack>

        <AppForm>
          <SubmitForm
            action={updateOrganizationDetails.action}
            disabled={!isAdmin}
            mt={4}
          />
        </AppForm>
      </sigil.form>
    </SectionContainer>
  );
};

export default UpdateOrganization;
