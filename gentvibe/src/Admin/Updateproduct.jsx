import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "./Productcontext";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";

const Updateproduct = () => {

  const navigate = useNavigate();
  const { p_id } = useParams();
  const { updateProduct } = useContext(ProductContext);

  const [preview, setPreview] = useState(null);

  const [product, setProduct] = useState({

    Title: "",
    Price: "",
    Stock: "",
    Discountpercentage: "",
    Description: "",
    Brand: "",
    CategoryID: "",
    ImageFiles: []

  });


  // ✅ Fetch Product
  const fetchProduct = async () => {

    try {

      const res = await axiosInstance.get(`/Products/${p_id}`);

      const data = res.data.data;

      setProduct({

        Title: data.title ?? "",
        Price: data.price ?? "",
        Stock: data.stock ?? "",
        Discountpercentage: data.discount ?? "",
        Description: data.description ?? "",
        Brand: data.brand ?? "",
        CategoryID: data.categoryId?? "",
        ImageFiles: []

      });

      setPreview(data.thumbnail);

    }
    catch (error) {

      console.log(error);

      toast.error("Fetch failed");

    }

  };


  useEffect(() => {

    fetchProduct();

  }, []);




  // ✅ Handle input change
  const handleChange = (e) => {

    const { name, value } = e.target;

    setProduct({

      ...product,
      [name]: value

    });

  };



  // ✅ Handle image change
  const handleImageChange = (e) => {

    const files = Array.from(e.target.files);

    setProduct({

      ...product,
      ImageFiles: files

    });

    setPreview(URL.createObjectURL(files[0]));

  };



  // ✅ Submit update
  const handleSubmit = async (e) => {

    e.preventDefault();

    const success = await updateProduct(p_id, product);

    if (success) {

      navigate("/admin/allproducts");

    }

  };




  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-200 flex justify-center items-center p-6">


      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-8 border">


        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">

          Update Product

        </h2>



        <form onSubmit={handleSubmit} className="space-y-5">


          {/* Image Preview */}

          <div className="flex justify-center">

            <div className="w-32 h-32 border-2 border-blue-400 rounded-xl overflow-hidden shadow">

              {preview ?

                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />

                :

                <div className="flex items-center justify-center h-full text-gray-400">

                  No Image

                </div>

              }

            </div>

          </div>



          {/* File Upload */}

          <input

            type="file"
            multiple
            onChange={handleImageChange}

            className="
            w-full
            bg-gray-50
            border-2
            border-dashed
            border-blue-400
            rounded-lg
            p-3
            cursor-pointer
            hover:bg-blue-50
            "

          />



          {/* Input Grid */}

          <div className="grid grid-cols-2 gap-4">


            <Input label="Title" name="Title" value={product.Title} onChange={handleChange} />

            <Input label="Price" name="Price" value={product.Price} onChange={handleChange} />

            <Input label="Stock" name="Stock" value={product.Stock} onChange={handleChange} />

            <Input label="Discount %" name="Discountpercentage" value={product.Discountpercentage} onChange={handleChange} />

            <Input label="Brand" name="Brand" value={product.Brand} onChange={handleChange} />

            <Input label="Category ID" name="CategoryID" value={product.CategoryID} onChange={handleChange} />


          </div>



          {/* Description */}

          <div>

            <label className="font-semibold text-gray-700 mb-1">

              Description

            </label>

            <textarea

              name="Description"
              value={product.Description}
              onChange={handleChange}
              placeholder="Enter Description"

              className="
              w-full
              bg-gray-50
              border-2
              border-gray-300
              rounded-lg
              px-4
              py-2
              text-gray-800
              placeholder-gray-400
              focus:outline-none
              focus:border-blue-500
              focus:bg-white
              focus:ring-2
              focus:ring-blue-200
              "

            />

          </div>



          {/* Submit Button */}

          <button

            type="submit"

            className="
            w-full
            bg-blue-600
            text-white
            py-3
            rounded-xl
            font-semibold
            hover:bg-blue-700
            transition
            duration-300
            shadow-lg
            "

          >

            Update Product

          </button>



        </form>


      </div>


    </div>

  );

};




// ✅ Colored Input Component

const Input = ({ label, name, value, onChange }) => (

  <div className="flex flex-col">


    <label className="font-semibold text-gray-700 mb-1">

      {label}

    </label>


    <input

      name={name}
      value={value}
      onChange={onChange}
      placeholder={`Enter ${label}`}

      className="
      w-full
      bg-gray-50
      border-2
      border-gray-300
      rounded-lg
      px-4
      py-2
      text-gray-800
      placeholder-gray-400
      focus:outline-none
      focus:border-blue-500
      focus:bg-white
      focus:ring-2
      focus:ring-blue-200
      transition
      duration-200
      "

    />


  </div>

);



export default Updateproduct;
