import React, { useContext, useState } from 'react'
import { ProductContext } from './Productcontext'

const AddForm = () => {
    const {addProducts}=useContext(ProductContext)

    const[products,setProducts]=useState({
        title:"",
        price:"",
        desciption:"",
        discountPercentage:"",
        rating:"",
        stock:"",
        brand:"",
        isActive:"",
        category:"",
        thumbnail:""       
    })

    
    const handlechange=(e)=>{
        const{name,value}=e.target;
        setProducts({...products,[name]:value})
    }
    const handesubmit=(e)=>{
        e.preventDefault()
        console.log(products);
        addProducts(products)
        
    }
  return (
    <div className='pt-20'>
      <form className="w-full max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4" onSubmit={handesubmit}>

  <h2 className="text-2xl font-bold text-gray-800 text-center">Add Product</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

    <input
      type="text"
      placeholder="Product Title"
      className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      onChange={handlechange}
      name='title'
    />

    <input
      type="text"
      placeholder="Price"
      className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      onChange={handlechange}
      name='price'
    />

    <input
      type="text"
      placeholder="Category"
      className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      onChange={handlechange}
      name='category'
    />

    <input
      type="text"
      placeholder="Image URL"
      className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      onChange={handlechange}
      name='thumbnail'
    />

    <input
      type="text"
      placeholder="Brand"
      className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      onChange={handlechange}
      name='brand'
    />

    <input
      type="text"
      placeholder="Description"
      className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none md:col-span-2"
      onChange={handlechange}
      name='desciption'
    />

    <input
      type="text"
      placeholder="Stock"
      className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      onChange={handlechange}
      name='stock'
    />

    <input
      type="text"
      placeholder="Ratings"
      className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      onChange={handlechange}
      name='ratings'
    />

    <input
      type="text"
      placeholder="Offer"
      className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      onChange={handlechange}
      name='discountPercentage'
    />
    
    <input
      type="text"
      placeholder="status"
      className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      onChange={handlechange}
      name='isActive'
    />


  </div>

  <button
    className="w-full bg-blue-600 text-white py-3 mt-4 font-semibold rounded-lg hover:bg-blue-700 transition"
  >
    Submit
  </button>
  
</form>

    </div>
  )
}

export default AddForm