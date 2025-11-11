    import React, { children, useContext } from 'react'
    import { Authcontext } from '../Context/Authcontext'
    import { Navigate, Outlet } from 'react-router-dom'

    const AdminLayout = ({children}) => {
        const {user}=useContext(Authcontext)
        if(!user){
            return  <Navigate to='/login' replace/>
        }
        if(user.role!=="admin"){
            return <Navigate to='/' replace/>
        }
    return <Outlet/>;
    }

    export default AdminLayout