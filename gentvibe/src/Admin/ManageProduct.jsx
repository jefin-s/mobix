import React, { useContext } from 'react'
import { ProductContext } from './Productcontext'
import { useNavigate } from 'react-router-dom'

const ManageProduct = () => {
  const { products,delteProductWithid } = useContext(ProductContext)
  const navigate = useNavigate()

  return (
    <div className="pt-20 px-6">
      
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Manage Products</h1>
        <button 
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 shadow-md"
          onClick={() => navigate('/addform')}
        >
          + Add Product
        </button>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item) => (
          <div 
            key={item.id}
            className="bg-white shadow-md rounded-xl p-4 border hover:shadow-xl transition duration-300"
          >
            
            {/* Product Image */}
            <div className="w-full h-40 flex justify-center">
              <img 
                src={item.thumbnail} 
                alt={item.title} 
                className="h-full w-auto object-cover rounded-md"
              />
            </div>

            {/* Product Details */}
            <div className="mt-4 space-y-1">
              <p className="text-sm text-gray-500 font-medium">ID: {item.id}</p>
              <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
              <p className="text-gray-600">{item.category}</p>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-5">
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 shadow" onClick={()=>{delteProductWithid(item.id)}}>
                Delete
              </button>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 shadow" onClick={()=>{}}>
                Update
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageProduct
