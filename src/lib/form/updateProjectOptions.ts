import { formOptions } from "@tanstack/react-form";
import { z } from "zod";

import app from "@/lib/config/app.config";
import {
  projectDescriptionSchema,
  projectNameSchema,
  slugSchema,
  urlSchema,
  uuidSchema,
} from "@/lib/constants/schema.constant";
import getSdk from "@/lib/graphql/getSdk";
import generateSlug from "@/lib/util/generateSlug";
import { fetchSession } from "@/server/functions/auth";

const updateProjectDetails = app.projectSettingsPage.cta.updateProject;

// TODO adjust schemas in this file after closure on https://linear.app/omnidev/issue/OMNI-166/strategize-runtime-and-server-side-validation-approach and https://linear.app/omnidev/issue/OMNI-167/refine-validation-schemas

const projectSocialSchema = z.object({
  rowId: uuidSchema.or(z.literal("pending")),
  projectId: uuidSchema,
  // NB: need to allow an empty url for inital `pending` placeholder, this allows users to update other aspects of the form without needing to add a project social.
  url: urlSchema.or(z.literal("")),
});

export type ProjectSocial = z.infer<typeof projectSocialSchema>;

/** Schema for defining the shape of the update project form fields, as well as validating the form. */
const updateProjectSchema = z
  .object({
    name: projectNameSchema,
    description: projectDescriptionSchema,
    website: urlSchema.or(z.literal("")),
    projectSocials: z.array(projectSocialSchema),
    organizationSlug: slugSchema,
    currentSlug: slugSchema,
  })
  .superRefine(
    async ({ name, organizationSlug, currentSlug, projectSocials }, ctx) => {
      const uniqueSocials = new Set();

      for (const social of projectSocials) {
        const url = social.url;

        if (uniqueSocials.has(url)) {
          ctx.addIssue({
            code: "custom",
            message: updateProjectDetails.fields.projectSocials.errors.unique,
            path: ["projectSocials", projectSocials.indexOf(social), "url"],
          });
        } else {
          uniqueSocials.add(url);
        }
      }

      const { session } = await fetchSession();

      const updatedSlug = generateSlug(name);

      if (!updatedSlug?.length || currentSlug === updatedSlug || !session)
        return z.NEVER;

      const sdk = getSdk({ session });

      const { projects } = await sdk.Project({
        projectSlug: updatedSlug,
        organizationSlug,
      });

      if (projects?.nodes?.length) {
        ctx.addIssue({
          code: "custom",
          message: updateProjectDetails.fields.projectSlug.errors.duplicate,
          path: ["name"],
        });
      }
    },
  );

export const updateProjectOptions = formOptions({
  defaultValues: {} as z.input<typeof updateProjectSchema>,
  validators: {
    onSubmitAsync: updateProjectSchema,
  },
});
