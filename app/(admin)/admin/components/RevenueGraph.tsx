"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface RevenueGraphProps {
  data: any[];
}

const RevenueGraph: React.FC<RevenueGraphProps> = ({ data }) => {
  return (
    <div className="overflow-x-scroll">
      <ResponsiveContainer
        width={"100%"}
        // width={200}
        minWidth={500}
        height={350}
      >
        <BarChart data={data}>
          <XAxis
            dataKey={"name"}
            stroke="#888888"
            // fontSize={12}
            tickLine={false}
            axisLine={false}
            className="text-[10px] md:text-xs"
          />
          <YAxis
            stroke="#888888"
            // fontSize={12}
            tickLine={false}
            axisLine={false}
            className="text-[10px] md:text-xs"
            tickFormatter={(value) => `¥${value.toLocaleString()}`}
          />
          <Bar dataKey={"total"} fill="#31b0db" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueGraph;
