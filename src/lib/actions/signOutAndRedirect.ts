"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import auth from "lib/auth/auth";

/**
 * Sign out the user and redirect to home.
 * For use when a stale session is detected.
 */
const signOutAndRedirect = async (): Promise<never> => {
  const reqHeaders = await headers();

  await auth.api.signOut({ headers: reqHeaders });

  redirect("/");
};

export default signOutAndRedirect;
