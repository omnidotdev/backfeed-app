import { z } from "zod";

import { app } from "lib/config";

const organizationErrors = app.forms.errors.organization;
const projectErrors = app.forms.errors.project;

const emptyStringAsUndefined = z.literal("").transform(() => undefined);

export const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, app.forms.errors.slug.regex)
  .min(3, app.forms.errors.slug.minLength)
  .max(50, app.forms.errors.slug.maxLength);

export const uuidSchema = z.string().uuid(app.forms.errors.id.format);

export const standardRegexSchema = z
  .string()
  .trim()
  .regex(/^[\p{L}\p{N}\s]+$/u, app.forms.errors.regex.invalid);

export const organizationNameSchema = standardRegexSchema
  .min(3, organizationErrors.name.minLength)
  .max(90, organizationErrors.name.maxLength);

export const projectNameSchema = standardRegexSchema
  .min(3, projectErrors.name.minLength)
  .max(60, projectErrors.name.maxLength);

export const projectDescriptionSchema = emptyStringAsUndefined.or(
  z
    .string()
    .trim()
    .min(10, projectErrors.description.minLength)
    .max(240, projectErrors.description.maxLength)
);
