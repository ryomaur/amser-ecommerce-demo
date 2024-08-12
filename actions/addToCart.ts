"use server";

import prisma from "@/lib/db";
import { createCart, getCart } from "./cart";

export async function addToCart(productId: string) {
  // getCart()がnullだった場合createCart()でカートを作る
  try {
    const cart = (await getCart()) ?? (await createCart());

    const itemInCart = cart.items.find((item) => item.productId === productId);
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (product) {
      let isPossibleToAdd = product.stock > 0;

      if (itemInCart) {
        isPossibleToAdd = product.stock > itemInCart.quantity;

        if (isPossibleToAdd) {
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
                    quantity: { increment: 1 },
                  },
                },
              },
            },
          });
        } else {
          return { error: "在庫以上の数をカートに入れることはできません" };
        }
      } else {
        await prisma.cart.update({
          where: {
            id: cart.id,
          },
          data: {
            items: {
              create: {
                productId: productId,
                quantity: 1,
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
