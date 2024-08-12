"use server";

import prisma from "@/lib/db";
import { getCart } from "./cart";
import { revalidatePath } from "next/cache";

export async function removeFromCart(productId: string) {
  try {
    const cart = await getCart();

    if (cart) {
      const itemInCart = cart.items.find(
        (item) => item.productId === productId
      );

      if (itemInCart) {
        await prisma.cart.update({
          where: {
            id: cart.id,
          },
          data: {
            items: {
              delete: {
                id: itemInCart.id,
              },
            },
          },
        });
      }
    }

    revalidatePath("/cart");
  } catch (error) {
    return {
      error: "エラーが発生しました",
    };
  }
}
