import React, { useContext } from "react";
import { ProductContext } from "./Productcontext";
import { useFormik } from "formik";

const initialValues = {
  Title: "",
  Price: "",
  Stock: "",
  Description: "",
  Discountpercentage: "",
  Brand: "",
  CategoryID: "",
  Thumbnail: "",
  ImageFiles: null
};

const AddForm = () => {

  const { addProducts } = useContext(ProductContext);

  const formik = useFormik({
    initialValues,

    onSubmit: (values) => {

      const formData = new FormData();

      Object.keys(values).forEach(key => {

        if (key === "ImageFiles" && values.ImageFiles) {

          for (let i = 0; i < values.ImageFiles.length; i++) {
            formData.append("ImageFiles", values.ImageFiles[i]);
          }

        } else {

          formData.append(key, values[key]);

        }

      });

      addProducts(formData);

    }

  });

  return (

<div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">

<form
onSubmit={formik.handleSubmit}
className="bg-white w-full max-w-4xl rounded-xl shadow-lg p-8"
>

<h2 className="text-3xl font-bold text-center text-gray-800 mb-6">

Add Product

</h2>


<div className="grid grid-cols-1 md:grid-cols-2 gap-5">


{/* Title */}

<div>

<label className="block text-gray-700 font-semibold mb-1">

Title

</label>

<input
type="text"
name="Title"
value={formik.values.Title}
onChange={formik.handleChange}
className="w-full border border-gray-300 text-gray-900 bg-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

</div>


{/* Price */}

<div>

<label className="block text-gray-700 font-semibold mb-1">

Price

</label>

<input
type="number"
name="Price"
value={formik.values.Price}
onChange={formik.handleChange}
className="w-full border border-gray-300 text-gray-900 bg-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
/>

</div>


{/* Stock */}

<div>

<label className="block text-gray-700 font-semibold mb-1">

Stock

</label>

<input
type="number"
name="Stock"
value={formik.values.Stock}
onChange={formik.handleChange}
className="w-full border border-gray-300 text-gray-900 bg-white rounded-lg p-3"
/>

</div>


{/* Brand */}

<div>

<label className="block text-gray-700 font-semibold mb-1">

Brand

</label>

<input
type="text"
name="Brand"
value={formik.values.Brand}
onChange={formik.handleChange}
className="w-full border border-gray-300 text-gray-900 bg-white rounded-lg p-3"
/>

</div>


{/* Category */}

<div>

<label className="block text-gray-700 font-semibold mb-1">

Category ID

</label>

<input
type="number"
name="CategoryID"
value={formik.values.CategoryID}
onChange={formik.handleChange}
className="w-full border border-gray-300 text-gray-900 bg-white rounded-lg p-3"
/>

</div>


{/* Discount */}

<div>

<label className="block text-gray-700 font-semibold mb-1">

Discount %

</label>

<input
type="number"
name="Discountpercentage"
value={formik.values.Discountpercentage}
onChange={formik.handleChange}
className="w-full border border-gray-300 text-gray-900 bg-white rounded-lg p-3"
/>

</div>


{/* Thumbnail */}

<div className="md:col-span-2">

<label className="block text-gray-700 font-semibold mb-1">

Thumbnail URL

</label>

<input
type="text"
name="Thumbnail"
value={formik.values.Thumbnail}
onChange={formik.handleChange}
className="w-full border border-gray-300 text-gray-900 bg-white rounded-lg p-3"
/>

</div>


{/* Description */}

<div className="md:col-span-2">

<label className="block text-gray-700 font-semibold mb-1">

Description

</label>

<textarea
name="Description"
value={formik.values.Description}
onChange={formik.handleChange}
className="w-full border border-gray-300 text-gray-900 bg-white rounded-lg p-3 h-24"
/>

</div>


{/* Image Upload */}

<div className="md:col-span-2">

<label className="block text-gray-700 font-semibold mb-1">

Product Images

</label>

<input
type="file"
multiple
onChange={(e) =>
formik.setFieldValue("ImageFiles", e.target.files)
}
className="w-full border border-gray-300 bg-white text-gray-900 p-2 rounded"
/>

</div>

</div>


<button
type="submit"
className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
>

Add Product

</button>

</form>

</div>

  );

};

export default AddForm;
