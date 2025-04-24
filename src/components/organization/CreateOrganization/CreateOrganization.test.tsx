import { beforeEach, describe, it } from "bun:test";

import { render } from "test/unit/util";
import CreateOrganization from "./CreateOrganization";

// TODO fill out the `todo` tests
describe("create organization", () => {
  describe("no subscription", () => {
    beforeEach(() => {
      render(<CreateOrganization isBasicTier={false} isTeamTier={false} />);
    });

    it.todo("user can not create an organization", () => {});
  });

  describe("basic tier subscription", () => {
    beforeEach(() => {
      render(<CreateOrganization isBasicTier={true} isTeamTier={false} />);
    });

    it.todo("user can create a single organization", () => {});

    it.todo("user can not create multiple organizations", () => {});
  });

  describe("team tier subscription", () => {
    beforeEach(() => {
      render(<CreateOrganization isBasicTier={true} isTeamTier={true} />);
    });

    it.todo("user can create multiple organizations", () => {});
  });
});
