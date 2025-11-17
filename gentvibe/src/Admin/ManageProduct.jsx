import React, { useContext, useState } from "react";
import { ProductContext } from "./Productcontext";
import { useNavigate } from "react-router-dom";
import Confirmodal from "../Modal/Confirmodal";

const ManageProduct = () => {
  const { products, delteProductWithid } = useContext(ProductContext);
  const [status, setStatus] = useState();

  // Product searching
  const [searchitem, setSearchitem] = useState("");
  let searcheditem = products.filter((item) =>
    (item.title ?? "").toLowerCase().includes(searchitem.toLowerCase())
  );

  // Product category
  const [category, setCategory] = useState("all");
  if (category !== "all") {
    searcheditem = searcheditem.filter((item) => item.category === category);
  }

  // Filter out-of-stock
  const [deleted, setDeleted] = useState("all");
  if (deleted !== "all") {
    const boolValue = deleted === "true";
    searcheditem = searcheditem.filter((item) => item.isDeleted === boolValue);
  }

  // modal logic for update
  const [showUpdatemodal, setShowUdpatemodal] = useState();
  const [selectupdateId, setSelectwithupdateid] = useState();
  const handleUpdate = (id) => {
    setSelectwithupdateid(id);
    setShowUdpatemodal(true);
  };
  const confirmUpdate = () => {
    if (selectupdateId) {
      navigate(`/admin/updatept/${selectupdateId}`);
    }
    
    setShowUdpatemodal(false);
    setSelectwithupdateid(null);
  };
  const cancelUpdate = () => {
    setShowUdpatemodal(false);
    setSelectwithupdateid(null);
  };
  // Modal logic of delete
  const [showdeletemodal, setdeletmodal] = useState(false);
  const [selectwithdeleteId, setSelectWithdeleteId] = useState("");
  const handleWithid = (itemId) => {
    setSelectWithdeleteId(itemId);
    setdeletmodal(true);
  };

  const confirmDelete = () => {
    if (selectwithdeleteId) {
      delteProductWithid(selectwithdeleteId);
    }
    setdeletmodal(false);
    setSelectWithdeleteId(null);
  };

  const cancelDelete = () => {
    setdeletmodal(false);
    setSelectWithdeleteId(null);
  };

  const navigate = useNavigate();

  return (
    <div className="pt-20 px-4 md:px-6 lg:px-10 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4 md:gap-0">
        <h1 className="text-3xl font-semibold text-gray-800">
          Manage Products
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full md:w-auto">
          <input
            type="text"
            className="border rounded-full px-4 py-2 w-full md:w-60"
            onChange={(e) => setSearchitem(e.target.value)}
            placeholder="Search"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border px-4 py-2 rounded-lg shadow-sm w-full md:w-44"
          >
            <option value="all">All products</option>
            <option value="smartphones">Smart Phones</option>
            <option value="audio">Audio</option>
            <option value="wearables">Wearables</option>
            <option value="accessories">Accessories</option>
            <option value="laptops">Laptops</option>
          </select>
          <select
            value={deleted}
            onChange={(e) => setDeleted(e.target.value)}
            className="border px-4 py-2 rounded-lg shadow-sm w-full md:w-44"
          >
            <option value="all">All products</option>
            <option value="true">Deleted</option>
            <option value="false">In Stock</option>
          </select>
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 shadow-md w-full md:w-auto"
            onClick={() => navigate("/admin/addform")}
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-4 text-left border-b">#</th>
              <th className="py-3 px-4 text-left border-b">Thumbnail</th>
              <th className="py-3 px-4 text-left border-b">Title</th>
              <th className="py-3 px-4 text-left border-b">Category</th>
              <th className="py-3 px-4 text-left border-b">Price</th>
              <th className="py-3 px-4 text-left border-b">Status</th>
              <th className="py-3 px-4 text-center border-b">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {searcheditem.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              searcheditem.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition duration-150 border-b"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-16 w-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium">{item.title}</td>
                  <td className="py-3 px-4">{item.category}</td>
                  <td className="py-3 px-4">{item.price}</td>
                  <td
                    className="py-3 px-4 font-semibold"
                    style={{ color: item.isDeleted ? "red" : "green" }}
                  >
                    {item.isDeleted ? "Out of Stock" : "In Stock"}
                  </td>
                  <td className="py-3 px-4 text-center flex flex-col md:flex-row items-center justify-center gap-2">
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 shadow w-full md:w-auto"
                      onClick={() => handleWithid(item.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 shadow w-full md:w-auto"
                      onClick={() => handleUpdate(item.id)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showdeletemodal && (
        <Confirmodal
          title="Confirm Deletion"
          message="Are you sure you want to delete this product?"
          confirmText="Yes, Delete"
          cancelText="Cancel"
          confirmDelete={confirmDelete}
          cancelDelete={cancelDelete}
        />
      )}
      {showUpdatemodal && (
        <Confirmodal
          title="Confirm update"
          message="Are you sure you want to Update this product?"
          confirmText="Yes, update"
          cancelText="Cancel"
          confirmDelete={confirmUpdate}
          cancelDelete={cancelUpdate}
        />
      )}
    </div>
  );
};

export default ManageProduct;
