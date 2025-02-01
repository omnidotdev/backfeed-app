import { auth } from "auth";
import { NextResponse } from "next/server";

import { polar } from "lib/polar";

import type { NextRequest } from "next/server";

/**
 * Customer checkout route.
 * TODO: better error handling.
 */
export const GET = async (request: NextRequest) => {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const productId = request.nextUrl.searchParams.get("productId");

  if (!productId) {
    return NextResponse.json(
      { error: "Product ID not provided" },
      { status: 400 }
    );
  }

  const checkout = await polar.checkouts.custom.create({
    productId: productId,
    successUrl: `${process.env.NEXT_PUBLIC_BASE_URL!}/payment/confirmation?checkoutId={CHECKOUT_ID}`,
    customerMetadata: {
      userId: session.user.rowId!,
    },
  });

  return NextResponse.json(checkout);
};
