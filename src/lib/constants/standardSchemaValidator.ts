import { standardSchemaValidator as reactFormStandardSchemaValidator } from "@tanstack/react-form";

/**
 * Custom validator adapter. Set up so that only the first error message is returned. This is to ensure that the error message(s) are displayed to the user in a consistent way.
 */
const standardSchemaValidator = reactFormStandardSchemaValidator({
  transformErrors: (issues) => issues.map((issue) => issue.message)[0],
});

export default standardSchemaValidator;
