import { beforeEach, describe, it } from "bun:test";

import { render } from "test/unit/util";
import CreateOrganization from "./CreateOrganization";

// TODO fill out the `todo` tests
describe("create organization", () => {
  beforeEach(() => {
    render(<CreateOrganization />);
  });

  it.todo("user can create an organization (free tier)", () => {});
});
