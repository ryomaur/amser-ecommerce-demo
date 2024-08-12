import React from "react";
import DashboardCard from "./components/DashboardCard";
import prisma from "@/lib/db";
import { FaCreditCard, FaUser, FaYenSign } from "react-icons/fa6";
import RevenueGraph from "./components/RevenueGraph";

interface GraphData {
  name: string;
  total: number;
}

const getRevenueGraphData = async () => {
  const orders = await prisma.order.findMany({
    where: {
      status: "支払い済み",
    },
  });

  const monthlyRevenue: { [key: number]: number } = {};

  for (const order of orders) {
    const month = order.createdAt.getMonth();

    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + order.totalPrice;
  }

  const graphData: GraphData[] = [
    { name: "１月", total: 0 },
    { name: "２月", total: 0 },
    { name: "３月", total: 0 },
    { name: "４月", total: 0 },
    { name: "５月", total: 0 },
    { name: "６月", total: 0 },
    { name: "７月", total: 0 },
    { name: "８月", total: 0 },
    { name: "９月", total: 0 },
    { name: "１０月", total: 0 },
    { name: "１１月", total: 0 },
    { name: "１２月", total: 0 },
  ];

  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return graphData;
};

const getTotalRevenue = async () => {
  const orders = await prisma.order.findMany({
    where: {
      status: "支払い済み",
    },
  });
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

  return totalRevenue;
};

const getMonthlyRevenue = async () => {
  const today = new Date();
  const startOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const orders = await prisma.order.findMany({
    where: {
      status: "支払い済み",
      createdAt: {
        gte: startOfThisMonth,
        lte: today,
      },
    },
  });

  const totalMonthlyRevenue = orders.reduce(
    (acc, order) => acc + order.totalPrice,
    0,
  );

  return totalMonthlyRevenue;
};

const getMonthlyOrderCount = async () => {
  const today = new Date();
  const startOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const orderCount = await prisma.order.count({
    where: {
      status: "支払い済み",
      createdAt: {
        gte: startOfThisMonth,
        lte: today,
      },
    },
  });

  return orderCount;
};

const getMonthlyUserCount = async () => {
  const today = new Date();
  const startOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const userCount = await prisma.user.count({
    where: {
      createdAt: {
        gte: startOfThisMonth,
        lte: today,
      },
    },
  });

  return userCount;
};

const AdminPage = async () => {
  const monthlyRevenue = await getMonthlyRevenue();
  const monthlyOrderCount = await getMonthlyOrderCount();
  const monthlyNewUserCount = await getMonthlyUserCount();

  const totalRevenue = await getTotalRevenue();
  const totalOrderCount = await prisma.order.count({
    where: {
      status: "支払い済み",
    },
  });
  const totalUserCount = await prisma.user.count();
  const graphData = await getRevenueGraphData();

  return (
    <section className="my-7 mr-7 w-full">
      <div className="grid w-full grid-cols-3 justify-between gap-5 py-5">
        <DashboardCard
          title="今月の収益"
          icon={<FaYenSign size={28} className="text-foreground/70" />}
          content={`¥${monthlyRevenue.toLocaleString()}`}
        />
        <DashboardCard
          title="今月の注文数"
          icon={<FaCreditCard size={28} className="text-foreground/70" />}
          content={`${monthlyOrderCount.toLocaleString()}`}
        />
        <DashboardCard
          title="今月の新規ユーザー"
          icon={<FaUser size={28} className="text-foreground/70" />}
          content={`${monthlyNewUserCount.toLocaleString()}`}
        />
        <div className="col-span-3 flex w-full flex-col gap-12 rounded-lg border-2 border-foreground/30 p-8 pt-12 text-foreground shadow-sm">
          <h1 className="text-2xl font-bold">月ごとの収益</h1>
          <RevenueGraph data={graphData} />
        </div>
        <DashboardCard
          title="総収益"
          icon={<FaYenSign size={28} className="text-foreground/70" />}
          content={`¥${totalRevenue.toLocaleString()}`}
        />
        <DashboardCard
          title="総注文数"
          icon={<FaCreditCard size={28} className="text-foreground/70" />}
          content={`${totalOrderCount.toLocaleString()}`}
        />
        <DashboardCard
          title="総ユーザー数"
          icon={<FaUser size={28} className="text-foreground/70" />}
          content={`${totalUserCount.toLocaleString()}`}
        />
      </div>
    </section>
  );
};

export default AdminPage;
