import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "../Context/Authcontext";
import { BsPerson } from "react-icons/bs";
import { FaShoppingCart, FaApple, FaHeart, FaRegHeart } from "react-icons/fa";
import { CartContext } from "../Context/Cartcontext";
import { Wishcontext } from "../Context/Wishcontext";
import LoginModal from "../../Modal/LoginModal";
import { useFetch } from "../../hooks/Usefetch";
import { base_url } from "../../api/api";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const { data = [] } = useFetch(`${base_url}/products`);
  const [isOpens, setIsOpens] = useState(false);
  const { user, logoutUser } = useContext(Authcontext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { cart, totalQuantity } = useContext(CartContext);
  const { wishlist } = useContext(Wishcontext);

  const [suggestion, setSuggestion] = useState([]);

const searchTermchange = (e) => {
  const value = e.target.value;
  setSearchTerm(value);

  const products = data?.data?.items || [];

  if (value.length > 0) {
    const suggestedproducts = products
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
    <header
      className="w-full fixed top-0 left-0 right-0 z-50 
      bg-black/80 backdrop-blur-md 
      
      shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
    >
      <nav className="px-8 py-4 flex items-center justify-between relative text-white">

        {/* LOGO */}
        <div
          className="text-3xl cursor-pointer hover:scale-110 transition duration-300"
          onClick={() => navigate("/")}
        >
          <FaApple />
        </div>

        {/* SEARCH */}
        <div className="flex-1 flex justify-center mx-4 relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={searchTermchange}
            className="w-full md:w-96 
            px-5 py-2.5 
            bg-white/10 
            backdrop-blur-md 
            border border-white/20 
            rounded-full 
            text-white 
            placeholder-gray-400 
            text-sm 
            focus:outline-none 
            focus:ring-2 focus:ring-white/40 
            transition duration-300"
          />

          {/* Suggestions */}
          {suggestion.length > 0 && (
            <ul className="absolute top-full mt-3 w-full md:w-96 
              bg-black/95 backdrop-blur-lg 
              border border-white/10 
              rounded-xl overflow-hidden z-50">

              {suggestion.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 px-4 py-3 
                  hover:bg-white/10 cursor-pointer transition"
                  onClick={() => {
                    setSearchTerm(item.title);
                    setSuggestion([]);
                    navigate("/prdctpage");
                  }}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-10 w-10 rounded-md object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-gray-400">
                      in {item.category}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-8 text-sm items-center">

          <li
            className="cursor-pointer text-gray-300 hover:text-white transition"
            onClick={() => navigate("/")}
          >
            Home
          </li>

          <li
            className="cursor-pointer text-gray-300 hover:text-white transition"
            onClick={() => navigate("/prdctpage")}
          >
            Products
          </li>

          <li
            className="cursor-pointer text-gray-300 hover:text-white transition"
            onClick={() => navigate("/order")}
          >
            My Orders
          </li>

          <li
            className="cursor-pointer text-gray-300 hover:text-white transition"
            onClick={() => navigate("/about")}
          >
            About
          </li>

          {/* CART */}
          <div
            className="relative cursor-pointer hover:scale-110 transition"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart className="text-xl text-gray-300 hover:text-white" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 
              bg-gradient-to-r from-red-500 to-pink-500 
              text-white text-xs font-semibold 
              rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                {totalQuantity}
              </span>
            )}
          </div>

          {/* WISHLIST */}
          <li
            className="cursor-pointer hover:scale-110 transition"
            onClick={() => navigate("/wish")}
          >
            {wishlist.length > 0 ? (
              <FaHeart className="text-red-500 text-lg" />
            ) : (
              <FaRegHeart className="text-gray-400 hover:text-white text-lg transition" />
            )}
          </li>

          {/* AUTH */}
          {!user ? (
            <li
              className="cursor-pointer text-gray-300 hover:text-white transition"
              onClick={() => setIsOpens(!isOpens)}
            >
              <BsPerson />
            </li>
          ) : (
            <button
              onClick={logoutUser}
              className="text-gray-300 hover:text-red-500 transition"
            >
              Logout
            </button>
          )}

          <LoginModal
            isOpen={isOpens}
            onClose={() => setIsOpens(false)}
          />

          <li className="text-sm font-semibold text-white">
            {user ? user.name : ""}
          </li>
        </ul>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </nav>

      {/* MOBILE MENU */}
      {isOpen && (
        <ul className="md:hidden flex flex-col 
          bg-black/95 backdrop-blur-lg 
          border-t border-white/10 
          px-6 py-6 gap-4 text-white">

          <li onClick={() => {navigate("/"); setIsOpen(false);}} className="hover:bg-white/10 px-3 py-2 rounded-lg cursor-pointer">
            Home
          </li>

          <li onClick={() => {navigate("/prdctpage"); setIsOpen(false);}} className="hover:bg-white/10 px-3 py-2 rounded-lg cursor-pointer">
            Products
          </li>

          <li onClick={() => {navigate("/order"); setIsOpen(false);}} className="hover:bg-white/10 px-3 py-2 rounded-lg cursor-pointer">
            Orders
          </li>

          <li onClick={() => {navigate("/about"); setIsOpen(false);}} className="hover:bg-white/10 px-3 py-2 rounded-lg cursor-pointer">
            About
          </li>

          {user ? (
            <li
              onClick={logoutUser}
              className="bg-gradient-to-r from-red-500 to-red-600 
              px-3 py-2 rounded-lg text-center cursor-pointer"
            >
              Logout
            </li>
          ) : (
            <li
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-blue-500 to-blue-600 
              px-3 py-2 rounded-lg text-center cursor-pointer"
            >
              Login
            </li>
          )}
        </ul>
      )}
    </header>
  );
};

export default Navbar;
