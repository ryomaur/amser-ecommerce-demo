import prisma from "@/lib/db";
import AdminOrdersClient from "./components/AdminOrdersClient";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export type OrderWithUser = Prisma.OrderGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        username: true;
        email: true;
      };
    };
  };
}>;

const getAllOrders = async () => {
  "use server";
  const orders = await prisma.order.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
    },
  });

  revalidatePath("/admin/orders");
  return orders;
};

const AdminOrdersPage = async () => {
  const orders = await getAllOrders();

  return (
    <>
      <AdminOrdersClient orders={orders} />
    </>
  );
};

export default AdminOrdersPage;
