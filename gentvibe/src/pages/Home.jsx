import React from 'react'
import { BsPerson } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import ProductSlider from '../components.jsx/slider/Productslider';
import Products from './Nonauth/Products';



const Home = () => {
    const navigate=useNavigate()
  return (
    <div>
        <header>
             <nav className="bg-white text-white px-6 py-4 flex items-center justify-between overflow-hidden">
      <div className="text-2xl font-bold text-amber-900">MENS HUB</div>

      <ul className="hidden md:flex gap-8 text-lg">
        <li className="hover:text-blue-400 cursor-pointer text-amber-900">Home</li>
        <li className="hover:text-blue-400 cursor-pointer text-amber-900">Products</li>
        <li className="hover:text-blue-400 cursor-pointer text-amber-900">About</li>
        <li className="hover:text-blue-400 cursor-pointer text-amber-900    ">Contact</li>
        <li className='mt-1 text-amber-900' onClick={()=>navigate('/login')}><BsPerson /></li>
       
      </ul>

      <button className="md:hidden text-3xl text-amber-900  ">&#9776;</button>
    </nav>
        </header>
    <section>
        <ProductSlider/>
        <Products/>
    </section>
       
       
    </div>
  )
}

export default Home