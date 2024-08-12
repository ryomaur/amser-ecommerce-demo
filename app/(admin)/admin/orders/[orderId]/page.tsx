import OrderHistoryCard from "@/app/(root)/user/components/OrderHistoryCard";
import prisma from "@/lib/db";
import React from "react";
import { notFound } from "next/navigation";

interface AdminOrderDetailPageProps {
  params: {
    orderId: string;
  };
}

const AdminOrderDetailPage: React.FC<AdminOrderDetailPageProps> = async ({
  params,
}) => {
  const order = await prisma.order.findUnique({
    where: {
      id: params.orderId,
    },
    include: {
      orderItems: {
        include: { product: true },
      },
      user: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="w-full">
      <div className="w-full rounded-2xl bg-bglighter">
        <div className="mx-auto w-full rounded-lg bg-transparent px-20 py-12 shadow-none">
          <h1 className="text-center text-2xl font-bold text-foreground">
            注文の詳細
          </h1>
          <div className="my-7 font-medium text-foreground/90">
            <div className="mt-2 flex items-center gap-5 text-sm">
              <div className="text-sm">注文者：</div>
              <div>{order.user.username}</div>
            </div>
            <div className="mt-2 flex items-center gap-5 text-sm">
              <div className="text-sm">注文者ID：</div>
              <div>{order.user.id}</div>
            </div>
            <div className="mt-2 flex items-center gap-5 text-sm">
              <div className="text-sm">お支払い状況</div>
              <div
                className={`rounded-full text-sm font-medium ${
                  order.status === "保留中" && "text-orange-600"
                } ${order.status === "支払い済み" && "text-green-600"} ${
                  order.status === "キャンセル" && "text-rose-600"
                }`}
              >
                {order.status}
              </div>
            </div>
            <div className="mt-2 flex items-center gap-5 text-sm">
              <div className="text-sm">注文日時：</div>
              <div>{order.createdAt.toLocaleString("ja-JP")}</div>
            </div>
          </div>
          <OrderHistoryCard order={order} />
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetailPage;
