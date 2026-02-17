import React, { useContext, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "./context/Userscontext";
import Confirmodal from "../Modal/Confirmodal";

const ManageUser = () => {
  const navigate = useNavigate();
  const { users, deletewithuserid } = useContext(Usercontext);
  console.log(users)

  // Delete Modal
  const [showDeletemodal, setShowDeletemodal] = useState(false);
  const [selectwithDeletId, setselectWithId] = useState(null);

  const handleWithid = (userId) => {
    setselectWithId(userId);
    setShowDeletemodal(true);
  };

  const confirmDelete = () => {
    if (selectwithDeletId) {
      deletewithuserid(selectwithDeletId);
    }
    setShowDeletemodal(false);
    setselectWithId(null);
  };

  const canceldelete = () => {
    setShowDeletemodal(false);
    setselectWithId(null);
  };

  // View Modal
  const [showViewmodal, setShowviewmodal] = useState(false);
  const [selectIViewid, setSelectwithviewid] = useState(null);

  const handleViewid = (viewid) => {
    setSelectwithviewid(viewid);
    setShowviewmodal(true);
  };

  const confirmView = () => {
    if (selectIViewid) {
      navigate(`/admin/detailuser/${selectIViewid}`);
    }
    setShowviewmodal(false);
    setSelectwithviewid(null);
  };

  const cancelview = () => {
    setShowviewmodal(false);
    setSelectwithviewid(null);
  };

  // Selected users
  const selectedDeleteUser = users.find(
    (items) => items.id === selectwithDeletId
  );

  const selectedUser = users.find(
    (items) => items.id === selectIViewid
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        Manage Users
      </h1>

      {/* Stats */}
      <div className="flex flex-wrap gap-6 mb-8 justify-center">
        <div className="flex-1 min-w-[180px] bg-white px-6 py-4 shadow-xl rounded-2xl border-l-4 border-blue-500">
          <p className="text-gray-500 uppercase text-sm">Total Users</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">
            {users.length}
          </p>
        </div>

        <div className="flex-1 min-w-[180px] bg-white px-6 py-4 shadow-xl rounded-2xl border-l-4 border-red-500">
          <p className="text-gray-500 uppercase text-sm">Blocked</p>
          <p className="mt-1 text-2xl font-bold text-red-600">
            {users.filter((item) => item.isBlock).length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-2xl border border-gray-200 bg-white">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="py-3 px-6 text-left border-b">#</th>
              <th className="py-3 px-6 text-left border-b">Name</th>
              <th className="py-3 px-6 text-left border-b">Email</th>
              
              <th className="py-3 px-6 text-left border-b">Status</th>
              <th className="py-3 px-6 text-center border-b">View</th>
              <th className="py-3 px-6 text-center border-b">Action</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {users.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 transition-all duration-300 border-b"
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6 font-medium">{item.username}</td>
                <td className="py-3 px-6">{item.email}</td>
              
                <td
                  className={`py-3 px-6 font-semibold ${
                    item.isBlock ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {item.isBlock ? "Blocked" : "Active"}
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    className="flex items-center justify-center gap-2 px-4 py-1 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                    onClick={() => handleViewid(item.id)}
                  >
                    <AiOutlineEye size={18} /> View
                  </button>
                </td>
                <td className="py-3 px-6 text-center">
  <button
    disabled={item.role === "Admin"}
    className={`px-4 py-1 text-sm font-medium rounded-lg text-white transition
      ${item.role === "Admin"
        ? "bg-gray-400 cursor-not-allowed"
        : item.isBlock
        ? "bg-green-600 hover:bg-green-700"
        : "bg-red-600 hover:bg-red-700"
      }`}
    onClick={() => handleWithid(item.id)}
  >
    {item.role === "Admin"
      ? "Admin"
      : item.isBlock
      ? "Unblock"
      : "Block"}
  </button>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {showDeletemodal && selectedDeleteUser && (
        <Confirmodal
          title={
            selectedDeleteUser.isBlock
              ? "Unblock User"
              : "Block User"
          }
          message={`Are you sure you want to ${
            selectedDeleteUser.isBlock
              ? "unblock"
              : "block"
          } this user?`}
          confirmText={
            selectedDeleteUser.isBlock
              ? "Yes, Unblock"
              : "Yes, Block"
          }
          cancelText="Cancel"
          confirmDelete={confirmDelete}
          cancelDelete={canceldelete}
        />
      )}

      {/* View Modal */}
      {showViewmodal && selectedUser && (
        <Confirmodal
          title={`View ${selectedUser.usernamename?.toUpperCase()}`}
          message={`Are you sure you want to view ${selectedUser.username?.toUpperCase()}?`}
          confirmText="Yes, View"
          cancelText="Cancel"
          confirmDelete={confirmView}
          cancelDelete={cancelview}
        />
      )}
    </div>
  );
};

export default ManageUser;
