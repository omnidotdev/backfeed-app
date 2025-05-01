import { mock } from "bun:test";

await mock.module("next/image", () => ({
  __esModule: true,
  // biome-ignore lint/suspicious/noExplicitAny: simply for mocking purposes
  default: (props: any) => {
    return <img src="https://example.com/image.png" alt="mock" />;
  },
}));
