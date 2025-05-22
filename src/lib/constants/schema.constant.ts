import { z } from "zod";

import { app } from "lib/config";

const organizationErrors = app.forms.errors.organization;
const projectErrors = app.forms.errors.project;

const emptyStringAsUndefined = z.literal("").transform(() => undefined);

// NB: there is currently an issue with `z.string().url()`. This is a workaround to handle it a bit more verbosely. See: https://github.com/colinhacks/zod/issues/2236#issuecomment-2722654510
export const urlSchema = z.string().refine((value) => {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i", // fragment locator
  );
  return urlPattern.test(value);
}, "Invalid URL");

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
