import React, { useContext, useState } from "react";
import { ProductContext } from "./Productcontext";
import { useFormik } from "formik";
import { Addproductschema } from "../validation.jsx/Addproductschema";
const initialValues = {
  title: "",
  price: "",
  desciption: "",
  discountPercentage: "",
  rating: "",
  stock: "",
  brand: "",
  isActive: "",
  category: "",
  thumbnail: "",
};


const AddForm = () => {
  const { addProducts } = useContext(ProductContext);

  const [products, setProducts] = useState({
    title: "",
    price: "",
    desciption: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    isActive: "",
    category: "",
    thumbnail: "",
  });
const formik = useFormik({
  initialValues: initialValues,
  validationSchema: Addproductschema,
  onSubmit: (values) => {
    addProducts(values);
  },
});
  // const handlechange = (e) => {
  //   const { name, value } = e.target;
  //   setProducts({ ...products, [name]: value });
  // };
  // const handesubmit = (e) => {
  //   e.preventDefault();
  //   console.log(products);
  //   addProducts(products);
  // };

  return (
   <div className="pt-20">
  <form
    className="w-full max-w-lg mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-200"
    onSubmit={formik.handleSubmit}
  >
    <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
      Add Product
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Title */}
      <div>
        <input
          type="text"
          placeholder="Product Title"
          className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={formik.handleChange}
          name="title"
        />
        {formik.errors.title && (
          <small className="text-red-500 text-sm">{formik.errors.title}</small>
        )}
      </div>

      {/* Price */}
      <div>
        <input
          type="text"
          placeholder="Price"
          className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={formik.handleChange}
          name="price"
        />
        {formik.errors.price && (
          <small className="text-red-500 text-sm">{formik.errors.price}</small>
        )}
      </div>

      {/* Category */}
      <div>
        <input
          type="text"
          placeholder="Category"
          className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={formik.handleChange}
          name="category"
        />
        {formik.errors.category && (
          <small className="text-red-500 text-sm">{formik.errors.category}</small>
        )}
      </div>

      {/* Thumbnail */}
      <div>
        <input
          type="text"
          placeholder="Image URL"
          className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={formik.handleChange}
          name="thumbnail"
        />
        {formik.errors.thumbnail && (
          <small className="text-red-500 text-sm">
            {formik.errors.thumbnail}
          </small>
        )}
      </div>

      {/* Brand */}
      <div>
        <input
          type="text"
          placeholder="Brand"
          className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={formik.handleChange}
          name="brand"
        />
        {formik.errors.brand && (
          <small className="text-red-500 text-sm">{formik.errors.brand}</small>
        )}
      </div>

      {/* Description (Full width) */}
      <div className="md:col-span-2">
        <input
          type="text"
          placeholder="Description"
          className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={formik.handleChange}
          name="desciption"
        />
        {formik.errors.desciption && (
          <small className="text-red-500 text-sm">
            {formik.errors.desciption}
          </small>
        )}
      </div>

      {/* Stock */}
      <div>
        <input
          type="text"
          placeholder="Stock"
          className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={formik.handleChange}
          name="stock"
        />
        {formik.errors.stock && (
          <small className="text-red-500 text-sm">{formik.errors.stock}</small>
        )}
      </div>

      {/* Ratings */}
      <div>
        <input
          type="text"
          placeholder="Ratings"
          className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={formik.handleChange}
          name="ratings"
        />
        {formik.errors.rating && (
          <small className="text-red-500 text-sm">{formik.errors.rating}</small>
        )}
      </div>

      {/* Offer */}
      <div>
        <input
          type="text"
          placeholder="Offer"
          className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={formik.handleChange}
          name="discountPercentage"
        />
        {formik.errors.discountPercentage && (
          <small className="text-red-500 text-sm">
            {formik.errors.discountPercentage}
          </small>
        )}
      </div>

      {/* isActive */}
      <div>
        <input
          type="text"
          placeholder="Status"
          className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={formik.handleChange}
          name="isActive"
        />
        {formik.errors.isActive && (
          <small className="text-red-500 text-sm">{formik.errors.isActive}</small>
        )}
      </div>
    </div>

    {/* Submit Button */}
    <button
      className="w-full bg-blue-600 text-white py-3 mt-4 font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md"
    >
      Submit
    </button>
  </form>
</div>

  );
};

export default AddForm;
