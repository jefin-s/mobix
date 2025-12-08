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

//////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////
  //modal  state for view the user details
  const [showViewmodal,setShowviewmodal]=useState(false) 
 const[selectIViewid,setSelectwithviewid]=useState(null)
 
 const handleViewid=(viewid)=>{
  setSelectwithviewid(viewid)
  
  setShowviewmodal(true)

 }
 const confirmView=()=>{
  if(selectIViewid)
  {
    navigate(`/admin/detailuser/${selectIViewid}`) 
  }
  setShowviewmodal(false)
  setSelectwithviewid(null)

 }
 const  cancelview=()=>{
   setShowviewmodal(false)
   setSelectwithviewid(null)

 }
// this is  id the userifd and selected id is match
 const selectedUser= user.find((user)=>user.id===selectIViewid)
///////////////////////////////////////////////////////////////////////////
         
        
  useEffect(() => {
    const fethUsers = async () => {
      const usersfromendpoint = await axios(`${base_url}/users`);
      const userList = usersfromendpoint.data;
      setUser(userList);
    };
    fethUsers();
  }, []);


  return (
   <div className="p-6 bg-gray-50 min-h-screen">
  <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Manage Users</h1>

  {/* Stats Cards */}
  <div className="flex flex-wrap gap-6 mb-8 justify-center">
    <div className="flex-1 min-w-[180px] bg-white px-6 py-4 shadow-xl rounded-2xl border-l-4 border-blue-500">
      <p className="text-gray-500 uppercase text-sm">Total Users</p>
      <p className="mt-1 text-2xl font-bold text-gray-900">{user.length}</p>
    </div>
    <div className="flex-1 min-w-[180px] bg-white px-6 py-4 shadow-xl rounded-2xl border-l-4 border-red-500">
      <p className="text-gray-500 uppercase text-sm">Blocked</p>
      <p className="mt-1 text-2xl font-bold text-red-600">
        {user.filter((item) => item.isBlock).length}
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
          <th className="py-3 px-6 text-left border-b">Password</th>
          <th className="py-3 px-6 text-left border-b">Status</th>
          <th className="py-3 px-6 text-center border-b">View</th>
          <th className="py-3 px-6 text-center border-b">Delete</th>
        </tr>
      </thead>

      <tbody className="text-gray-700">
        {user.map((item, index) => (
          <tr
            key={item.id}
            className="hover:bg-gray-50 transition-all duration-300 border-b"
          >
            <td className="py-3 px-6">{index + 1}</td>
            <td className="py-3 px-6 font-medium">{item.name}</td>
            <td className="py-3 px-6">{item.email}</td>
            <td className="py-3 px-6 font-mono text-gray-500">{item.password}</td>
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
                className={`px-4 py-1 text-sm font-medium rounded-lg text-white transition ${
                  item.isBlock
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
                onClick={() => handleWithid(item.id)}
              >
                {item.isBlock ? "Unblock" : "Block"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Modals */}
  {showDeletemodal && (
    <Confirmodal
      title={
        user.find((items) => items.id === selectwithDeletId)?.isBlock
          ? "Unblock User"
          : "Block User"
      }
      message={`Are you sure you want to ${
        user.find((items) => items.id === selectwithDeletId)?.isBlock
          ? "unblock"
          : "block"
      } this user?`}
      confirmText={
        user.find((items) => items.id === selectwithDeletId)?.isBlock
          ? "Yes, Unblock"
          : "Yes, Block"
      }
      cancelText="Cancel"
      confirmDelete={confirmDelete}
      cancelDelete={canceldelete}
    />
  )}

  {showViewmodal && (
    <Confirmodal
      title={`View ${selectedUser ? selectedUser.name.toUpperCase() : "No User"}`}
      message={`Are you sure you want to view ${
        selectedUser ? selectedUser.name.toUpperCase() : "No User"
      }?`}
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
