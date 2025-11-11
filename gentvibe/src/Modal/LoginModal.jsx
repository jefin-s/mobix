    import React from "react";
    import Login from "../pages/Auth/Login";
    import Modal from "react-modal";

    const LoginModal = ({ isOpen, onClose }) => {
    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={onClose} // close on ESC or overlay click
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 md:mx-auto mt-20 p-6 md:p-8 relative focus:outline-none"
        overlayClassName="fixed inset-0 bg-black/50 flex items-start justify-center z-50"
        contentLabel="Login Modal"
        >
        {/* Close Button */}
        <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg font-bold"
        >
            ×
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
            Login to Your Account
        </h2>

        {/* Optional Subtitle */}
        <p className="text-sm text-gray-500 mb-6 text-center">
            Enter your credentials to access your account
        </p>

        {/* Login Form Component */}
        <Login />
          <h1 className="text-center text-shadow-black font-bold">icloud</h1>
          <h1 className="text-center text-sm ">Best Premium Apple sellers</h1>
        
        </Modal>
    );
    };

    export default LoginModal;
