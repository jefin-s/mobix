import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "./context/CategoryContext";
import Confirmodal from "../Modal/Confirmodal";
import toast from "react-hot-toast";
import { use } from "react";
const ManageCategory = () => {
  const [showModal, setShowModal] = useState(false);
  const [handleUpdateId, setHandleUpdateId] = useState(null);
  const [updateCategoryName, setUpdateCategoryName] = useState("");
  const [showeditmodal, setshoweditmodal] = useState(false);

  const {
    categories,
    fetchCategories,
    addCategory,
    deleteCategory,
    toggleCategoryStatus,
    updateCategory,
  } = useContext(CategoryContext);

  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    if (!categoryName.trim()) {
      toast.error("Please Enter Your Category");

      return;
    }

    setShowModal(true);
  };

  const confirmAdd = () => {
    addCategory({
      categoryName: categoryName,
    });

    setCategoryName("");
    setShowModal(false);
  };

  const cancelcategory = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-md">
        {/* Heading */}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Manage Category
          </h2>

          {/* Add Category Input */}

          <div className="flex gap-2 text-pink-400">
            <input
              type="text"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="border px-3 py-2 rounded-lg"
            />

            <button
              onClick={handleAddCategory}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg"
            >
              Add
            </button>
          </div>
        </div>

        {/* Table */}

        <table className="w-full text-black">
          <thead>
            <tr className="border-b text-gray-500 text-sm">
              <th className="text-left py-3">Category ID</th>

              <th className="text-left py-3">Category Name</th>
              <th className="text-left py-3">Active</th>

              <th className="text-left py-3">Status</th>

              <th className="text-left py-3">Action</th>
              <th className="text-left py-3">Edit</th>
            </tr>
          </thead>

          <tbody>
            {categories && categories.length > 0 ? (
              categories.map((cat) => (
                <tr key={cat.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">#CAT{cat.id}</td>

                  <td>{cat.name}</td>
                  <td>
                    <button
                      className="text-red-500 hover:text-red-700 border-4"
                      onClick={() => toggleCategoryStatus(cat.id, cat.isActive)}
                    >
                      {cat.isActive ? "inActive" : "active"}
                    </button>
                  </td>
                  <td>
                    <span
                      className={`font-medium ${cat.isActive ? "text-purple-600" : "text-red-500"}`}
                    >
                      {cat.isDeleted
                        ? "Deleted"
                        : cat.isActive
                          ? "Active"
                          : "inactive"}
                    </span>
                  </td>

                  <td>
                    <button
                      onClick={() => deleteCategory(cat.id)}
                      className="text-red-500 hover:text-red-700 border-4"
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                  <button
                    onClick={() => {
                      setHandleUpdateId(cat.id);
                      setUpdateCategoryName(cat.name);
                      setshoweditmodal(true);
                    }}
                    className="text-red-500 hover:text-red-700 border-4"
                  >
                    edit
                  </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No Categories Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Confirmodal
          title="Add Category"
          message={`Are you sure you want to add "${categoryName}" category?`}
          confirmText="Add"
          cancelText="Cancel"
          confirmDelete={confirmAdd}
          cancelDelete={cancelcategory}
        />
      )}
      {showeditmodal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          {/* Modal Box */}

          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            {/* Close Button */}

            <button
              onClick={() => setshoweditmodal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>

            {/* Title */}

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Update Category
            </h2>

            {/* Input */}

            <input
              type="text"
              value={updateCategoryName}
              onChange={(e) => setUpdateCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-amber-800"
            />

            {/* Buttons */}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setshoweditmodal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (!updateCategoryName.trim()) {
                    toast.error("Category name required");

                    return;
                  }

                  updateCategory(handleUpdateId, {
                    title: updateCategoryName,
                    isActive:true,
                  });

                  setshoweditmodal(false);  
                }}
                disabled={!updateCategoryName.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageCategory;
