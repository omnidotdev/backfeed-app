/**
 * @file Auth route handlers.
 * This workaround is necessary to properly set up callback URLs and other configuration. This solution is from https://github.com/nextauthjs/next-auth/issues/10928#issuecomment-2144241314
 */

import { handlers } from "auth";

export const { GET, POST } = handlers;
