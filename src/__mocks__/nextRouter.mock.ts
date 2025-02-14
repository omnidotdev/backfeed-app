import { beforeEach, jest, mock } from "bun:test";
import mockRouter from "next-router-mock";

// TODO replace mocks below with updated implementation from `next-router-mock` that supports app router (track https://github.com/scottrippey/next-router-mock/pull/103)

const urlParamsMock = jest.fn(() => {
  const router = require("next-router-mock").useRouter();
  const path = router.asPath.split("?")?.[1] ?? "";
  return new URLSearchParams(path);
});

/**
 * Shim Next.js router.
 * @see https://github.com/scottrippey/next-router-mock/issues/67
 */
await mock.module("next/navigation", () => ({
  ...require("next-router-mock"),
  // NB: `useParams` and `useSearchParams` are functionally different, but the same mock works for current testing purposes
  useParams: urlParamsMock,
  useSearchParams: urlParamsMock,
  usePathname: jest.fn(() => {
    const router = require("next-router-mock").useRouter();
    return router.pathname;
  }),
  // TODO: determine appropriate mock implementation
  useSelectedLayoutSegment: jest.fn(),
  useServerInsertedHTML: jest.fn(),
  notFound: jest.fn(),
  redirect: jest.fn(),
}));

beforeEach(() => {
  // reset router URL
  mockRouter.setCurrentUrl("/");
});
