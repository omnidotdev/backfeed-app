import { auth } from "auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

/**
 * Pricing page layout.
 */
const PricingLayout = async ({ children }: PropsWithChildren) => {
  const session = await auth();

  if (session) redirect("/");

  return children;
};

export default PricingLayout;
