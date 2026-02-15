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
  if (user?.role?.toLowerCase() === "admin") {
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

    const response = await axios.post(
      `${base_url}/auth/login`,
      values,
      { withCredentials: true }
    );

    const data = response.data;

    toast.success("Login successful!");

    loginUser(
      data.users || data.Users,
      data.accessToken || data.AccessToken
    );

    if (onclose) onclose();

    const role =
      (data.users || data.Users)?.role?.toLowerCase()?.trim();

    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }

  } catch (error) {

    const message =
      error?.response?.data?.message ||
      "Invalid email or password";

    toast.error(message);
  }
}





});
return (
  <div className="w-full">

    <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">

      {/* Email */}
      <div>
        <label className="block text-sm text-gray-300 mb-1">
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
          className="
          w-full
          bg-white/5
          border border-white/10
          rounded-xl
          p-3
          text-white
          placeholder-gray-500
          focus:outline-none
          focus:border-blue-500
          focus:bg-white/10
          transition
          "
        />

        {errors.email && (
          <small className="text-red-400 text-sm">{errors.email}</small>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm text-gray-300 mb-1">
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
          className="
          w-full
          bg-white/5
          border border-white/10
          rounded-xl
          p-3
          text-white
          placeholder-gray-500
          focus:outline-none
          focus:border-blue-500
          focus:bg-white/10
          transition
          "
        />

        {errors.password && (
          <small className="text-red-400 text-sm">{errors.password}</small>
        )}
      </div>

      {/* Button */}
      <button
        type="submit"
        className="
        w-full
        bg-gradient-to-r from-blue-600 to-blue-500
        hover:from-blue-500 hover:to-blue-400
        text-white
        py-3
        rounded-xl
        font-semibold
        shadow-lg
        transition
        "
      >
        Login
      </button>

    </form>

    {/* Register Link */}
    <p className="text-center text-gray-400 text-sm mt-6">
      Don’t have an account?{" "}
      <Link
        to="/register"
        className="text-blue-400 font-medium hover:text-blue-300 transition"
      >
        Register here
      </Link>
    </p>

  </div>
);

};

export default Login;
