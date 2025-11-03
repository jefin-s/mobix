import React from 'react'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Productcard from './components.jsx/common/Productcard'
import Products from './pages/Nonauth/Products'

const App = () => {
  return (
    
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/prodcrd' element={<Productcard/>}/>
        <Route path='prdctpage' element={<Products/>}/>


      </Routes>
      
    
    </div>
  )
}

export default App