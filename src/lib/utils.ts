import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";

/**
 * Merge class names, resolving Tailwind conflicts.
 */
const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export default cn;
