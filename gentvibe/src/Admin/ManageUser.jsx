import axios from "axios";
import React, { useEffect, useState } from "react";
import { base_url } from "../api/api";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ManageUser = () => {
  const [user, setUser] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    const fethUsers = async () => {
      const usersfromendpoint = await axios(`${base_url}/users`);
      const userList = usersfromendpoint.data;
      console.log(userList);

      setUser(userList);
    };
    fethUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Manage Users</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {user.map((item, id) => {
          return (
            <div
              key={id}
              className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-5 border"
            >
              <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>

              <p className="text-gray-600 text-sm mt-1">
                <span className="font-medium">Email:</span> {item.email}
              </p>

              <p className="text-gray-600 text-sm mt-1">
                <span className="font-medium">Password:</span> {item.password}
              </p>

              <div className="mt-4 flex justify-between">
                <button className="px-3 py-1 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600">
                  Edit
                </button>

                <button className="px-3 py-1 text-sm rounded-md bg-green-500 text-white hover:bg-green-600 flex items-center gap-1" onClick={()=>{navigate(`/detailuser/${item.id}`)}}>
                  <AiOutlineEye />
                  View
                </button>

                <button className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageUser;
