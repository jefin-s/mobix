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

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const[isOpens,setIsOpens]=useState(false)
  const { user, logoutUser } = useContext(Authcontext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { cart, totalQuantity } = useContext(CartContext);
  const { whishlist } = useContext(Wishcontext);

  return (
   <header className="w-full shadow-sm fixed top-0 left-0 right-0 z-50 bg-white">

      {/* NAVBAR TOP */}
      <nav className="bg-white px-4 py-3 flex items-center justify-between relative">
        {/* LOGO */}
        <div
          className="text-2xl font-bold text-black cursor-pointer"
          onClick={() => navigate("/")}
        >
          icloud
        </div>

        {/* SEARCH BAR (visible on mobile + desktop) */}
        <div className="flex-1 flex justify-center md:justify-center mx-2">
          <input
            type="text"
            placeholder="Search your products"
            className="w-full md:w-96 max-w-[250px] md:max-w-none px-3 py-1.5 border border-gray-400 rounded-full text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm transition duration-200"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </div>

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
              className="text-black cursor-pointer"
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
  isOpen={isOpens}              // pass the state
  onClose={() => setIsOpens(false)} // function to close modal
/>

          <li className="text-black">{user ? user.name : ""}</li>
        </ul>
      </nav>

      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <ul className="md:hidden flex flex-col bg-white px-6 py-4 gap-4 text-lg border-t absolute left-0 right-0 z-50">
          <li className="cursor-pointer" onClick={() => navigate("/")}>
            Home
          </li>
          <li
            className="cursor-pointer bg-teal-100 w-max px-3 py-1 rounded-lg"
            onClick={logoutUser}
          >
            Logout
          </li>
          <li
            className="cursor-pointer"
            onClick={() => navigate("/prdctpage")}
          >
            Products
          </li>
          <li
            className="cursor-pointer"
            onClick={() => navigate("/about")}
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
            onClick={() => navigate("/wish")}
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
