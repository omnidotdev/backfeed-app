"use client";

import { Dialog, sigil } from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useIsClient } from "usehooks-ts";
import { z } from "zod";

import { token } from "generated/panda/tokens";
import { app } from "lib/config";
import { DEBOUNCE_TIME, organizationNameSchema } from "lib/constants";
import { getSdk } from "lib/graphql";
import { useAuth, useForm, useViewportSize } from "lib/hooks";
import { useCreateOrganizationMutation } from "lib/hooks/mutations";
import { generateSlug, getAuthSession, toaster } from "lib/util";

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
  /** Product ID. */
  // TODO: this might need to be changed to be `priceId` to validate that the correct option for a product is being handled
  productId: string;
  /** Whether the dialog is open or not. */
  isOpen: boolean;
  /** Handler to manage open state of the dialog */
  setIsOpen: (isOpen: boolean) => void;
}

/**
 * Dialog for creating a new organization with a paid subscription tier.
 */
const CreatePaidSubscription = ({ productId, isOpen, setIsOpen }: Props) => {
  const router = useRouter();

  const { user } = useAuth();

  const queryClient = useQueryClient();

  const isClient = useIsClient();

  const isSmallViewport = useViewportSize({
    minWidth: token("breakpoints.sm"),
  });

  // TODO: determine if there is a better approach here using Stripe integration
  // TODO: discuss this mutation. We *must* attach `organizationId` as metadata to the subscription upon creation, so we need to wait for `onSuccess` here before routing to the checkout page
  // The problem here is that a user could then opt to *not* finish the payment flow
  // If a user doesn't finish the payment flow, the org is still creating in the database but with a `Free` tier subscription.
  // Is this a tradeoff we are willing to make? Unfortunately, we can't update subscription metadata *after* the fact, or I would propose processing the payment first. See: https://github.com/polarsource/polar/issues/6871
  const { mutateAsync: createOrganization, isPending } =
    useCreateOrganizationMutation({
      onSettled: async () =>
        queryClient.invalidateQueries({ queryKey: ["Organizations"] }),
      onSuccess: async (data) => {
        // TODO: handle `createCheckoutSession` when it is set up for new subscriptions

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
