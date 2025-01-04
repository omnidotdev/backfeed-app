import { HttpResponse } from "msw";

import { mockUpdateUserMutation } from "generated/graphql.mock";

/**
 * Update user mutation (success) mock.
 */
export const mockUpdateUserMutationSuccess = mockUpdateUserMutation(
  ({ variables }) => {
    const { hidraId, patch } = variables;

    return HttpResponse.json({
      data: {
        updateUser: {
          id: "1dc43c0f-5140-43e9-a646-b144305d7787",
          hidraId,
          firstName: patch.firstName,
          lastName: patch.lastName,
          username: patch.username,
        },
      },
    });
  },
);

// TODO mock error as well
// export const mockUpdateUserMutationError = mockUpdateUserQuery(({ variables }) => {});
