import { describe, expect, it } from "bun:test";

import { standardRegexSchema } from "lib/constants";

describe("Schema Validation", () => {
  describe("Regex Schema", () => {
    it("fails for most special characters", () => {
      const input1 = "Test@";
      const input2 = "Test#";
      const input3 = "Test$";
      const input4 = "Test%";

      expect(standardRegexSchema.safeParse(input1).success).toBe(false);
      expect(standardRegexSchema.safeParse(input2).success).toBe(false);
      expect(standardRegexSchema.safeParse(input3).success).toBe(false);
      expect(standardRegexSchema.safeParse(input4).success).toBe(false);
    });

    it("passes for certain special characters (!, ., -, ', ?, parentheses)", () => {
      const inputs = [
        "Test!",
        "Test.",
        "Test-Test",
        "I'm Testing",
        "Test, Test",
        "Test?",
        "Test()",
      ];

      for (const input of inputs)
        expect(standardRegexSchema.safeParse(input).success).toBe(true);
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
