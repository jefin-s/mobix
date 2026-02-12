import React from "react";
import Login from "../pages/Auth/Login";
import Modal from "react-modal";

const LoginModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}

      className="
      bg-gradient-to-b from-black via-[#050816] to-black
      border border-white/10
      backdrop-blur-xl
      rounded-2xl 
      shadow-[0_0_40px_rgba(0,0,0,0.8)]
      max-w-md w-full 
      mx-4 md:mx-auto 
      mt-20 
      p-6 md:p-8 
      relative 
      focus:outline-none
      "

      overlayClassName="
      fixed inset-0 
      bg-black/70 backdrop-blur-md 
      flex items-start justify-center 
      z-50
      "

      contentLabel="Login Modal"
    >

      {/* Close Button */}
      <button
        onClick={onClose}
        className="
        absolute top-4 right-4 
        text-gray-400 hover:text-white 
        text-xl font-bold 
        transition
        "
      >
        ×
      </button>

      {/* Header */}
      <h2 className="
      text-2xl md:text-3xl 
      font-semibold 
      mb-2 
      text-center 
      text-white
      ">
        Login to Your Account
      </h2>

      {/* Subtitle */}
      <p className="
      text-sm text-gray-400 
      mb-6 
      text-center
      ">
        Enter your credentials to access your account
      </p>

      {/* Login Form */}
      <Login onclose={onClose} />

      {/* Footer Branding */}
      <div className="mt-6 text-center">
        <h1 className="text-lg font-bold text-white tracking-wide">
          iCloud
        </h1>

        <p className="text-xs text-gray-500">
          Best Premium Apple Sellers
        </p>
      </div>

    </Modal>
  );
};

export default LoginModal;
