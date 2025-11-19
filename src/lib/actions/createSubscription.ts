"use server";

import { revalidatePath } from "next/cache";

import { auth } from "auth";

interface Options {
  /** Organization ID */
  organizationId: string;
}

const createSubscription = async ({ organizationId }: Options) => {
  const session = await auth();

  if (!session) throw new Error("Unauthorized");

  // TODO: add logic for stripe integration

  revalidatePath("/profile/[userId]/organizations");
  revalidatePath("/organizations/[organizationSlug]/settings");
  revalidatePath("/pricing");
};

export default createSubscription;
