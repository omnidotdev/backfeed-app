import { HttpResponse } from "msw";

import { mockCreateUserMutation } from "@/generated/graphql.mock";

/**
 * Create user mutation (success) mock.
 */
export const mockCreateUserMutationSuccess = mockCreateUserMutation(
  ({ variables }) => {
    const { hidraId, username, firstName, lastName } = variables;

    return HttpResponse.json({
      data: {
        createUser: {
          id: "1dc43c0f-5140-43e9-a646-b144305d7787",
          hidraId,
          firstName,
          lastName,
          username,
        },
      },
    });
  },
);

// TODO mock error as well
// export const mockCreateUserMutationError = mockCreateUserQuery(({ variables }) => {});
