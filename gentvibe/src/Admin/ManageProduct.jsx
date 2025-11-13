import React, { useContext, useState } from 'react';
import { ProductContext } from './Productcontext';
import { useNavigate } from 'react-router-dom';
import Confirmodal from '../Modal/Confirmodal';

const ManageProduct = () => {
  const { products, delteProductWithid } = useContext(ProductContext);


  //  product searching
  const[searchitem,setSearchitem]=useState("")
 let  searcheditem=products.filter((item)=>(item.title??"").toLowerCase().includes(searchitem.toLowerCase()))

//  product catogory

const[category,setCategory]=useState("all")
if(category!="all"){
   searcheditem=searcheditem.filter((item)=>item.category===category)
}

// filter outof stock
const[deleted,setDeleted]=useState("all")

if(deleted!="all"){
  const boolValue=deleted==="true"
  searcheditem=searcheditem.filter((item)=>item.isDeleted===boolValue)
}


  // modal logic
  const [showmodal, setShowmodal] = useState(false);
  const [selectwithProductId, setSelectwithProductId] = useState("");


  const handleWithid = (itemId) => {
    setSelectwithProductId(itemId);
    setShowmodal(true);
  };

  const confirmDelete = () => {
    if (selectwithProductId) {
      delteProductWithid(selectwithProductId);
    }
    setShowmodal(false);
    setSelectwithProductId(null);
  };

  const cancelDelete = () => {
    setShowmodal(false);
    setSelectwithProductId(null);
  };

  const navigate = useNavigate();

  // search the product by admin

 

  return (
    <div className="pt-20 px-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Manage Products</h1>
        <input type="text" className='border' onChange={(e)=>setSearchitem(e.target.value)}/>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-4 py-2 rounded-lg shadow-sm"
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
          className="border px-4 py-2 rounded-lg shadow-sm"
        >
          <option value="all">All products</option>
          <option value="true">deleted</option>
          <option value="false">not deleted</option>
          
         
        </select>

        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 shadow-md"
          onClick={() => navigate('/addform')}
        >
          + Add Product
        </button>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-6 text-left border-b">#</th>
              <th className="py-3 px-6 text-left border-b">Thumbnail</th>
              <th className="py-3 px-6 text-left border-b">Title</th>
              <th className="py-3 px-6 text-left border-b">Category</th>
              <th className="py-3 px-6 text-left border-b">Price</th>
              <th className="py-3 px-6 text-left border-b">status</th>
              <th className="py-3 px-6 text-center border-b">Actions</th>
             
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {searcheditem.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 transition duration-150 border-b"
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-16 w-16 object-cover rounded-md"
                  />
                </td>
                <td className="py-3 px-6 font-medium">{item.title}</td>
                <td className="py-3 px-6">{item.category}</td>
                <td className="py-3 px-6">{item.price}</td>
                <td className="py-3 px-6" style={{color:item.isDeleted?"red":"green"}}>{item.isDeleted?"Outofstock":"instock"}</td>
                <td className="py-3 px-6 text-center flex items-center justify-center gap-2">
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 shadow"
                    onClick={() => handleWithid(item.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 shadow"
                    onClick={() => navigate(`/updatept/${item.id}`)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showmodal && (
        <Confirmodal
          title="Confirm Deletion"
          message="Are you sure you want to delete this product?"
          confirmText="Yes, Delete"
          cancelText="Cancel"
          confirmDelete={confirmDelete}
          cancelDelete={cancelDelete}
        />
      )}
    </div>
  );
};

export default ManageProduct;
