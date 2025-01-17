import { beforeEach, describe, it } from "bun:test";

import HomePage from "app/page";
import { render } from "test/unit/util";

// TODO fill out the `todo` tests, `app/page.tsx` is an RSC and RSC testing is tricky right now (see e.g. https://github.com/testing-library/react-testing-library/issues/1209#issuecomment-1569813305)
describe("home page", () => {
  beforeEach(() => {
    render(<HomePage />);
  });

  it.todo("displays landing page when unauthenticated", () => {});

  it.todo("displays dashboard page when authenticated", () => {});
});
