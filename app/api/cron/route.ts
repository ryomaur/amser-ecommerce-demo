import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;
export async function GET(req: NextRequest) {
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const today = new Date();
  const twoDaysAgo = today.setDate(today.getDate() - 2);

  try {
    const deletedCarts = await prisma.cart.deleteMany({
      where: {
        updatedAt: {
          lte: new Date(twoDaysAgo),
        },
        userId: null,
      },
    });

    console.log(deletedCarts);

    const deletedWishlists = await prisma.wishlist.deleteMany({
      where: {
        updatedAt: {
          lte: new Date(twoDaysAgo),
        },
        userId: null,
      },
    });

    console.log(deletedWishlists);

    return NextResponse.json({ data: [deletedCarts, deletedWishlists] });
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}
