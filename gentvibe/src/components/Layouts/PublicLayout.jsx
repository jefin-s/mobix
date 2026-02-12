import React, { useContext } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import Navbar from "../common/Navbar";
import { SearchContext } from "../Context/Searchcontext";
import { Authcontext } from "../Context/Authcontext";

const PublicLayout = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const { user } = useContext(Authcontext);
  const location = useLocation();

  
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";
  if (user && user.role === "admin") {
    return <Navigate to="/admin" replace />;
  }
  
  return (
    <div>
      {!hideNavbar && (
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      )}

      <main>
        <Outlet />
      </main>
      {/* Footer */}
<footer className="mt-10 py-6 bg-gray-100 border-t border-gray-200 text-center bg-gradient-to-b from-black via-[#050816] to-black 
    text-white">
  <p className="text-gray-600 text-sm">
    &copy; {new Date().getFullYear()} Created by <span className="font-semibold">Jefin Basheer</span>
  </p>
</footer>

    </div>
  );
};

export default PublicLayout;
