import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { Session } from "next-auth";

export type OrderWithProducts = Prisma.OrderGetPayload<{
  include: {
    orderItems: {
      include: { product: true };
    };
    user: {
      select: {
        id: true;
        username: true;
        email: true;
      };
    };
  };
}>;

export default async function getUserOrders(
  session: Session
): Promise<OrderWithProducts[] | null> {
  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
      status: "支払い済み",
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
      user: {
        select: {
          id: true,
          email: true,
          username: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return orders;
}
