import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/Category/GetAllCategories");

      setCategories(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };
  useEffect(() => {

    fetchCategories();

  }, []);
  const addCategory = async (categoryData) => {
    try {
      await axiosInstance.post("/Category/Addcategory", categoryData);

      toast.success("Category Added");

      fetchCategories();
    } catch {
      toast.error("Add failed");
    }
  };

  const updateCategory = async (id, data) => {
    try {
      await axiosInstance.put(`/Category/UpdateCategory/${id}`, data);

      toast.success("Updated successfully");

      fetchCategories();
    } catch {
      toast.error("Update failed");
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axiosInstance.patch(`/Category/delete${id}`);

      toast.success("Deleted successfully");

      fetchCategories();
    } catch {
      toast.error("Delete failed");
    }
  };

  const toggleCategoryStatus = async (id, currentStatus) => {
    try {
      await axiosInstance.patch(
        `/Category/Activate${id}`,

        !currentStatus, // send opposite value
      );

      fetchCategories();
    } catch {
      toast.error("Status update failed");
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,

        fetchCategories,

        addCategory,

        updateCategory,

        deleteCategory,
        toggleCategoryStatus,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
