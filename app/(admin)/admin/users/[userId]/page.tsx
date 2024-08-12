import prisma from "@/lib/db";
import React from "react";
import { notFound } from "next/navigation";

interface AdminUserDetailPageProps {
  params: {
    userId: string;
  };
}

const AdminUserDetailPage: React.FC<AdminUserDetailPageProps> = async ({
  params,
}) => {
  const user = await prisma.user.findUnique({
    where: {
      id: params.userId,
    },
    select: {
      id: true,
      username: true,
      email: true,
      isAdmin: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="mx-auto w-full rounded-lg bg-transparent px-20 py-12 shadow-none">
          <h1 className="text-xl font-bold text-foreground">ユーザーの詳細</h1>
          <div className="my-7 flex flex-col gap-2 font-medium text-foreground/90">
            <div className="flex items-center gap-5 text-sm">
              <div className="text-sm">ユーザーID：</div>
              <div>{user.id}</div>
            </div>
            <div className="flex items-center gap-5 text-sm">
              <div className="text-sm">ユーザーネーム：</div>
              <div>{user.username}</div>
            </div>
            <div className="flex items-center gap-5 text-sm">
              <div className="text-sm">メールアドレス：</div>
              <div>{user.email}</div>
            </div>
            <div className="flex items-center gap-5 text-sm">
              <div className="text-sm">登録日時：</div>
              <div>{user.createdAt.toLocaleString("ja-JP")}</div>
            </div>
            <div className="flex items-center gap-5 text-sm">
              <div className="text-sm">更新日時：</div>
              <div>{user.updatedAt.toLocaleString("ja-JP")}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetailPage;
