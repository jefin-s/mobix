import React, { Children, useContext } from 'react'
import { Authcontext } from '../Context/Authcontext'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Login from '../../pages/Auth/Login'
import Navbar from '../common/Navbar'

const PrivateLayout = () => {
    const{user}=useContext(Authcontext)
    const location =useLocation()
     if (!user) {
            return <Navigate to='/login'/>
        }
  return (
    <div>

    <Navbar/>
    <main>
        <Outlet/>
    </main>
    </div>
  )
}

export default PrivateLayout