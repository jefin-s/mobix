import React, { useContext } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { OrderContext } from "../context/Oredercontext";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#ff4d4d"];

const Orderstatuschart = () => {
  const { orders } = useContext(OrderContext);

  const statusCount = orders.reduce((acc, order) => {
    const key = order.status || "Unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const chartData = [
    { name: "Pending", value: statusCount["Pending"] || 0 },
    { name: "Processing", value: statusCount["Processing"] || 0 },
    { name: "Shipping", value: statusCount["Shipping"] || 0 },
    { name: "Delivered", value: statusCount["Delivered"] || 0 },
    { name: "Cancelled", value: statusCount["Cancelled"] || 0 },
  ];

  return (
    <div className="bg-white p-6 shadow-lg rounded-xl flex flex-col items-center w-full">
      <h2 className="text-xl font-bold mb-6 text-center">Order Status Overview</h2>

      {/* Responsive Container for full width */}
      <div className="w-full h-64 sm:h-80 md:h-96 flex justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius="50%"
              outerRadius="80%"
              paddingAngle={5}
              dataKey="value"
              // Removed the label prop here
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Orderstatuschart;
