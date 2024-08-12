"use server";

import prisma from "@/lib/db";

export default async function deleteOrder(orderId: string) {
  try {
    await prisma.order.delete({
      where: {
        id: orderId,
      },
    });
  } catch (error) {
    return {
      error: "エラーが発生しました",
    };
  }
}
