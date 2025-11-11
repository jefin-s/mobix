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
        status: "Placed (COD)",
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
        cart: [],
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
    <div className="w-full md:w-1/2 bg-white shadow-lg rounded-2xl p-8 space-y-8 border border-gray-200">

      {/* Shipping Details */}
      <div>
        <h1 className="text-2xl font-bold mb-5 text-gray-800">
          Shipping Details
        </h1>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="Full Name"
            className="border rounded-lg p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-300"
            onChange={(e) => setName(e.target.value)}
            disabled={paymentMethod !== "cod"}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="border rounded-lg p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-300"
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={paymentMethod !== "cod"}
          />

          <input
            type="text"
            placeholder="Address"
            className="border rounded-lg p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-300 col-span-2"
            onChange={(e) => setAddress(e.target.value)}
            disabled={paymentMethod !== "cod"}
          />

          <input
            type="text"
            placeholder="City"
            className="border rounded-lg p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-300"
            onChange={(e) => setCity(e.target.value)}
            disabled={paymentMethod !== "cod"}
          />
          <input
            type="text"
            placeholder="Pincode"
            className="border rounded-lg p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-300"
            onChange={(e) => setPicode(e.target.value)}
            disabled={paymentMethod !== "cod"}
          />
        </form>
      </div>

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
    <div className="w-full md:w-1/3 h-fit bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Order Summary
      </h1>

      {/* If Buy Now */}
      {buyNowData ? (
        <div className="space-y-3 text-center">
          <img
            src={buyNowData.image}
            alt={buyNowData.title}
            className="h-32 object-contain mx-auto"
          />
          <h2 className="text-lg font-semibold">{buyNowData.title}</h2>
          <p className="text-gray-600">Quantity: {buyNowQuantity}</p>
          <p className="text-xl font-bold text-green-600">
            ₹{buyNowData.price * buyNowQuantity}
          </p>
        </div>
      ) : (
        <div className="space-y-2 text-lg">
          <div className="flex justify-between">
            <span className="text-gray-700">Items</span>
            <span className="font-semibold">{totalQuantity}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-700">Shipping</span>
            <span className="font-semibold text-green-600">Free</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-700">Total Amount</span>
            <span className="font-semibold text-black">₹{totalprice}</span>
          </div>
        </div>
      )}

      {/* Place Order Button */}
      <div className="mt-8">
        <button
          className={`w-full py-3 rounded-xl text-lg font-semibold shadow-md transition ${
            paymentMethod === "cod"
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
          onClick={placeorder}
          disabled={paymentMethod !== "cod"}
        >
          {paymentMethod === "cod"
            ? "Place Order"
            : "COD Only Available"}
        </button>
      </div>
    </div>
  </div>
);
}

export default Checkout;
