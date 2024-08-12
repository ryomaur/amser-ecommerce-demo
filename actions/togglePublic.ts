"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export async function togglePublic(value: boolean) {
  try {
    const session = await getServerSession(authOptions);
    if (session) {
      const wishlist = await prisma.wishlist.findFirst({
        where: {
          userId: session.user.id,
        },
      });

      if (wishlist) {
        await prisma.wishlist.update({
          where: {
            id: wishlist.id,
          },
          data: {
            isPublic: value,
          },
        });
      }
    }
  } catch (error) {
    return {
      error: "エラーが発生しました",
    };
  }
}
