import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Usercontext } from "./context/Userscontext";
import { OrderContext } from "./context/Oredercontext";
import { ProductContext } from "./Productcontext";


const Dashboard = () => {
  const { users } = useContext(Usercontext);
  const{orders}=useContext(OrderContext)
  const{products}=useContext(ProductContext)
  
  
  
  

  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-[#0D1B2A] text-white p-6 transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-10">Devias</h2>
        <ul className="space-y-4 text-lg">
          {[
            "Overview",
            "Customers",
            "Companies",
            "Account",
            "Settings",
            "Login",
            "Register",
            "Error",
          ].map((item) => (
            <li
              key={item}
              className="cursor-pointer hover:text-gray-300 p-3 rounded-lg bg-white/10"
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Top bar for mobile */}
        <div className="lg:hidden flex items-center justify-between bg-white p-4 shadow">
          <button
            className="text-2xl text-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <HiMenu />
          </button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>

        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              className="p-5 bg-white rounded-xl shadow-md"
              onClick={() => {
                navigate("/userlist");
              }}
            >
              <h3 className="text-gray-500 text-sm">TOTAL CUSTOMERS</h3>
              <p className="text-3xl font-bold">{users.length}</p>
              <p className="text-red-500 text-sm">-18% Since last month</p>
            </div>
          

            <div className="p-5 bg-white rounded-xl shadow-md" onClick={()=>{navigate('/allproducts')}}>
              <h3 className="text-gray-500 text-sm">products</h3>
              <p className="text-3xl font-bold">{products.length}</p>
              <div className="w-full h-2 bg-gray-200 rounded mt-2">
                <div className="w-3/4 h-2 bg-blue-500 rounded"></div>
              </div>
            </div>
              <div className="p-5 bg-white rounded-xl shadow-md" onClick={()=>{navigate('/userorder')}}>
              <h3 className="text-gray-500 text-sm">Total order</h3>
              <p className="text-3xl font-bold">{orders.length}</p>
              <p className="text-green-500 text-sm">+12% Since last month</p>
            </div>
            <div className="p-5 bg-white rounded-xl shadow-md">
              <h3 className="text-gray-500 text-sm">TOTAL PROFIT</h3>
              <p className="text-3xl font-bold">$15k</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            {/* Bar Chart Placeholder */}
            <div className="col-span-1 lg:col-span-2 bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between">
                <h3 className="text-xl font-semibold">Sales</h3>
                <button className="text-gray-400 text-sm">Sync</button>
              </div>
              <div className="h-64 mt-6 flex items-end space-x-3">
                {[10, 20, 40, 35, 50, 75, 40, 60, 80, 90, 70, 95].map(
                  (h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className="w-5 bg-blue-200 rounded-md"
                    ></div>
                  )
                )}
              </div>
            </div>

            {/* Donut Chart Placeholder */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Traffic Source</h3>
              <div className="flex justify-center items-center h-48">
                <div className="w-36 h-36 border-18 border-blue-500 rounded-full border-t-orange-400 border-b-green-400"></div>
              </div>
              <div className="flex justify-around mt-6 text-sm">
                <div>
                  <p className="font-semibold">Desktop</p>
                  <p className="text-gray-500">63%</p>
                </div>
                <div>
                  <p className="font-semibold">Tablet</p>
                  <p className="text-gray-500">15%</p>
                </div>
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-gray-500">22%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
