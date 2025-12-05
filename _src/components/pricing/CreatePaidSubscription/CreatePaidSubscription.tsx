"use client";

import { Dialog, sigil } from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useIsClient } from "usehooks-ts";
import { z } from "zod";

import { token } from "../../../generated/panda/tokens";
import { createCheckoutSession } from "../../../lib/actions";
import { BASE_URL, app } from "../../../lib/config";
import { DEBOUNCE_TIME, organizationNameSchema } from "../../../lib/constants";
import { getSdk } from "../../../lib/graphql";
import { useForm, useViewportSize } from "../../../lib/hooks";
import { useCreateOrganizationMutation } from "../../../lib/hooks/mutations";
import { generateSlug, getAuthSession, toaster } from "../../../lib/util";

// TODO adjust schemas in this file after closure on https://linear.app/omnidev/issue/OMNI-166/strategize-runtime-and-server-side-validation-approach and https://linear.app/omnidev/issue/OMNI-167/refine-validation-schemas

/** Schema for defining the shape of the create organization form fields, as well as validating the form. */
const createOrganizationSchema = z
  .object({
    name: organizationNameSchema,
  })
  .superRefine(async ({ name }, ctx) => {
    const session = await getAuthSession();

    const slug = generateSlug(name);

    if (!slug?.length || !session) return z.NEVER;

    const sdk = getSdk({ session });

    const { organizationBySlug } = await sdk.Organization({
      slug,
    });

    if (organizationBySlug) {
      ctx.addIssue({
        code: "custom",
        message:
          app.dashboardPage.cta.newOrganization.organizationSlug.error
            .duplicate,
        path: ["name"],
      });
    }
  });

interface Props {
  /** Price ID. */
  priceId: string;
  /** Whether the dialog is open or not. */
  isOpen: boolean;
  /** Handler to manage open state of the dialog */
  setIsOpen: (isOpen: boolean) => void;
}

/**
 * Dialog for creating a new organization with a paid subscription tier.
 */
const CreatePaidSubscription = ({ priceId, isOpen, setIsOpen }: Props) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const isClient = useIsClient();

  const isSmallViewport = useViewportSize({
    minWidth: token("breakpoints.sm"),
  });

  // TODO: determine if there is a better approach here to make the mutation transactional
  // The problem here is that a user could then opt to *not* finish the payment flow
  // If a user doesn't finish the payment flow, the org is still created in the database but with a `Free` tier subscription.
  const { mutateAsync: createOrganization, isPending } =
    useCreateOrganizationMutation({
      onSettled: async () =>
        queryClient.invalidateQueries({ queryKey: ["Organizations"] }),
      onSuccess: async (data) => {
        const checkoutUrl = await createCheckoutSession({
          checkout: {
            type: "create",
            priceId,
            successUrl: `${BASE_URL}/organizations/${data.organization?.slug!}`,
            organizationId: data.organization?.rowId!,
          },
        });

        router.push(checkoutUrl);

        setIsOpen(false);
        reset();
      },
    });

  const { handleSubmit, AppField, AppForm, SubmitForm, reset } = useForm({
    defaultValues: {
      name: "",
    },
    asyncDebounceMs: DEBOUNCE_TIME,
    validators: {
      onSubmitAsync: createOrganizationSchema,
    },
    onSubmit: async ({ value }) =>
      toaster.promise(
        createOrganization({
          input: {
            organization: {
              name: value.name,
              slug: generateSlug(value.name)!,
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
        },
      ),
  });

  if (!isClient) return null;

  return (
    <Dialog
      title={app.dashboardPage.cta.newOrganization.label}
      description={app.dashboardPage.cta.newOrganization.description}
      open={isOpen}
      onOpenChange={({ open }) => {
        reset();
        setIsOpen(open);
      }}
      contentProps={{
        style: {
          // TODO: adjust minW upstream in Sigil for mobile viewports
          minWidth: isSmallViewport ? undefined : "80%",
        },
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

        <AppForm>
          <SubmitForm
            action={app.dashboardPage.cta.newOrganization.action}
            isPending={isPending}
            flex={{ sm: 1 }}
          />
        </AppForm>
      </sigil.form>
    </Dialog>
  );
};

export default CreatePaidSubscription;
