import React, { useContext, useEffect, useState } from 'react'
import { Authcontext } from '../../components.jsx/Context/Authcontext'
import axios from 'axios'
import { base_url } from '../../api/api'

const Orders = () => {

    const {user}=useContext(Authcontext)
    const[orders,setOrders]=useState([])
    useEffect(()=>{
        const fetchOrdresfromuser=async()=>{
            try{
            const response=await axios.get(`${base_url}/users/${user.id}`)
            setOrders(response.data.orders||[])
            }
            catch(err){
                console.log(err);
                
            }

        }
        fetchOrdresfromuser()
    },[user])
   

    const deleteOrder= async(orderid)=>{
      try{
        const res=  await axios.get(`${base_url}/users/${user.id}`)
        const userData=res.data
        const  updatedOrders=userData.orders.filter((order)=>order.orderId!==orderid)

        await axios.patch(`${base_url}/users/${user.id}`,{
          orders:updatedOrders
        })
        setOrders(updatedOrders)
      }

      catch(error){
        console.log(error);
        
      }

    }
  return (

     <div className="p-6">
      <h1 className="text-2xl font-semibold mb-5">🧾 My Orders</h1>

      {orders.length === 0 && (
        <p className="text-gray-600">You have not placed any orders yet.</p>
      )}

      {orders.map((order) => (
        <div
          key={order.orderId}
          className="border border-gray-300 rounded p-4 mb-4 shadow-sm"
        >
          <div className="flex justify-between items-center">
            <div>
              <p>
                <strong>Order ID:</strong> {order.orderId}
              </p>
              <p className="text-green-600 font-semibold">status:{order.status}</p>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => deleteOrder(order.orderId)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete Order
            </button>
          </div>

          <p className="mt-1">
            <strong>Total Amount:</strong> ₹{order.totalAmount}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Ordered on: {new Date(order.created_at).toLocaleString()}
          </p>

          <div className="mt-3">
            <strong>Items:</strong>
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 mt-2">
                <img
                  src={item.thumbnail}
                  alt=""
                  className="w-12 h-12 rounded"
                />
                <p>{item.title}</p>
                <p className="font-semibold">x{item.quantity}</p>
                
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Orders