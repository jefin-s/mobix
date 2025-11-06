import React from "react";
import { useContext } from "react";
import { CartContext } from "../Context/Cartcontext";
import { useNavigate } from "react-router-dom";
import { Wishcontext } from "../Context/Wishcontext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const gotoProduct = () => {
    navigate(`/prdctdet/${product.id}`);
  };
  const { addToCart, isIncart } = useContext(CartContext);
  const { Togglewhishlist } = useContext(Wishcontext);
  return (
    <div
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden max-w-xs w-full mx-auto"
      onClick={gotoProduct}
    >
      {/* Product Image Container */}
      <div className="relative overflow-hidden bg-gray-100 ">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Badge - You can add "Sale", "New", etc. */}
        <div className="absolute top-3 left-3">
          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            New
          </span>
        </div>
        {/* Quick Action Button */}
        <button
          className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-800 hover:text-red-500 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-md"
          onClick={(e) => {
            e.stopPropagation(); // ✅ Stop card click
            Togglewhishlist(product);
          }}
        >
          ♡
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-gray-500 uppercase font-medium mb-1">
          Category
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex text-amber-400">
            {"★".repeat(4)}
            {/*  */}
            <span className="text-gray-300">★</span>
          </div>
          <span className="text-xs text-gray-500 ml-2">(4.0)</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {product.price}
            </span>
            <span className="text-sm text-gray-500 line-through">
              {product.price + 1000}
            </span>
          </div>
          {/* Stock Status */}
          <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
            In Stock
          </span>
        </div>

        {/* Add to Cart Button */}
        {isIncart(product.id) ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/cart");
            }}
            className="w-full bg-green-600 text-white py-3 rounded-xl"
          >
            Go to Cart ✅
          </button>
        ) : (
          <button
            className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
          >
            <svg
              className="w-5 h-5 group-hover/btn:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
