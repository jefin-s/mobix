import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useTopUsers } from "./Topuser";

const TopUsersChart = () => {
  const data = useTopUsers();

  return (
    <div className="bg-white p-6 shadow-lg rounded-xl">
      <h2 className="text-xl font-bold mb-4">Top Users by Purchased Items</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" type="category" />
          <YAxis type="number" />
          <Tooltip />
          <Bar dataKey="value" fill="#82ca9d" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopUsersChart;
