import { beforeEach, describe, it } from "bun:test";

import { render } from "test/unit/util";
import CreateProject from "./CreateProject";

// TODO fill out the `todo` tests and update renders/tests to include `organizationSlug` prop conditionally
describe("create project", () => {
  describe("no subscription", () => {
    beforeEach(() => {
      render(<CreateProject organizationSlug="" />);
    });

    it.todo("user can not create a project", () => {});
  });

  describe("basic tier subscription", () => {
    beforeEach(() => {
      render(<CreateProject organizationSlug="" />);
    });

    it.todo("user (non admin) can not create a single project", () => {});

    it.todo("user (admin) can create single project", () => {});

    it.todo(
      "user (admin) can not create more than 3 projects for the same organization",
      () => {},
    );
  });

  describe("team tier subscription", () => {
    beforeEach(() => {
      render(<CreateProject organizationSlug="" />);
    });

    it.todo("user (non admin) can not create a single project", () => {});

    it.todo("user (admin) can create more than 3 projects", () => {});
  });
});
