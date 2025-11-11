import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { base_url } from "../../api/api";
import axios from "axios";
import { CartContext } from "../../components.jsx/Context/Cartcontext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Wishcontext } from "../../components.jsx/Context/Wishcontext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, isIncart } = useContext(CartContext);
  const{Togglewhishlist,alreadyinWhislist}=useContext(Wishcontext)
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios.get(`${base_url}/products/${id}`).then((response) => {
        setProduct(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  if (!product)
    return <p className="text-center text-gray-600 mt-10">Loading...</p>;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-10 p-6 md:p-12 max-w-6xl mx-auto rounded-xl mt-10">
      {/* Left Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full md:w-4/5 lg:w-3/5 rounded-xl object-contain bg-transparent"
        />
      </div>

      
      <div className="w-full md:w-1/2 flex flex-col gap-4">

      
        <div className="flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {product.title}
          </h2>

          
          <div className="cursor-pointer text-red-500 hover:scale-110 transition-transform">
            <button onClick={ 
              (e)=>{
                 Togglewhishlist(product)

              }
            }>
{alreadyinWhislist(product.id)?(<FaHeart className="text-2xl" />):( <FaRegHeart className="text-gray-700 text-lg" />)}
 
            </button>
            
          
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
       
        </p>

    
        <div className="text-gray-800">
          <p>
            <span className="font-semibold">Category:</span> {product.category}
          </p>
          <p>
            <span className="font-semibold">Brand:</span> {product.brand}
          </p>
          <p className="text-lg font-semibold mt-2">
            Price: <span className="text-green-600">₹{product.price}</span>
          </p>
        </div>

       
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
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
              className="w-full bg-linear-to-r cursor-pointer from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn"
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

          <button
            className="w-full sm:w-1/2 bg-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-indigo-700 transition-transform duration-200 hover:scale-[1.03]"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/Checkout", {
                state: { product: product, quantity: 1 },
              });
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
