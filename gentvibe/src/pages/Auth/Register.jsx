import { useFormik } from "formik";
import React from "react";
import { registerSchema } from "../../validation.jsx/registerschema";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log(values);
      localStorage.setItem("user", JSON.stringify(values));
      navigate('/login')
    },
  });

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl p-8 rounded-2xl w-[360px] border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6 text-black tracking-wide">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="text-sm text-gray-700 font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              placeholder="Enter your name"
              autoComplete="off"
              className="mt-1 w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            />
            {errors.name && (
              <small className="text-red-500 text-sm">{errors.name}</small>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="text-sm text-gray-700 font-medium"
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
              className="mt-1 w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            />
            {errors.email && (
              <small className="text-red-500 text-sm">{errors.email}</small>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="text-sm text-gray-700 font-medium"
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
              className="mt-1 w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            />
            {errors.password && (
              <small className="text-red-500 text-sm">{errors.password}</small>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            onClick={() => navigate("/login")}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <span
            
            className="text-indigo-600 font-medium hover:underline cursor-pointer"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
