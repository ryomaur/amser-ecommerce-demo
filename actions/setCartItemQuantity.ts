"use server";

import prisma from "@/lib/db";
import { createCart, getCart } from "./cart";
import { revalidatePath } from "next/cache";

export async function setCartItemQuantity(productId: string, quantity: number) {
  try {
    const cart = (await getCart()) ?? (await createCart());

    const itemInCart = cart.items.find((item) => item.productId === productId);

    if (quantity === 0) {
      if (itemInCart) {
        await prisma.cart.update({
          where: { id: cart.id },
          data: {
            items: {
              delete: { id: itemInCart.id },
            },
          },
        });
      }
    } else {
      if (itemInCart) {
        await prisma.cart.update({
          where: {
            id: cart.id,
          },
          data: {
            items: {
              update: {
                where: {
                  id: itemInCart.id,
                },
                data: {
                  quantity,
                },
              },
            },
          },
        });
      } else {
        await prisma.cart.update({
          where: { id: cart.id },
          data: {
            items: {
              create: {
                productId,
                quantity,
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
