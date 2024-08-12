import prisma from "@/lib/db";
import AdminOrdersClient from "./components/AdminOrdersClient";
import { Prisma } from "@prisma/client";

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

const AdminOrdersPage = async () => {
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

  return (
    <>
      <AdminOrdersClient orders={orders} />
    </>
  );
};

export default AdminOrdersPage;
