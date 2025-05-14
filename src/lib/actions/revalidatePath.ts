"use server";

import { revalidatePath as nextRevalidatePath } from "next/cache";

const revalidatePath = (originalPath: string, type?: "layout" | "page") =>
  nextRevalidatePath(originalPath, type);

export default revalidatePath;
