import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "./context/CategoryContext";
import Confirmodal from "../Modal/Confirmodal";
import toast from "react-hot-toast";

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

          {/* Add Category */}
          <div className="flex gap-2 text-black">
            <input
              type="text"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="border px-3 py-2 rounded-lg"
            />

            <button
              onClick={handleAddCategory}
              className="
                bg-gradient-to-r from-purple-600 to-purple-500
                hover:from-purple-500 hover:to-purple-400
                text-white
                px-5 py-2
                rounded-lg
                font-medium
                shadow-md
                transition
                duration-200
              "
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

                  {/* Toggle Active */}
                  <td>
                    <button
                      onClick={() =>
                        toggleCategoryStatus(cat.id, cat.isActive)
                      }
                      className={`
                        px-3 py-1 rounded-full text-sm font-medium transition
                        ${
                          cat.isActive
                            ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }
                      `}
                    >
                      {cat.isActive ? "InActive" : "Active"}
                    </button>
                  </td>

                  {/* Status */}
                  <td>
                    <span
                      className={`font-medium ${
                        cat.isActive
                          ? "text-purple-600"
                          : "text-red-500"
                      }`}
                    >
                      {cat.isDeleted
                        ? "Deleted"
                        : cat.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  {/* Delete */}
                  <td>
                    <button
                      onClick={() => deleteCategory(cat.id)}
                      className="
                        px-3 py-1
                        bg-red-100 text-red-600
                        hover:bg-red-200
                        rounded-md
                        text-sm
                        font-medium
                        transition
                      "
                    >
                      Delete
                    </button>
                  </td>

                  {/* Edit */}
                  <td>
                    <button
                      onClick={() => {
                        setHandleUpdateId(cat.id);
                        setUpdateCategoryName(cat.name);
                        setshoweditmodal(true);
                      }}
                      className="
                        px-3 py-1
                        bg-blue-100 text-blue-600
                        hover:bg-blue-200
                        rounded-md
                        text-sm
                        font-medium
                        transition
                      "
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No Categories Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Confirm Modal */}
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

      {/* Edit Modal */}
      {showeditmodal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setshoweditmodal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Update Category
            </h2>

            <input
              type="text"
              value={updateCategoryName}
              onChange={(e) => setUpdateCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-amber-800"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setshoweditmodal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
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
                    isActive: true,
                  });

                  setshoweditmodal(false);
                }}
                disabled={!updateCategoryName.trim()}
                className="
                  px-5 py-2
                  bg-gradient-to-r from-blue-600 to-blue-500
                  hover:from-blue-500 hover:to-blue-400
                  text-white
                  rounded-lg
                  font-medium
                  shadow-md
                  transition
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
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