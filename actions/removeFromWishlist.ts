"use server";

import prisma from "@/lib/db";
import { createWishlist, getWishlist } from "./wishlist";

export async function removeFromWishlist(productId: string) {
  try {
    const wishlist = await getWishlist();

    if (wishlist) {
      const itemInWishlist = wishlist.wishlistItems.find(
        (item) => item.productId === productId
      );

      if (itemInWishlist) {
        await prisma.wishlist.update({
          where: {
            id: wishlist.id,
          },
          data: {
            wishlistItems: {
              delete: {
                id: itemInWishlist.id,
              },
            },
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
