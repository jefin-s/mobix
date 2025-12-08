import React, { useContext, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom';
import { Authcontext } from '../components/Context/Authcontext';
import { HiMenu } from "react-icons/hi";
import { FaUsers, FaBoxOpen, FaShoppingCart, FaSignOutAlt, FaChevronRight } from "react-icons/fa";

const Admindashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { user, logoutUser } = useContext(Authcontext);

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 flex flex-col
                    transition-all duration-300 ease-in-out lg:translate-x-0 shadow-xl
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    ${isExpanded ? "w-64" : "w-20"}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Top Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 p-2">
            <div className="h-10 w-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-white">
                {user.name?.charAt(0).toUpperCase() || 'A'}
              </span>
            </div>
            {isExpanded && (
              <div className="overflow-hidden">
                <h2 className="font-semibold text-white truncate">{user.name || "Admin"}</h2>
                <p className="text-xs text-gray-300 truncate">Administrator</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          <button
            onClick={() => navigate("userlist")}
            className="flex items-center gap-4 w-full p-3 rounded-lg hover:bg-gray-700/50 hover:translate-x-1 transition-all group"
          >
            <FaUsers className="w-5 h-5 flex-shrink-0" />
            {isExpanded && (
              <>
                <span className="flex-1 text-left">Users</span>
                <FaChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </>
            )}
          </button>
          
          <button
            onClick={() => navigate("allproducts")}
            className="flex items-center gap-4 w-full p-3 rounded-lg hover:bg-gray-700/50 hover:translate-x-1 transition-all group"
          >
            <FaBoxOpen className="w-5 h-5 flex-shrink-0" />
            {isExpanded && (
              <>
                <span className="flex-1 text-left">Products</span>
                <FaChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </>
            )}
          </button>
          
          <button
            onClick={() => navigate("userorder")}
            className="flex items-center gap-4 w-full p-3 rounded-lg hover:bg-gray-700/50 hover:translate-x-1 transition-all group"
          >
            <FaShoppingCart className="w-5 h-5 flex-shrink-0" />
            {isExpanded && (
              <>
                <span className="flex-1 text-left">Orders</span>
                <FaChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </>
            )}
          </button>
        </nav>

        {/* Logout */}
        <button
          onClick={logoutUser}
          className="flex items-center gap-4 w-full p-3 rounded-lg hover:bg-red-600/20 hover:text-red-300 mt-4 border-t border-gray-700 pt-4 group"
        >
          <FaSignOutAlt className="w-5 h-5 flex-shrink-0" />
          {isExpanded && <span className="flex-1 text-left">Logout</span>}
        </button>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isExpanded ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-white border-b px-4 py-3 flex items-center justify-between shadow-sm">
          <HiMenu 
            className="w-6 h-6 text-gray-700 cursor-pointer hover:text-amber-500" 
            onClick={() => setSidebarOpen(true)} 
          />
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">{user.name}</span>
            <FaSignOutAlt 
              className="w-5 h-5 text-gray-600 cursor-pointer hover:text-red-500" 
              onClick={logoutUser} 
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Admindashboard;