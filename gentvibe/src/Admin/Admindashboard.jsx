import React, { useContext, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom';
import { Authcontext } from '../components.jsx/Context/Authcontext';
import { HiMenu } from "react-icons/hi";
import { FaUsers, FaBoxOpen, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";

const Admindashboard = ({children}) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logoutUser } = useContext(Authcontext);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden ${sidebarOpen ? "block" : "hidden"}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-[#0D1B2A] text-white p-6 flex flex-col justify-between transform transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div>
          <h2 className="text-2xl font-bold mb-12 text-center">
            {user.name ? user.name.toUpperCase() : "WAIT"}
          </h2>
          <nav className="flex flex-col gap-5">
            <button className="flex items-center gap-3 px-3 py-2 rounded hover:bg-amber-500 hover:text-white transition" onClick={() => navigate("userlist")}>
              <FaUsers className="w-6 h-6" /> Users
            </button>
            <button className="flex items-center gap-3 px-3 py-2 rounded hover:bg-amber-500 hover:text-white transition" onClick={() => navigate("allproducts")}>
              <FaBoxOpen className="w-6 h-6" /> Products
            </button> 
            <button className="flex items-center gap-3 px-3 py-2 rounded hover:bg-amber-500 hover:text-white transition" onClick={() => navigate("userorder")}>
              <FaShoppingCart className="w-6 h-6" /> Orders
            </button>
          </nav>
        </div>
        <button className="flex items-center gap-3 px-3 py-2 rounded hover:bg-red-500 hover:text-white transition" onClick={logoutUser}>
          <FaSignOutAlt className="w-5 h-5" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Topbar for mobile */}
        <div className="lg:hidden flex items-center justify-between bg-white p-4 shadow">
          <HiMenu className="text-2xl text-gray-700 cursor-pointer" onClick={() => setSidebarOpen(true)} />
          <FaSignOutAlt className="h-5 w-5 cursor-pointer" onClick={logoutUser} />
        </div>

        {/* ✅ Add Outlet here to render nested admin pages */}
        <div className="p-6 flex-1">
         <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default Admindashboard;
