import React, { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts";

import { OrderContext } from "../context/Oredercontext";
import { useTopUsersFromOrders } from "./Topuser";



const TopUsersChart = () => {
    const { orders } = useContext(OrderContext);
    const  data=useTopUsersFromOrders(orders)



  return (
    <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
      
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
                border: "1px solid #ddd"
              }}
            />

            <Bar
              dataKey="value"
              barSize={40}
              radius={[6, 6, 0, 0]}
            >
              {data.map((entry, index) => {
                let color = "#4ade80"; // Green

                if (entry.value < 80 && entry.value >= 60)
                  color = "#facc15"; // Yellow
                else if (entry.value < 60 && entry.value >= 40)
                  color = "#f97316"; // Orange
                else if (entry.value < 40)
                  color = "#ef4444"; // Red

                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Bar>

          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopUsersChart;