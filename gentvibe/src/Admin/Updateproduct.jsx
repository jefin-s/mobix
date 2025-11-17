import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { base_url } from '../api/api'
import axios from 'axios'
import toast from 'react-hot-toast'

const Updateproduct = () => {
  const navigate = useNavigate()
  const { p_id } = useParams()

  const [productsWithid, setProductWithid] = useState({
    title: '',
    price: '',
    description: '',
    discountPercentage: '',
    rating: '',
    stock: '',
    brand: '',
    isActive: '',
    category: '',
    thumbnail: '',
  })

  const handlechange = (e) => {
    const { name, value } = e.target
    setProductWithid({ ...productsWithid, [name]: value })
  }

  const fetchproductforUpdate = async () => {
    try {
      const product_data = await axios.get(`${base_url}/products/${p_id}`)
      setProductWithid(product_data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchproductforUpdate()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.put(`${base_url}/products/${p_id}`, productsWithid)
    toast.success('Product Updated Successfully ✅')
    navigate('/admin/allproducts')
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
        <h1 className="text-center text-3xl font-bold text-blue-600 mb-2">
          Update Product
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Editing Product ID: <span className="font-semibold">{p_id}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
         
          {productsWithid.thumbnail && (
            <div className="flex justify-center mb-4">
              <img
                src={productsWithid.thumbnail}
                alt={productsWithid.title || 'Product image'}
                className="w-32 h-32 object-cover rounded-xl border shadow-sm"
              />
            </div>
          )}

        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField
              label="Product Title"
              name="title"
              value={productsWithid.title}
              onChange={handlechange}
            />

            <InputField
              label="Price"
              name="price"
              value={productsWithid.price}
              onChange={handlechange}
            />

            <InputField
              label="Category"
              name="category"
              value={productsWithid.category}
              onChange={handlechange}
            />

            <InputField
              label="Image URL"
              name="thumbnail"
              value={productsWithid.thumbnail}
              onChange={handlechange}
            />

            <InputField
              label="Brand"
              name="brand"
              value={productsWithid.brand}
              onChange={handlechange}
            />

            <InputField
              label="Stock"
              name="stock"
              value={productsWithid.stock}
              onChange={handlechange}
            />

            <InputField
              label="Ratings"
              name="rating"
              value={productsWithid.rating}
              onChange={handlechange}
            />

            <InputField
              label="Offer (%)"
              name="discountPercentage"
              value={productsWithid.discountPercentage}
              onChange={handlechange}
            />

            <InputField
              label="Status (Active / Inactive)"
              name="isActive"
              value={productsWithid.isActive}
              onChange={handlechange}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={productsWithid.description}
              onChange={handlechange}
              placeholder="Enter product description..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  )
}


const InputField = ({ label, name, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-gray-700 font-medium mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={label}
      className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
    />
  </div>
)

export default Updateproduct
