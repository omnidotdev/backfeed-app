import { GraphQLClient } from "graphql-request";

import { getSdk } from "generated/graphql.sdk";
import { API_BASE_URL } from "lib/config";

const graphqlClient = new GraphQLClient(API_BASE_URL!);

/**
 * GraphQL client SDK.
 */
const sdk = getSdk(graphqlClient);

export default sdk;
