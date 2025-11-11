import React, { useContext } from "react";
import { Wishcontext } from "../../components.jsx/Context/Wishcontext";

const Whishlist = () => {
  const { whishlist, Togglewhishlist } = useContext(Wishcontext);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5 pt-20">
      <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">
        Wishlist ❤️
      </h1>

      {whishlist.length === 0 ? (
        <p className="text-center text-gray-600 text-xl mt-20">
          Your wishlist is empty.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {whishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border hover:shadow-2xl transition duration-300"
            >
              {/* Image Section */}
              <div className="flex justify-center bg-gray-100 p-4">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-40 object-contain"
                />
              </div>

              {/* Content Section */}
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-900">
                  {item.title}
                </h2>

                <p className="text-gray-700 font-semibold mt-2">
                  Price: <span className="text-green-600">₹{item.price}</span>
                </p>

                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {item.description}
                </p>

                {/* Remove Button */}
                <div className="flex justify-center mt-5">
                  <button
                    onClick={() => Togglewhishlist(item)}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition duration-200"
                  >
                    Remove ❌
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Whishlist;
