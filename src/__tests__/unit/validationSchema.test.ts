import { describe, expect, it } from "bun:test";

import { z } from "zod";

import { standardRegex } from "lib/constants";

const regexSchema = z.string().trim().regex(standardRegex);

describe("Schema Validation", () => {
  describe("Regex Schema", () => {
    it("fails for special characters", () => {
      const input1 = "Test@";
      const input2 = "Test!";
      const input3 = "Test#";
      const input4 = "Test$";
      const input5 = "Test%";

      expect(regexSchema.safeParse(input1).success).toBe(false);
      expect(regexSchema.safeParse(input2).success).toBe(false);
      expect(regexSchema.safeParse(input3).success).toBe(false);
      expect(regexSchema.safeParse(input4).success).toBe(false);
      expect(regexSchema.safeParse(input5).success).toBe(false);
    });

    it("passes for accented characters", () => {
      const input = "Héllo";

      expect(regexSchema.safeParse(input).success).toBe(true);
    });

    it("passes for international strings", () => {
      const input = "你好世界 123 Hello World";

      expect(regexSchema.safeParse(input).success).toBe(true);
    });
  });
});
