import { useFormik } from "formik";
import React, { useContext } from "react";
import axios from "axios";
import { registerSchema } from "../../validation.jsx/registerschema";
import { Navigate, useNavigate } from "react-router-dom";
import { base_url } from "../../api/api";
import toast from "react-hot-toast";
import { Authcontext } from "../../components/Context/Authcontext";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const Register = () => {
    const{user}=useContext(Authcontext)
    if(user){
      return <Navigate to='/' replace/>
    }
  const navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        const newUser = {
          name: values.name,
          email: values.email,
          password: values.password,
          role: "User",
          isBlock: false,
          cart: [],
          orders: [],
          wishlist: [],
          created_at: new Date().toISOString(),
        };
        await axios.post(`${base_url}/users`, newUser);

        toast.success("Register Succesfully")
        navigate("/login");
      } catch (error) {
        console.error("Registration failed:", error);
        toast.error("Failed to register user.");
      }
    },
  });

  return (
  <div className="
  min-h-screen w-full 
  flex justify-center items-center
  bg-gradient-to-b from-black via-[#050816] to-black
  px-4
  ">

    {/* REGISTER CARD */}
    <div className="
    w-full
    max-w-[440px]
    min-h-[460px]
    mx-auto
    flex flex-col justify-center
    bg-white/5
    backdrop-blur-xl
    border border-white/10
    rounded-2xl
    shadow-[0_0_40px_rgba(0,0,0,0.8)]
    p-8
    ">

      <h2 className="
      text-3xl font-bold text-center 
      mb-6 text-white tracking-wide
      ">
        Create Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">

        {/* NAME */}
        <div>
          <label className="text-sm text-gray-300 font-medium">
            Name
          </label>

          <input
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            placeholder="Enter your name"
            className="
            mt-1 w-full
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

          {errors.name && (
            <small className="text-red-400 text-sm">{errors.name}</small>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm text-gray-300 font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            placeholder="Enter your email"
            className="
            mt-1 w-full
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

        {/* PASSWORD */}
        <div>
          <label className="text-sm text-gray-300 font-medium">
            Password
          </label>

          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            placeholder="Enter your password"
            className="
            mt-1 w-full
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

        {/* BUTTON */}
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
          Register
        </button>

      </form>

      {/* LOGIN LINK */}
      <p className="text-center text-gray-400 text-sm mt-6">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="
          text-blue-400 font-medium 
          hover:text-blue-300 
          transition cursor-pointer
          ">
          Login here
        </span>
      </p>

    </div>

  </div>
);

};

export default Register;
