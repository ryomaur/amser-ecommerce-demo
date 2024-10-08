"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface RevenueGraphProps {
  data: any[];
}

const RevenueGraph: React.FC<RevenueGraphProps> = ({ data }) => {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey={"name"}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `¥${value.toLocaleString()}`}
        />
        <Bar dataKey={"total"} fill="#31b0db" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RevenueGraph;
