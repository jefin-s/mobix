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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Users</h1>

      {/* Stats Cards */}
      <div className="flex justify-center gap-6 mb-6">
        <div className="bg-white px-6 py-3 shadow-md rounded-xl text-gray-700 font-medium">
          Total Users:
          <span className="font-bold text-gray-900 ml-2">{user.length}</span>
        </div>

        <div className="bg-white px-6 py-3 shadow-md rounded-xl text-gray-700 font-medium">
          Blocked:
          <span className="font-bold text-red-600 ml-2">
            {user.filter((item) => item.isBlock).length}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl border">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase">
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
                key={index}
                className="hover:bg-gray-50 border-b transition"
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6 font-medium">{item.name}</td>
                <td className="py-3 px-6">{item.email}</td>
                <td className="py-3 px-6">{item.password}</td>

                <td
                  className="py-3 px-6 font-semibold"
                  style={{ color: item.isBlock ? "red" : "green" }}
                >
                  {item.isBlock ? "Blocked" : "Active"}
                </td>

                <td className="py-3 px-6 text-center">
                  <button
                    className="px-3 py-1 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-1"
                    onClick={() =>handleViewid(item.id)}
                  >
                    <AiOutlineEye /> View
                  </button>
                </td>

                <td className="py-3 px-6 text-center">
                  <button
                    className="px-3 py-1 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600"
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

      {/* Modal  component for  delete confiramaton */}
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
      
      {
        showViewmodal&&<Confirmodal
        title={`view ${selectedUser?selectedUser.name.toUpperCase():"No User"}`}
         message={`Are sure want  to view ${selectedUser?selectedUser.name.toUpperCase():"No user"}`}
         confirmText="yes view"
         cancelText="cancel"
         confirmDelete={confirmView}
         cancelDelete={cancelview}
        
        />
      }
    </div>
  );
};

export default ManageUser;
