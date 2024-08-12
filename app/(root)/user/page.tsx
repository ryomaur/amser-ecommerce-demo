import React from "react";
import type { Metadata } from "next";
import UserInfo from "./components/UserInfo";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import getUserOrders from "@/actions/getUserOrders";
import prisma from "@/lib/db";

export const metadata: Metadata = {
  title: "マイアカウント | Amser",
  description: "ユーザー情報ページ",
};

const UserPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const orders = await getUserOrders(session);

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="main-container mt-14 md:min-h-[55vh]">
      <UserInfo user={user} orders={orders} />
    </div>
  );
};

export default UserPage;
