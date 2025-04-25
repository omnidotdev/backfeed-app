import { describe, expect, it } from "bun:test";

import { standardRegexSchema } from "lib/constants";

describe("Schema Validation", () => {
  describe("Regex Schema", () => {
    it("fails for special characters", () => {
      const input1 = "Test@";
      const input2 = "Test!";
      const input3 = "Test#";
      const input4 = "Test$";
      const input5 = "Test%";
      const input6 = "Test.";
      const input7 = "Test-Test";
      const input8 = "I'm Testing";
      const input9 = "Test, Test";

      expect(standardRegexSchema.safeParse(input1).success).toBe(false);
      expect(standardRegexSchema.safeParse(input2).success).toBe(true);
      expect(standardRegexSchema.safeParse(input3).success).toBe(false);
      expect(standardRegexSchema.safeParse(input4).success).toBe(false);
      expect(standardRegexSchema.safeParse(input5).success).toBe(false);
      expect(standardRegexSchema.safeParse(input6).success).toBe(true);
      expect(standardRegexSchema.safeParse(input7).success).toBe(true);
      expect(standardRegexSchema.safeParse(input8).success).toBe(true);
      expect(standardRegexSchema.safeParse(input9).success).toBe(true);
    });

    it("passes for accented characters", () => {
      const input = "Héllo";

      expect(standardRegexSchema.safeParse(input).success).toBe(true);
    });

    it("passes for international strings", () => {
      const input = "你好世界 123 Hello World";

      expect(standardRegexSchema.safeParse(input).success).toBe(true);
    });
  });
});
