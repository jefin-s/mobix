            import React, { children, useContext } from 'react'
            import { Authcontext } from '../Context/Authcontext'
            import { Navigate, Outlet } from 'react-router-dom'
    import Admindashboard from '../../Admin/Admindashboard'

            const AdminLayout = () => {
                
                const {user,loading}=useContext(Authcontext)
                  if (loading) {
    return <div className="p-8 text-center text-lg">Loading...</div>;
                  }
  
                if(!user){
                    return  <Navigate to='/' replace/>
                }
                if(user.role!=="admin"){
                    return <Navigate to='/' replace/>
                }
                return <Admindashboard/>
              
        
            }

            export default AdminLayout