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

  
  return (
    <div>
      {!hideNavbar && (
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      )}

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
