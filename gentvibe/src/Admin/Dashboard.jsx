import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { FaUsers, FaBoxOpen, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { Authcontext } from "../components/Context/Authcontext";
import { Usercontext } from "./context/Userscontext";
import { OrderContext } from "./context/Oredercontext";
import { ProductContext } from "./Productcontext";
import Orderstatuschart from "./charts/Orderstatuschart";
import TopUsersChart from "./charts/TopUsersChart";
import Admindashboard from "./Admindashboard";

const Dashboard = () => {
  const { user, logoutUser } = useContext(Authcontext);
  const { users } = useContext(Usercontext);
  const { orders, totalrevenue } = useContext(OrderContext);
  const { products,totalRecords } = useContext(ProductContext);
 

  return (
    <div>
    
   <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-yellow-300">
            <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-gray-400 text-sm">TOTAL CUSTOMERS</h3>
              <p className="text-3xl font-bold">{users.length}</p>
              <p className="text-red-500 text-sm">-18% Since last month</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-gray-400 text-sm">PRODUCTS</h3>
              <p className="text-3xl font-bold">{totalRecords}</p>
              <div className="w-full h-2 bg-gray-200 rounded mt-2">
                <div className="w-3/4 h-2 bg-blue-500 rounded"></div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-gray-400 text-sm">TOTAL ORDERS</h3>
              <p className="text-3xl font-bold">{orders.length}</p>
              <p className="text-green-500 text-sm">+12% Since last month</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-gray-400 text-sm">TOTAL PROFIT</h3>
              <p className="text-3xl font-bold">${totalrevenue}</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="flex flex-col gap-5">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-gray-500 font-bold mb-4">Top Users</h3>
              <TopUsersChart />
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-gray-500 font-bold mb-4">Order Status</h3>
              <Orderstatuschart />
            </div>
          </div>
        </div>
        </div>
    
  );
};

export default Dashboard;
