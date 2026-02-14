import { useFormik } from "formik";
import React, { useContext } from "react";
import axios from "axios";
import { registerSchema } from "../../validation.jsx/registerschema";
import { Navigate, useNavigate } from "react-router-dom";
import { base_url } from "../../api/api";
import toast from "react-hot-toast";
import { Authcontext } from "../../components/Context/Authcontext";

const initialValues = {
 
  email: "",
  password: "",
  username:"",
  phoneNumber:""
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
  console.log("Submitting form", values);

  try {
    const newUser = {
      // name: values.name,
      email: values.email,
      password: values.password,
      username: values.username,
      phoneNumber:values.phoneNumber
    };

    console.log("Sending request to:", `${base_url}/auth/register`);
    console.log("Payload:", newUser);

    const res = await axios.post(`${base_url}/auth/register`, newUser);

    console.log("Response:", res);

    toast.success("Register Successfully");
    navigate("/login");

  } catch (error) {
    console.log("Register error:", error);
    toast.error(error.response.data.message);
  }
}

,
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

       {/* USERNAME */}
<div>
  <label className="text-sm text-gray-300 font-medium">
    Username
  </label>

  <input
    type="text"
    name="username"
    onChange={handleChange}
    onBlur={handleBlur}
    value={values.username}
    placeholder="Enter your username"
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

  {errors.username && (
    <small className="text-red-400 text-sm">{errors.username}</small>
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
        {/* PHONE NUMBER */}
<div>
  <label className="text-sm text-gray-300 font-medium">
    Phone Number
  </label>

  <input
    type="text"
    name="phoneNumber"
    onChange={handleChange}
    onBlur={handleBlur}
    value={values.phoneNumber}
    placeholder="Enter phone number"
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

  {errors.phoneNumber && (
    <small className="text-red-400 text-sm">{errors.phoneNumber}</small>
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
