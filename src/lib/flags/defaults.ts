export interface FlagConfig {
  variants: Record<string, boolean | string | number>;
  defaultVariant: string;
}

export const defaultFlags: Record<string, FlagConfig> = {
  "backfeed-maintenance": {
    variants: {
      on: true,
      off: false,
    },
    defaultVariant: "off",
  },
};

export const FLAGS = {
  MAINTENANCE: "backfeed-maintenance",
} as const;
