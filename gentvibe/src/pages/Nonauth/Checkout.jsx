import React, { useContext, useState } from "react";
import { CartContext } from "../../components.jsx/Context/Cartcontext";
import { useLocation, useNavigate } from "react-router-dom";
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
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const location =useLocation()
  const buyNowData=location.state?.product||null
  const buyNowQuantity=location.state?.quantity||1
  
  const { user } = useContext(Authcontext);
  const { cart, totalQuantity, totalprice } = useContext(CartContext);

  const navigate = useNavigate();

  const placeorder = async () => {
    if (paymentMethod !== "cod") {
      toast.info("Only Cash on Delivery is available currently.");
      return;
    }

    if (!name || !address || !city || !pincode || !phoneNumber) {
      toast.warning("Please fill all shipping details");
      return;
    }

    if (!buyNowData&&cart.length === 0) {
      toast.warning("Your cart is empty");
      return;
    }

    try {
      const res = await axios.get(`${base_url}/users/${user.id}`);
      const userData = res.data;
      //  if the buy now data is  exist return  an array name as order items store an array array containg  spead the buy now data adn set quantiry is 1
     const orderitems=buyNowData?[{...buyNowData,quantity:buyNowQuantity}]:cart;
     const totalAmount=buyNowData?buyNowData.price*buyNowQuantity:totalprice
      const newOrder = {
        orderId: Date.now(),
        items: orderitems,
        totalAmount: totalAmount,
        status: "Pending",
        paymentMethod: "Cash on Delivery",
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
        cart: buyNowData?userData.cart:[],
      };

      await axios.patch(`${base_url}/users/${user.id}`, updatedData);
      toast.success("Order placed successfully!");
      navigate("/order");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

 return (
  <div className="min-h-screen w-full bg-gray-100 pt-24 pb-10 px-6 flex flex-col md:flex-row gap-10 justify-center">

    {/* LEFT SECTION */}
    <div className="w-full md:w-1/2 bg-white  rounded p-8 space-y-8 border border-gray-200">

      {/* Shipping Details */}
      <div>
        <h1 className="text-2xl font-bold mb-5 text-gray-800">
          Shipping Details
        </h1>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="Full Name"
            className="border  p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-300"
            onChange={(e) => setName(e.target.value)}
            disabled={paymentMethod !== "cod"}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="border  p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-300"
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={paymentMethod !== "cod"}
          />

          <input
            type="text"
            placeholder="Address"
            className="border p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-300 col-span-2"
            onChange={(e) => setAddress(e.target.value)}
            disabled={paymentMethod !== "cod"}
          />

          <input
            type="text"
            placeholder="City"
            className="border -lg p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-300"
            onChange={(e) => setCity(e.target.value)}
            disabled={paymentMethod !== "cod"}
          />
          <input
            type="text"
            placeholder="Pincode"
            className="border -lg p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-300"
            onChange={(e) => setPicode(e.target.value)}
            disabled={paymentMethod !== "cod"}
          />
        </form>
      </div>
 <hr className="my-3" />
      {/* Payment Method */}
      <div>
        <h1 className="text-2xl font-bold mb-5 text-gray-800">
          Payment Method
        </h1>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="online"
              checked={paymentMethod === "online"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-5 h-5 cursor-pointer"
            />
            <span className="text-gray-700 text-lg">Online Payment (Razorpay)</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-5 h-5 cursor-pointer"
            />
            <span className="text-gray-700 text-lg">Cash on Delivery</span>
          </label>
        </div>
      </div>
    </div>

  {/* RIGHT SECTION */}
<div className="w-full md:w-1/3 h-fit bg-white shadow-xl rounded p-8 border border-gray-300">

  <h1 className="text-2xl font-bold text-gray-800 mb-6">
    Order Summary
  </h1>

  {/* BUY NOW */}
  {buyNowData ? (
    <div className="space-y-4">

      <div className="flex justify-between text-gray-600 text-sm">
        <span>Subtotal</span>
        <span>₹{buyNowData.price * buyNowQuantity}</span>
      </div>

      <div className="flex justify-between text-gray-600 text-sm">
        <span>Shipping</span>
        <span className="text-green-600 font-medium">FREE</span>
      </div>

      <div className="flex justify-between text-gray-600 text-sm">
        <span>Tax (18%)</span>
        <span>₹0.00</span>
      </div>

      <hr className="my-3" />

      <div className="flex justify-between text-lg font-bold text-gray-900 mb-4">
        <span>Total</span>
        <span>₹{buyNowData.price * buyNowQuantity}</span>
      </div>

    </div>
  ) : (
    <div className="space-y-4">

      <div className="flex justify-between text-gray-600 text-sm">
        <span>Subtotal</span>
        <span>₹{totalprice}</span>
      </div>

      <div className="flex justify-between text-gray-600 text-sm">
        <span>Shipping</span>
        <span className="text-green-600 font-medium">FREE</span>
      </div>

      <div className="flex justify-between text-gray-600 text-sm">
        <span>Tax (18%)</span>
        <span>₹0.00</span>
      </div>

      <hr className="my-3" />

      <div className="flex justify-between text-lg font-bold text-gray-900 mb-4">
        <span>Total</span>
        <span>₹{totalprice}</span>
      </div>

    </div>
  )}

  {/* COMPLETE PAYMENT BUTTON */}
  <button
    className={`w-full py-3 rounded-xl text-lg font-semibold shadow-sm transition-all ${
      paymentMethod === "cod"
        ? "bg-gray-500 text-white hover:bg-gray-600"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
    onClick={placeorder}
    disabled={paymentMethod !== "cod"}
  >
    Complete Payment
  </button>

  {/* TERMS TEXT */}
  <p className="text-xs text-gray-500 mt-3 text-center">
    By completing your purchase, you agree to our Terms of Service and Privacy Policy.
  </p>

  <hr className="my-6" />

  {/* SECURE PAYMENT ICONS */}
  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center justify-center">
    Secure Payment
  </h3>

  <div className="flex items-center gap-4 justify-center">
  
    <img src="/public/mastercard.png" className="h-8" />
    <img src="/public/paytm.png" className="h-8" />
    <img src="/public/gpay.png" className="h-8" />
    <img src="/public/razorpay.png" className="h-8" />
  </div>

</div>

  </div>
);
}

export default Checkout;
