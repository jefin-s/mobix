import React, { useContext, useState } from "react";
import { CartContext } from "../../components.jsx/Context/Cartcontext";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "../../components.jsx/Context/Authcontext";
import { base_url } from "../../api/api";
import axios from "axios";
import { toast } from "react-toastify";

const Checkout = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPicode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { user } = useContext(Authcontext);
  const { cart, totalQuantity, totalprice } = useContext(CartContext);

  const navigate = useNavigate();

  const placeorder = async () => {
    if (!name || !address || !city || !pincode || !phoneNumber) {
      toast.warning("please fill the address");
      return;
    }
    
    if (cart.length === 0) {
      toast.warning("Your cart is empty");
      return;
    }
    try {
      const res = await axios.get(`${base_url}/users/${user.id}`);
      const userData = res.data;

      const newOrder = {
        orderId: Date.now(),
        items: cart,
        totalAmount: totalprice,
        status: "placed",
        address: {
          name,
          address,
          city,
          pincode,
          phoneNumber,
        },
        created_at: new Date().toISOString(),
      };
      const updatedData = {
        ...userData,
        orders: [...userData.orders, newOrder],
        cart: [],
      };
      await axios.patch(`${base_url}/users/${user.id}`, updatedData);
      toast.success("Oreder placed successfully");
      navigate("/order");
    } catch (error) {
      console.log(error);
      toast.error("Something Went wrong");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row justify-around items-start p-6 bg-gray-100">
      <div className="space-y-8 w-full md:w-1/2 bg-white rounded-2xl p-6 shadow-md">
        <div>
          <h1 className="text-2xl font-semibold mb-4">Shipping Details</h1>
          <form className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              className="border rounded-md p-2"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Address"
              className="border rounded-md p-2"
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="City"
              className="border rounded-md p-2"
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="Pincode"
              className="border rounded-md p-2"
              onChange={(e) => setPicode(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="border rounded-md p-2"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </form>
        </div>

        <div>
          <h1 className="text-2xl font-semibold mb-4">Payment Method</h1>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="online"
                defaultChecked
              />
              <span>Online Payment (Razorpay)</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" value="cod" />
              <span>Cash on Delivery</span>
            </label>
          </div>
        </div>
      </div>

      <div className="h-96 w-96 bg-white rounded-2xl shadow-md p-4 mt-6 md:mt-0">
        <h1 className="text-2xl text-center mb-5 font-semibold">
          Order Summary
        </h1>

        <div className="flex justify-between px-4 leading-8">
          <div>
            <h1>Quantity</h1>
            <h1>Shipping</h1>
            <h1>Total Price</h1>
          </div>
          <div className="text-right">
            <h1>{totalQuantity}</h1>
            <h1>Free</h1>
            <h1>₹{totalprice}</h1>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={placeorder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
