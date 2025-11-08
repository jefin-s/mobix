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
    <div className="min-h-screen w-full flex flex-col md:flex-row justify-around items-start p-6 bg-gray-100">
      {/* Left: Address + Payment */}
      <div className="space-y-8 w-full md:w-1/2 bg-white rounded-2xl p-6 shadow-md">
        <div>
          <h1 className="text-2xl font-semibold mb-4">Shipping Details</h1>
          <form className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              className="border rounded-md p-2"
              onChange={(e) => setName(e.target.value)}
              disabled={paymentMethod !== "cod"}
            />
            <input
              type="text"
              placeholder="Address"
              className="border rounded-md p-2"
              onChange={(e) => setAddress(e.target.value)}
              disabled={paymentMethod !== "cod"}
            />
            <input
              type="text"
              placeholder="City"
              className="border rounded-md p-2"
              onChange={(e) => setCity(e.target.value)}
              disabled={paymentMethod !== "cod"}
            />
            <input
              type="text"
              placeholder="Pincode"
              className="border rounded-md p-2"
              onChange={(e) => setPicode(e.target.value)}
              disabled={paymentMethod !== "cod"}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="border rounded-md p-2"
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={paymentMethod !== "cod"}
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
                checked={paymentMethod === "online"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Online Payment (Razorpay)</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Cash on Delivery</span>
            </label>
          </div>
        </div>
      </div>

      
      <div className="h-96 w-96 bg-white rounded-2xl shadow-md p-4 mt-6 md:mt-0">
        <h1 className="text-2xl text-center mb-5 font-semibold">
          Order Summary
        </h1>
   {buyNowData ? (
    
    <div className="flex flex-col items-center gap-4">
      
      <h2 className="text-lg font-semibold">{buyNowData.title}</h2>
      <p>Quantity: {buyNowQuantity}</p>
      <p className="font-semibold text-green-600">
        ₹{buyNowData.price * buyNowQuantity}
      </p>
    </div>
  ) : (
  
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
  )}
        
        <div className="flex justify-center mt-8">
          <button
            className={`px-6 py-2 rounded-md transition text-white ${
              paymentMethod === "cod"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
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
};  

export default Checkout;
