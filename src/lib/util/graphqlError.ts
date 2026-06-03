import { ClientError } from "graphql-request";

/**
 * Extract a human-readable message from an unknown error thrown by a GraphQL
 * request. Returns the first GraphQL error message when available (e.g.
 * "Insufficient permissions", "Maximum number of projects reached"), falling
 * back to the generic Error message, then `undefined` when nothing useful is
 * present. Callers supply their own fallback copy.
 */
const extractGraphqlErrorMessage = (error: unknown): string | undefined => {
  if (error instanceof ClientError) {
    const message = error.response?.errors?.[0]?.message;
    if (message) return message;
  }

  if (error instanceof Error && error.message) return error.message;

  return undefined;
};

export default extractGraphqlErrorMessage;
