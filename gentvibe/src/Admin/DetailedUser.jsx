import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Usercontext } from "../Admin/context/Userscontext";

const DetailedUser = () => {
  const { userid } = useParams();
  const { getDetailedUser } = useContext(Usercontext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getDetailedUser(userid);
      setUser(data);
    };

    fetchUser();
  }, [userid]);

  if (!user) {
    return <h2 className="text-xl text-center mt-10">Loading...</h2>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-6 bg-gray-100 text-amber-300">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          👤 User Details
        </h1>

        <p><b>Name:</b> {user.username}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Role:</b> {user.roleName}</p>
        <p>
          <b>Status:</b>{" "}
          {user.isBlock ? (
            <span className="text-red-600">Blocked</span>
          ) : (
            <span className="text-green-600">Active</span>
          )}
        </p>
         <p><b>TotalOrders:</b> {user.totalOrders}</p>
        <p><b>TotalSpend:</b> {user.totalSpent}</p>
        <p><b>lastOrderDate:</b> {user.lastOrderDate}</p>
      </div>
    </div>
  );
};

export default DetailedUser;
