import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "../Context/Authcontext";
import { BsPerson } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CartContext } from "../Context/Cartcontext";
import { Wishcontext } from "../Context/Wishcontext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const { user, logoutUser } = useContext(Authcontext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useContext(CartContext);

  const { whishlist } = useContext(Wishcontext);

  return (
    <header className="w-full shadow-sm">
      {/* NAVBAR TOP */}
      <nav className="bg-white px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <div
          className="text-2xl font-bold text-black ml-5 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Icloud
        </div>

        {/* SEARCH BAR */}
        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full md:w-96 px-4 py-2 border border-black rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-grey-500 placeholder-gray-400 shadow-sm transition duration-200"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-8 text-lg">
          <li
            className="hover:text-blue-400 cursor-pointer text-black"
            onClick={() => navigate("/")}
          >
            Home
          </li>
          {/* <li>
            {user && (
              <button
                onClick={logoutUser}
                className="text-black  rounded-md"
              >
                Logout
              </button>
            )}
          </li> */}
          <li
            className="hover:text-blue-400 cursor-pointer text-black"
            onClick={() => navigate("/prdctpage")}
          >
            Products
          </li>
          <li className="cursor-pointer hover:text-blue-400" onClick={()=>navigate('/order')}>My orders</li>
          <li
            className="hover:text-blue-400 cursor-pointer text-black"
            onClick={() => {
              navigate("/about");
            }}
          >
            About
          </li>
          
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart className="text-2xl text-black" />

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>

          <li
            className="text-black cursor-pointer"
            onClick={() => {
              navigate("/wish");
            }}
          >
           {whishlist.length>0?<FaHeart className="text-red-500 text-xl" /> :<FaRegHeart className="text-gray-600 text-xl" />} 
          </li>
          {
            !user?
          (<li
            className="text-black cursor-pointer"
            onClick={() => navigate("/login")}
          >
            <BsPerson />
          </li>):<button
                onClick={logoutUser}
                className="text-black  rounded-md"
              >
                Logout
              </button>
           }
          <li className="text-black">{user ? user.name : ""}</li>
        </ul>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-3xl text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </nav>

      {/* SEARCH BAR MOBILE */}
      <div className="md:hidden px-6 mb-2">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full px-4 py-2 border border-black rounded-full text-gray-700 focus:outline-none"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <ul className="md:hidden flex flex-col bg-white px-6 py-4 gap-4 text-lg border-t">
          <li className="cursor-pointer" onClick={() => navigate("/")}>
            Home
          </li>
          <li
            className="cursor-pointer bg-teal-100 w-max px-3 py-1 rounded-lg"
            onClick={logoutUser}
          >
            Logout
          </li>
          <li className="cursor-pointer" onClick={() => navigate("/prdctpage")}>
            Products
          </li>
          <li
            className="cursor-pointer"
            onClick={() => {
              navigate("/about");
            }}
          >
            About
          </li>
         
          <li
            className="cursor-pointer flex items-center gap-2"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart /> Cart
          </li>
          <li
            className="cursor-pointer flex items-center gap-2"
            onClick={() => {
              navigate("/wish");
            }}
          >
            <CiHeart /> Wishlist
          </li>
          <li
            className="cursor-pointer flex items-center gap-2"
            onClick={() => navigate("/login")}
          >
            <BsPerson /> Login
          </li>
          <li className="font-semibold">{user ? user.name : ""}</li>
        </ul>
      )}
    </header>
  );
};

export default Navbar;
