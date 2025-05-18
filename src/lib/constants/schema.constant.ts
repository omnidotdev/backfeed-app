import { z } from "zod";

import { app } from "lib/config";

const organizationErrors = app.forms.errors.organization;
const projectErrors = app.forms.errors.project;

export const emptyStringAsUndefined = z.literal("").transform(() => undefined);

export const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, app.forms.errors.slug.regex)
  .min(3, app.forms.errors.slug.minLength)
  .max(50, app.forms.errors.slug.maxLength);

export const uuidSchema = z.string().uuid(app.forms.errors.id.format);

export const standardRegexSchema = z
  .string()
  .trim()
  .regex(/^[\p{L}\p{N}\s,!'?.\-\(\)]+$/u, app.forms.errors.regex.invalid);

export const organizationNameSchema = standardRegexSchema
  .min(3, organizationErrors.name.minLength)
  .max(90, organizationErrors.name.maxLength);

export const projectNameSchema = standardRegexSchema
  .min(3, projectErrors.name.minLength)
  .max(60, projectErrors.name.maxLength);

export const projectDescriptionSchema = emptyStringAsUndefined.or(
  z.string().trim().max(240, projectErrors.description.maxLength),
);

export const projectSocialSchema = z.object({
  rowId: uuidSchema.or(z.literal("pending")),
  projectId: uuidSchema,
  // NB: need to allow an empty url for inital `pending` placeholder. These are filtered out below hwoever in `updateProjectSchema` to avoid triggering mutations
  url: z.string().url().min(1).max(255).or(z.literal("")),
});

export type ProjectSocial = z.infer<typeof projectSocialSchema>;
