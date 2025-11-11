  import React, { Children, useContext, useState } from 'react'
  import { Authcontext } from '../Context/Authcontext'
  import { Navigate, Outlet, useLocation } from 'react-router-dom'
  import Login from '../../pages/Auth/Login'
import Navbar from '../common/Navbar'
import LoginModal from '../../Modal/LoginModal'
  

  const PrivateLayout = () => {
      const{user}=useContext(Authcontext)
      const[isLogin,setIslogin]=useState(!user)
  
      if (!user) {
              return <LoginModal isOpen={isLogin} onClose={() => setIslogin(false)} />  
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