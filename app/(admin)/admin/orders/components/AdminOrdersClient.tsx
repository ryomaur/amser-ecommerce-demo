"use client";

import AdminOrderTable from "./AdminOrderTable";
import { OrderWithUser } from "../page";

interface AdminOrdersClientProps {
  orders: OrderWithUser[];
}

const AdminOrdersClient: React.FC<AdminOrdersClientProps> = ({ orders }) => {
  return (
    <section className="w-full">
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-bold">注文</h1>
      </div>

      <AdminOrderTable orders={orders} />
    </section>
  );
};

export default AdminOrdersClient;
