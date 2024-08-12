"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { Prisma, Wishlist, WishlistItem } from "@prisma/client";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

// prismaが生成したWishlistGetPayloadをつかってウィッシュリストの中身の商品も含めて型を定義する
export type WishlistWithProducts = Prisma.WishlistGetPayload<{
  include: {
    wishlistItems: {
      include: { product: true };
    };
  };
}>;

// 商品自体も含めたウィッシュリストアイテム
export type WisthlistItemWithProduct = Prisma.WishlistItemGetPayload<{
  include: { product: true };
}>;

// ウィッシュリストがクッキーになかった場合のためにnullを定義しておく
export async function getWishlist(): Promise<WishlistWithProducts | null> {
  const session = await getServerSession(authOptions);

  let wishlist: WishlistWithProducts | null = null;

  if (session) {
    wishlist = await prisma.wishlist.findFirst({
      where: {
        userId: session.user.id,
      },
      include: { wishlistItems: { include: { product: true } } },
    });
  } else {
    // ローカルのウィッシュリストIDが存在するかチェックする
    const localWishlistId = cookies().get("localWishlistId")?.value;

    // もし存在した場合そのIDからウィッシュリストとその中身を取得する
    wishlist = localWishlistId
      ? await prisma.wishlist.findUnique({
          where: {
            id: localWishlistId,
          },
          include: {
            wishlistItems: {
              include: { product: true },
            },
          },
        })
      : null;
  }

  if (!wishlist) {
    return null;
  }

  return wishlist;
}

export async function createWishlist(): Promise<WishlistWithProducts> {
  const session = await getServerSession(authOptions);

  let newWishlist: Wishlist;

  if (session) {
    newWishlist = await prisma.wishlist.create({
      data: { userId: session.user.id, isPublic: false },
    });
  } else {
    newWishlist = await prisma.wishlist.create({
      data: { isPublic: false },
    });

    cookies().set("localWishlistId", newWishlist.id);
  }

  return {
    ...newWishlist,
    wishlistItems: [],
  };
}

export async function mergeAnonWishlistIntoUserWishlist(userId: string) {
  const localWishlistId = cookies().get("localWishlistId")?.value;

  const localWishlist = localWishlistId
    ? await prisma.wishlist.findUnique({
        where: {
          id: localWishlistId,
        },
        include: {
          wishlistItems: true,
        },
      })
    : null;

  if (!localWishlist) return;

  const userWishlist = await prisma.wishlist.findFirst({
    where: {
      userId,
    },
    include: { wishlistItems: true },
  });

  // 複数のデータベース処理をしな蹴らばならないので、transactionを使用する。
  // もしひとつでもエラーが起きた場合は元の状態にロールバックしてくれる
  await prisma.$transaction(async (tx) => {
    if (userWishlist) {
      const mergedWishlistItems = mergeWishlistItems(
        localWishlist.wishlistItems,
        userWishlist.wishlistItems
      );

      await tx.wishlistItem.deleteMany({
        where: { wishlistId: userWishlist.id },
      });

      await tx.wishlist.update({
        where: { id: userWishlist.id },
        data: {
          wishlistItems: {
            createMany: {
              data: mergedWishlistItems.map((item) => ({
                productId: item.productId,
              })),
            },
          },
        },
      });
    } else {
      await tx.wishlist.create({
        data: {
          userId: userId,
          wishlistItems: {
            createMany: {
              data: localWishlist.wishlistItems.map((item) => ({
                productId: item.productId,
              })),
            },
          },
          isPublic: false,
        },
      });
    }

    // ローカルのウィッシュリストを削除（クッキーから削除）
    await tx.wishlist.delete({
      where: {
        id: localWishlist.id,
      },
    });

    // delete cookie
    cookies().set("localWishlist", "");
  });
}

// "..." は複数いくらでもこの引数を渡せるという意味
function mergeWishlistItems(...wishlistItems: WishlistItem[][]) {
  return wishlistItems.reduce((acc, items) => {
    items.forEach((item) => {
      const existingItem = acc.find((i) => i.productId === item.productId);

      if (!existingItem) {
        acc.push(item);
      }
    });

    return acc;
  }, [] as WishlistItem[]);
}
