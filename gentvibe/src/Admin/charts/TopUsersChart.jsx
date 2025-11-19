import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { useTopUsers } from "./Topuser";

const TopUsersChart = () => {
  const data = useTopUsers();

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
      
      {/* Top Tabs (Dummy UI — purely design) */}
      

      {/* Legend Header */}
    

      {/* Chart Section */}
      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis
              dataKey="name"
              tick={{ fill: "#374151" }}
              label={{ value: "Users", position: "insideBottom", dy: 10 }}
            />
            <YAxis
              tick={{ fill: "#374151" }}
              label={{
                value: "Purchases",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle" }
              }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                background: "#fff",
                border: "1px solid #ddd",
              }}
            />

            {/* Dynamic Colors like the sample */}
            <Bar
              dataKey="value"
              barSize={40}
              radius={[6, 6, 0, 0]}
              fill="#4ade80" // default (green)
              formatter={(entry, index) => entry}
            >
              {data.map((entry, index) => {
                let color = "#4ade80"; // Good (green)

                if (entry.value < 80 && entry.value >= 60) color = "#facc15"; // Average
                else if (entry.value < 60 && entry.value >= 40) color = "#f97316"; // Below Average
                else if (entry.value < 40) color = "#ef4444"; // WeakBack

                return <cell key={index} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopUsersChart;
