    //         import React, { children, useContext } from 'react'
    //         import { Authcontext } from '../Context/Authcontext'
    //         import { Navigate, Outlet } from 'react-router-dom'
    // import Admindashboard from '../../Admin/Admindashboard'

    //         const AdminLayout = () => {
                
    //             const {user,loading}=useContext(Authcontext)
    //               if (loading) {
    // return <div className="p-8 text-center text-lg">Loading...</div>;
    //               }
  
    //             if(!user){
    //                 return  <Navigate to='/' replace/>
    //             }
    //             if(user.role!=="admin"){
    //                 return <Navigate to='/' replace/>
    //             }
    //             return <Admindashboard/>
              
        
    //         }

    //         export default AdminLayout
    import React, { useContext } from "react";
import { Authcontext } from "../Context/Authcontext";
import { Navigate, Outlet } from "react-router-dom";
import Admindashboard from "../../Admin/Admindashboard";
import { OrderProvider } from "../../Admin/context/Oredercontext";

const AdminLayout = () => {

  const { user, loading } = useContext(Authcontext);

  if (loading) {
    return <div className="p-8 text-center text-lg">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role?.toLowerCase() !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
        <OrderProvider>
      <Admindashboard />
      </OrderProvider>
      {/* <Outlet /> 🔥 nested admin pages render here */}
    </div>
  );
};

export default AdminLayout;
