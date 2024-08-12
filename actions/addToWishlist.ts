"use server";

import prisma from "@/lib/db";
import { createWishlist, getWishlist } from "./wishlist";

export async function addToWishlist(productId: string) {
  try {
    // getWishlist()がnullだった場合createWishlist()でウィッシュリストを作る
    const wishlist = (await getWishlist()) ?? (await createWishlist());

    const itemInWishlist = wishlist.wishlistItems.find(
      (item) => item.productId === productId
    );

    if (!itemInWishlist) {
      await prisma.wishlist.update({
        where: {
          id: wishlist.id,
        },
        data: {
          wishlistItems: {
            create: {
              productId: productId,
            },
          },
        },
      });
    }
  } catch (error) {
    return {
      error: "エラーが発生しました",
    };
  }
}
