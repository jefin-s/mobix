import React, { useContext } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../common/Navbar'
import { SearchContext } from '../Context/Searchcontext'

const PublicLayout = () => {
  const{searchTerm,setSearchTerm}= useContext(SearchContext)
  const location=useLocation()
  const  hideNavbar=location.pathname==='/login'||location.pathname==='/register'
  return (
    <div>

        {!hideNavbar&&(<Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />)}
        <main>
            <Outlet/>
        </main>
    </div>
  )
}

export default PublicLayout