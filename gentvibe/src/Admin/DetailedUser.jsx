  import axios from "axios";
  import React, { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  import { base_url } from "../api/api";

  const DetailedUser = () => {
    const { userid } = useParams();
    const [User, setUser] = useState(null);

    const fethwithid = async () => {
      try {
        const response = await axios(`${base_url}/users/${userid}`);
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      fethwithid();
    }, [userid]);


    return (

      
      <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 flex justify-center items-center p-6">

       
        {User ? (
          <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl border border-gray-200">
            <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
              👤 User Details
            </h1>

            {/* User Info Section */}
            <div className="space-y-3 text-gray-800 text-lg bg-gray-50 p-5 rounded-xl border">
              <p>
                <span className="font-semibold text-gray-600">Name:</span>{" "}
                {User.name}
              </p>
              <p>
                <span className="font-semibold text-gray-600">Email:</span>{" "}
                {User.email}
              </p>
              <p>
                <span className="font-semibold text-gray-600">User ID:</span>{" "}
                {User.id}
              </p>
              <p>
                <span className="font-semibold text-gray-600">Status:</span>{" "}
                {User.isBlock === false ? (
                  <span className="text-green-600 font-semibold">Active</span>
                ) : (
                  <span className="text-red-600 font-semibold">Not Active</span>
                )}
              </p>
              <p>
                <span className="font-semibold text-gray-600">Role:</span>{" "}
                {User.role}
              </p>
            </div>

            {/* Orders Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-700 mb-4 border-b-2 border-gray-300 pb-2">
                🛍 Orders
              </h2>

              {User.orders && User.orders.length > 0 ? (
                <div className="space-y-6">
                  {User.orders.map((order, id) => (
                    <div
                      key={id}
                      className="bg-gray-50 p-5 rounded-xl shadow-sm border border-gray-200"
                    >
                      <p className="font-semibold text-blue-600 text-lg mb-3">
                        Order ID: {order.orderId}
                      </p>

                      <ul className="space-y-4">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between bg-white rounded-lg shadow-sm border p-3 hover:shadow-md transition"
                          >
                            <div className="flex items-center gap-4">
                              <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-16 h-16 rounded-lg object-cover border"
                              />
                              <div>
                                <li className="font-medium text-gray-800 list-none">
                                  {item.title}
                                </li>
                                <p className="text-sm text-gray-600">
                                  Qty:{" "}
                                  <span className="font-semibold">
                                    {item.quantity}
                                  </span>{" "}
                                  | Price:{" "}
                                  <span className="font-semibold">
                                    ₹{item.price}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic text-center mt-6">
                  No orders found.
                </p>
              )}
            </div>
          </div>
        ) : (
          <h2 className="text-xl font-semibold text-gray-600">Loading...</h2>
        )}
      </div>
    );
  };

  export default DetailedUser;
