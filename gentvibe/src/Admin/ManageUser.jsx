import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { base_url } from "../api/api";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "./context/Userscontext";
import Confirmodal from "../Modal/Confirmodal";

const ManageUser = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const { deletewithuserid } = useContext(Usercontext);
  const [showmodal, setShowmodal] = useState(false);
  const [selectwithUserid, setselectwithUserid] = useState(null);

  useEffect(() => {
    const fethUsers = async () => {
      const usersfromendpoint = await axios(`${base_url}/users`);
      const userList = usersfromendpoint.data;
      console.log(userList);
      setUser(userList);
    };
    fethUsers();
  }, []);

  const handleWithid = (userId) => {
    setselectwithUserid(userId);
    setShowmodal(true);
  };

  const confirmDelete = () => {
    if (selectwithUserid) {
      deletewithuserid(selectwithUserid);
    }
    setShowmodal(false);
    setselectwithUserid(null);
  };

  const canceldelete = () => {
    setShowmodal(false);
    setselectwithUserid(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Manage Users</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-6 text-left border-b">#</th>
              <th className="py-3 px-6 text-left border-b">Name</th>
              <th className="py-3 px-6 text-left border-b">Email</th>
              <th className="py-3 px-6 text-left border-b">Password</th>
              <th className="py-3 px-6 text-center border-b">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {user.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition duration-150 border-b"
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6 font-medium">{item.name}</td>
                <td className="py-3 px-6">{item.email}</td>
                <td className="py-3 px-6">{item.password}</td>
                <td className="py-3 px-6 text-center flex items-center justify-center gap-2">
                  <p style={{color:item.isBlock?"red":"green"}}>{item.isBlock?"Blocked":"Active"}</p>
                  <button
                    className="px-3 py-1 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    className="px-3 py-1 text-sm rounded-md bg-green-500 text-white hover:bg-green-600 flex items-center gap-1"
                    onClick={() => navigate(`/detailuser/${item.id}`)}
                  >
                    <AiOutlineEye />
                    View
                  </button>

                  <button
                    className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
                    onClick={() => handleWithid(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showmodal && (
        <Confirmodal
          title="Confirm Block"
          message="Are you sure you want to block this User?"
          confirmText="Yes, Delete"
          cancelText="Cancel"
          confirmDelete={confirmDelete}
          cancelDelete={canceldelete}
        />
      )}
    </div>
  );
};

export default ManageUser;
