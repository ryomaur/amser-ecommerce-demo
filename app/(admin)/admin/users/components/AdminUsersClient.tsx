"use client";

import AdminUserTable from "./AdminUserTable";
import { User } from "@prisma/client";

interface AdminUsersClientProps {
  users: User[];
}

const AdminUsersClient: React.FC<AdminUsersClientProps> = ({ users }) => {
  return (
    <section className="w-full">
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-bold">ユーザー</h1>
      </div>

      <AdminUserTable users={users} />
    </section>
  );
};

export default AdminUsersClient;
