import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "../Context/Authcontext";
import { BsPerson } from "react-icons/bs";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const { user, logoutUser } = useContext(Authcontext);

  const navigate = useNavigate();
  return (
    <header>
      <nav className="bg-white text-white px-6 py-4 flex items-center justify-between overflow-hidden">
        <div className="text-2xl font-bold text-black ml-5">icloud</div>
        <div>
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full md:w-96 px-4 py-2 border border-black rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-grey-500 placeholder-gray-400 shadow-sm transition duration-200"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </div>
        <ul className="hidden md:flex gap-8 text-lg">
          <li className="hover:text-blue-400 cursor-pointer text-amber-900">
            Home
          </li>
          <li>
            <button
              onClick={logoutUser}
              className="text-black bg-teal-100 p-1 rounded-2xl"
            >
              Logout
            </button>
          </li>
          <li className="hover:text-blue-400 cursor-pointer text-amber-900">
            Products
          </li>
          <li className="hover:text-blue-400 cursor-pointer text-amber-900">
            About
          </li>
          <li className="hover:text-blue-400 cursor-pointer text-amber-900 ">
            Contact
          </li>
          <li
            className="mt-1 text-amber-900"
            onClick={() => navigate("/login")}
          >
            <BsPerson />
          </li>
          <li className="text-black">{user ? user.name : ""}</li>
        </ul>

        <button className="md:hidden text-3xl text-amber-900  ">&#9776;</button>
      </nav>
    </header>
  );
};

export default Navbar;
