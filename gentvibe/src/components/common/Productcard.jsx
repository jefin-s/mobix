  import React, { useContext } from "react";
  import { useNavigate } from "react-router-dom";
  import { CartContext } from "../Context/Cartcontext";
  import { Wishcontext } from "../Context/Wishcontext";
  import { FaHeart, FaRegHeart } from "react-icons/fa";

  const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart, isIncart } = useContext(CartContext);
    const {  toggleWishlist,alreadyInWishlist } = useContext(Wishcontext);

    const gotoProduct = () => navigate(`/prdctdet/${product.id}`);
  console.log(product)
    return (
      <div
        onClick={gotoProduct}
        className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden max-w-xs w-full mx-auto cursor-pointer"
      >
        {/* IMAGE */}
        <div className="relative bg-gray-100 aspect-square overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* NEW TAG */}
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
            New
          </span>

          {/* WISHLIST BUTTON */}
          <button
            onClick={(e) => { 
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-800 hover:text-red-500 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-md"
          >
            {alreadyInWishlist(product.id) ? (
              <FaHeart className="text-red-500 text-lg" />
            ) : (
              <FaRegHeart className="text-gray-700 text-lg" />
            )}
          </button>
        </div>

        {/* DETAILS */}
        <div className="p-4 flex flex-col justify-between h-[210px]">
          {/* CATEGORY */}
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
            Category
          </p>

          {/* TITLE */}
          <h3 className="font-semibold text-gray-900 text-base mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>

          {/* PRICE */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">
                ₹{product.price}
              </span> 
              <span className="text-sm text-gray-400 line-through">
                ₹{product.price + 1000}
              </span>
            </div>
          </div>

          {/* ADD TO CART */}
          {isIncart(product.id) ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/cart");
              }}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-200"
            >
              Go to Cart ✅
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(Number(product.id));
              }}
              className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 group/btn"
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
