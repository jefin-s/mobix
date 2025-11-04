import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../common/Navbar'
import { SearchContext } from '../Context/Searchcontext'

const PublicLayout = () => {
  const{searchTerm,setSearchTerm}= useContext(SearchContext)
  return (
    <div>

        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <main>
            <Outlet/>
        </main>
    </div>
  )
}

export default PublicLayout