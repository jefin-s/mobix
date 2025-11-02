import { useFormik } from "formik";
import React from "react";
import { validationschema } from "../../validation.jsx/loginschema";
import { Link, useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();

  const { values, handleBlur, handleSubmit, handleChange, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: validationschema,
    onSubmit: (values) => {
      const storeduserData = JSON.parse(localStorage.getItem("user"));
      if (!storeduserData) {
        alert("User not found! Please register first.");
        return;
      }
      if (
        storeduserData.email === values.email &&
        storeduserData.password === values.password
      ) {
        alert("Login successfully!");
        navigate("/");
      } else {
        alert("Invalid email or password.");
      }
    },
  });

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-white">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl p-8 rounded-2xl w-[360px] border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6 text-black tracking-wide">
          Welcome 
        </h2>

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
              autoComplete="off"
              placeholder="Enter your email"
              className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
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
              autoComplete="new-password  "
              placeholder="Enter your password"
              className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            />
            {errors.password && (
              <small className="text-red-500 text-sm">{errors.password}</small>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Footer */}
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
    </div>
  );
};

export default Login;
