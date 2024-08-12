"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { Cart, CartItem, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

// prismaが生成したCartGetPayloadをつかってカートの中身の商品も含めて型を定義する
export type CartWithProducts = Prisma.CartGetPayload<{
  include: {
    items: {
      include: { product: true };
    };
  };
}>;

// 商品自体も含めたカートアイテム
export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

export type ShoppingCart = CartWithProducts & {
  size: number;
  subtotal: number;
};

// カートがクッキーになかった場合のためにnullを定義しておく
export async function getCart(): Promise<ShoppingCart | null> {
  const session = await getServerSession(authOptions);

  let cart: CartWithProducts | null = null;

  if (session) {
    cart = await prisma.cart.findFirst({
      where: {
        userId: session.user.id,
      },
      include: {
        items: { include: { product: true }, orderBy: { productId: "desc" } },
      },
    });
  } else {
    // ローカルのカートIDが存在するかチェックする
    const localCartId = cookies().get("localCartId")?.value;
    // もし存在した場合そのIDからカートとその中身を取得する
    cart = localCartId
      ? await prisma.cart.findUnique({
          where: {
            id: localCartId,
          },
          include: {
            items: {
              include: { product: true },
              orderBy: { productId: "desc" },
            },
          },
        })
      : null;
  }

  if (!cart) {
    return null;
  }

  return {
    ...cart,
    size: cart.items.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0),
    subtotal: cart.items.reduce((acc, item) => {
      return acc + item.quantity * item.product.price;
    }, 0),
  };
}

export async function createCart(): Promise<ShoppingCart> {
  const session = await getServerSession(authOptions);

  let newCart: Cart;

  if (session) {
    newCart = await prisma.cart.create({
      data: { userId: session.user.id },
    });
  } else {
    newCart = await prisma.cart.create({
      data: {},
    });

    cookies().set("localCartId", newCart.id);
  }

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
}

export async function mergeAnonCartIntoUserCart(userId: string) {
  const localCartId = cookies().get("localCartId")?.value;

  const localCart = localCartId
    ? await prisma.cart.findUnique({
        where: {
          id: localCartId,
        },
        include: {
          items: true,
        },
      })
    : null;

  if (!localCart) return;

  const userCart = await prisma.cart.findFirst({
    where: {
      userId,
    },
    include: {
      items: true,
    },
  });

  // 複数のデータベース処理をしな蹴らばならないので、transactionを使用する。
  // もしひとつでもエラーが起きた場合は元の状態にロールバックしてくれる
  await prisma.$transaction(async (tx) => {
    if (userCart) {
      const mergedCartItems = mergeCartItems(localCart.items, userCart.items);

      await tx.cartItem.deleteMany({
        where: { cartId: userCart.id },
      });

      await tx.cart.update({
        where: { id: userCart.id },
        data: {
          items: {
            createMany: {
              data: mergedCartItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    } else {
      await tx.cart.create({
        data: {
          userId: userId,
          items: {
            createMany: {
              data: localCart.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    }

    // ローカルカートを削除（クッキーから削除）
    await tx.cart.delete({
      where: {
        id: localCart.id,
      },
    });

    // クッキーの削除
    cookies().set("localCartId", "");
  });
}

// ローカルのカートの中身とデータベースのカートの中身をマージする
function mergeCartItems(...cartItems: CartItem[][]) {
  return cartItems.reduce((acc, items) => {
    items.forEach((item) => {
      const existingItem = acc.find((i) => i.productId === item.productId);

      if (existingItem) {
        existingItem.quantity = item.quantity;
      } else {
        acc.push(item);
      }
    });

    return acc;
  }, [] as CartItem[]);
}
