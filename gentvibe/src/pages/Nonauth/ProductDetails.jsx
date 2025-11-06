import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { base_url } from "../../api/api";
import axios from "axios";
import { CartContext } from "../../components.jsx/Context/Cartcontext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
   const{addToCart}=useContext(CartContext)
  useEffect(() => {
    try {
      axios.get(`${base_url}/products/${id}`).then((response) => {
        setProduct(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  if (!product) return <p className="text-center text-gray-600 mt-10">Loading...</p>;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-10 p-6 md:p-12 max-w-6xl mx-auto rounded-xl mt-10">
      {/* Product Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full md:w-4/5 lg:w-3/5 rounded-xl object-contain bg-transparent"
        />
      </div>

      {/* Product Details */}
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{product.title}</h2>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          {product.description}
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

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button className="w-full sm:w-1/2 bg-black text-white py-3 px-4 rounded-xl font-semibold hover:bg-gray-800 transition-transform duration-200 hover:scale-[1.03]" onClick={()=>addToCart(product)}>
            Add to Cart
          </button>
          <button className="w-full sm:w-1/2 bg-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-indigo-700 transition-transform duration-200 hover:scale-[1.03]">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
