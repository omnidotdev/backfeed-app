"use client";

import { Dialog, sigil } from "@omnidev/sigil";
import { useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";
import { useIsClient } from "usehooks-ts";
import { z } from "zod";

import { useQueryClient } from "@tanstack/react-query";
import { token } from "generated/panda/tokens";
import { revalidatePath } from "lib/actions";
import { app } from "lib/config";
import { DEBOUNCE_TIME, organizationNameSchema } from "lib/constants";
import { getSdk } from "lib/graphql";
import { useForm, useViewportSize } from "lib/hooks";
import { useCreateOrganizationMutation } from "lib/hooks/mutations";
import { useDialogStore } from "lib/hooks/store";
import { generateSlug, getAuthSession, toaster } from "lib/util";
import { DialogType } from "store";

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

/**
 * Dialog for creating a new organization.
 */
const CreateOrganization = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const isClient = useIsClient();

  const isSmallViewport = useViewportSize({
    minWidth: token("breakpoints.sm"),
  });

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
      enabled: !isCreateProjectDialogOpen,
      enableOnFormTags: true,
      preventDefault: true,
    },
    [isOpen, isCreateProjectDialogOpen],
  );

  const { mutateAsync: createOrganization, isPending } =
    useCreateOrganizationMutation({
      onSettled: async () =>
        queryClient.invalidateQueries({ queryKey: ["Organizations"] }),
      onSuccess: (data) => {
        // TODO: Discuss. With the path revalidations, I believe this gets purged, so the navigation doesnt occur. Is it necessary to navigate?
        router.push(
          `/${app.organizationsPage.breadcrumb.toLowerCase()}/${data?.organization?.slug}`,
        );

        revalidatePath("/", "layout");

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

export default CreateOrganization;
