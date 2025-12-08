import { useFormik } from "formik";
import React, { useContext } from "react";
import axios from "axios";
import { validationschema } from "../../validation.jsx/loginschema";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { base_url } from "../../api/api";

import { Authcontext } from "../../components/Context/Authcontext";
import toast from "react-hot-toast";
const initialValues = {
  email: "",
  password: "",
};

const Login = ({onclose}) => {
  const { user, loginUser } = useContext(Authcontext);
  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/" replace />;
  }

  const navigate = useNavigate();

  const { values, handleBlur, handleSubmit, handleChange, errors } = useFormik({
    initialValues: initialValues,
    // validation schema from validation.jsx
    validationSchema: validationschema,

    onSubmit: async (values) => {
      try {
        const response = await axios.get(`${base_url}/users`);
        const users = response.data;
        const matchedUser = users.find(
          (user) =>
            user.email === values.email && user.password === values.password
        );
       
        if (matchedUser) {
          if(matchedUser.isBlock){
            toast.error("Admin is Blocked You")
            return 
          }
          toast.success("Login successful!");
          loginUser(matchedUser);
          if(onclose) onclose();
          if (matchedUser.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        } else {
          toast.error("Invalid email or password");
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
  });

  return (
    // <div className="h-screen w-screen flex justify-center items-center bg-white">
      <div className="bg-white backdrop-blur-md  p-8 rounded-2xl w-80 sm:w-96 md:w-[360px]">
       

        <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="Enter your email"
              autoComplete="off"
              className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            {errors.email && (
              <small className="text-red-500 text-sm">{errors.email}</small>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder="Enter your password"
              autoComplete="new-password"
              className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            {errors.password && (
              <small className="text-red-500 text-sm">{errors.password}</small>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    // </div>
  );
};

export default Login;
