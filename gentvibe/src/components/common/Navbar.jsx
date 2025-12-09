import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "../Context/Authcontext";
import { BsPerson } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CartContext } from "../Context/Cartcontext";
import { Wishcontext } from "../Context/Wishcontext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import LoginModal from "../../Modal/LoginModal";
import { useFetch } from "../../hooks/Usefetch";
import { base_url } from "../../api/api";
import { FaApple } from "react-icons/fa";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const { data } = useFetch(`${base_url}/products`);
  const [isOpens, setIsOpens] = useState(false);
  const { user, logoutUser } = useContext(Authcontext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { cart, totalQuantity } = useContext(CartContext);
  const { whishlist } = useContext(Wishcontext);

  // logic for auto suggestion at the time of searching an inoi
  const [suggestion, setSuggestion] = useState([]);
  const searchTermchange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      const suggestedproducts = data
        .filter((item) =>
          item.title.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5);
      setSuggestion(suggestedproducts);
    } else {
      setSuggestion([]);
    }
  };

  return (
    <header className="w-full  fixed top-0 left-0 right-0 z-50 bg-white">
      {/* NAVBAR TOP */}
      <nav className="bg-white px-4 py-3 flex items-center justify-between relative">
        {/* LOGO */}
        <div
          className="text-2xl font-bold text-black cursor-pointer"
          onClick={() => navigate("/")}
        >
          <FaApple />
        </div>

        {/* SEARCH BAR (visible on mobile + desktop) */}
        <div className="flex-1 flex justify-center md:justify-center mx-2">
          <input
            type="text"
            placeholder="Search "
            className="w-full md:w-96 max-w-[250px] md:max-w-none px-3 py-1.5 border border-black rounded-full text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400  transition duration-200"
            onChange={(e) => searchTermchange(e)}
            value={searchTerm}
          />
        </div>
        {suggestion.length > 0 && (
  <ul className="
    absolute top-full left-0 md:left-72
    mt-2
    w-full md:w-96 max-w-[360px] 
    bg-white 
    border border-gray-200 
    rounded-sm
    z-50 overflow-hidden
  
  ">
    {suggestion.map((item) => (
      <li
        key={item.id}
        className="
          flex items-start gap-3
          px-3 py-3 
          cursor-pointer 
          hover:bg-gray-100 
          transition-all duration-200
        "
        onClick={() => {
          setSearchTerm(item.title);
          setSuggestion([]);
          navigate("/prdctpage");
        }}
      >
        {/* PRODUCT IMAGE */}
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-10 w-10 object-cover rounded-md border"
        />

        {/* TEXT */}
        <div>
          <p className="text-sm text-gray-900 font-medium">
            {item.title}
          </p>

          <p className="text-xs text-blue-600">
            in {item.category}
          </p>
        </div>
      </li>
    ))}
  </ul>
)}


        {/* HAMBURGER MENU (MOBILE) */}
        <button
          className="md:hidden text-3xl text-black ml-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-8 text-lg items-center">
          <li
            className="hover:text-blue-400 cursor-pointer text-black"
            onClick={() => navigate("/")}
          >
            Home
          </li>

          <li
            className="hover:text-blue-400 cursor-pointer text-black"
            onClick={() => navigate("/prdctpage")}
          >
            Products
          </li>
          <li
            className="cursor-pointer hover:text-blue-400"
            onClick={() => navigate("/order")}
          >
            My Orders
          </li>
          <li
            className="hover:text-blue-400 cursor-pointer text-black"
            onClick={() => navigate("/about")}
          >
            About
          </li>

          {/* CART ICON */}
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart className="text-2xl text-black" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </div>

          {/* WISHLIST ICON */}
          <li
            className="text-black cursor-pointer"
            onClick={() => navigate("/wish")}
          >
            {whishlist.length > 0 ? (
              <FaHeart className="text-red-500 text-xl" />
            ) : (
              <FaRegHeart className="text-gray-600 text-xl" />
            )}
          </li>

          {/* LOGIN / LOGOUT */}
          {!user ? (
            <li
              className="text-black cursor-pointer "
              onClick={() => setIsOpens(!isOpens)}
            >
              <BsPerson />
            </li>
          ) : (
            <button
              onClick={logoutUser}
              className="text-black rounded-md hover:text-red-500"
            >
              Logout
            </button>
          )}
          <LoginModal
            isOpen={isOpens} // pass the state
            onClose={() => setIsOpens(false)} // function to close modal
          />

          <li className="text-black font-bold">{user ? user.name : ""}</li>
        </ul>
      </nav>

      {/* MOBILE MENU DROPDOWN */}
     {isOpen && (
  <ul className="md:hidden flex flex-col bg-white shadow-xl px-6 py-4 gap-3 text-base absolute left-0 right-0 top-full z-50 border-t border-gray-100 animate-slideDown">
    <li className="border-b border-gray-100 pb-3 mb-1">
      <span className="font-semibold text-gray-800 text-sm">{user ? `Hi, ${user.name}` : "Welcome"}</span>
    </li>
    
    <li 
      className="cursor-pointer px-4 py-2.5 rounded-lg hover:bg-gray-50 active:scale-[0.98] transition-all duration-150"
      onClick={() =>{ navigate("/")
        setIsOpen(false)
      }}
    >
      <div className="flex items-center gap-3">
        
        <span>Home</span>
      </div>
    </li>
    
    <li 
      className="cursor-pointer px-4 py-2.5 rounded-lg hover:bg-gray-50 active:scale-[0.98] transition-all duration-150"
      onClick={() => {navigate("/prdctpage")
        setIsOpen(false)}}
    >
      <div className="flex items-center gap-3">
       
        <span>Products</span>
      </div>
    </li>
    
    <li 
      className="cursor-pointer px-4 py-2.5 rounded-lg hover:bg-gray-50 active:scale-[0.98] transition-all duration-150"
      onClick={() => {navigate("/about")
        setIsOpen(false)}}
    >
      <div className="flex items-center gap-3">
        
        <span>About</span>
      </div>
    </li>
    <li 
      className="cursor-pointer px-4 py-2.5 rounded-lg hover:bg-gray-50 active:scale-[0.98] transition-all duration-150"
      onClick={() => {navigate("/order")
        setIsOpen(false)}}
    >
      <div className="flex items-center gap-3">
        
        <span>Orders</span>
      </div>
    </li>
    
    <li 
      className="cursor-pointer px-4 py-2.5 rounded-lg hover:bg-gray-50 active:scale-[0.98] transition-all duration-150"
      onClick={() => {navigate("/cart")
        setIsOpen(false)}
      }
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
        
          <span>Cart</span>
        </div>
        <span className="bg-teal-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
      </div>
    </li>
    
    <li 
      className="cursor-pointer px-4 py-2.5 rounded-lg hover:bg-gray-50 active:scale-[0.98] transition-all duration-150"
      onClick={() => {navigate("/wish")
        setIsOpen(false)
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
        
          <span>Wishlist</span>
        </div>
        <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full">12</span>
      </div>
    </li>
    
    {user ? (
      <li 
        className="cursor-pointer px-4 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 active:scale-[0.98] transition-all duration-150 mt-3"
        onClick={logoutUser}

      >
        <div className="flex items-center gap-3">
          
          <span className="font-medium">Logout</span>
        </div>
      </li>
    ) : (
      <li 
        className="cursor-pointer px-4 py-2.5 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 active:scale-[0.98] transition-all duration-150 mt-3"
        onClick={() => navigate("/login")}
      >
        <div className="flex items-center gap-3">
          <BsPerson className="text-white" />
          <span className="font-medium">Login</span>
        </div>
      </li>
    )}
  </ul>
)}
    </header>
  );
};

export default Navbar;
