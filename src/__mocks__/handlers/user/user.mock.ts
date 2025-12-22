import { HttpResponse } from "msw";

import { mockUserQuery } from "@/generated/graphql.mock";

/**
 * User query (success) mock.
 */
export const mockUserQuerySuccess = mockUserQuery(({ variables }) => {
  const { identityProviderId } = variables;

  return HttpResponse.json({
    data: {
      userByIdentityProviderId: {
        id: "WyJVc2VyIiwiOTc4YTM3ODQtZTE2ZS00MWM0LTk1OGEtNThhYTI2YThkNTEzIl0=",
        identityProviderId,
        username: "omni",
        firstName: "Omni",
        lastName: "Test",
      },
    },
  });
});

// TODO mock error as well
// export const mockUserQueryError = mockUserQuery(({ variables }) => {});
