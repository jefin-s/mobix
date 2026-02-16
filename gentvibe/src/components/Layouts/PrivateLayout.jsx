// import React, { Children, useContext, useState } from "react";
// import { Authcontext } from "../Context/Authcontext";
// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import Login from "../../pages/Auth/Login";
// import Navbar from "../common/Navbar";
// import LoginModal from "../../Modal/LoginModal";

// const PrivateLayout = () => {
//   const { user } = useContext(Authcontext);
//   const [isLogin, setIslogin] = useState(!user);

//   if (!user) {
//     return <LoginModal isOpen={isLogin} onClose={() => setIslogin(false)} />;
//   }
//   if (user.role === "admin") {
//     return <Navigate to="/admin" replace />;
//   }

//   return (
//     <div>
//       <Navbar />
//       <main>
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default PrivateLayout;

import React, { useContext } from "react";
import { Authcontext } from "../Context/Authcontext";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";

const PrivateLayout = () => {

  const { user, loading } = useContext(Authcontext);

  // Wait until auth loads
  if (loading) {
    return null; 
  }

  // If not logged in → redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;
