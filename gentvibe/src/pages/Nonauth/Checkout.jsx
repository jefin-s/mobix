import React, { useContext, useEffect, useState } from "react"; 
import { CartContext } from "../../components/Context/Cartcontext";
import { OrderContext } from "../../components/Context/UserOrderContext";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";

const Checkout = () => {
  // Address States
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("India");
  const [isDefault, setIsDefault] = useState(false);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const { grandTotal, clearCart } = useContext(CartContext);
  const { placeCartOrder, buyNowOrder } = useContext(OrderContext);

  const navigate = useNavigate();
  const location = useLocation();

  const buyNowData = location.state?.product || null;
  const buyNowQuantity = location.state?.quantity || 1;

  const total =
    buyNowData
      ? buyNowData.price * buyNowQuantity
      : grandTotal;

  // Fetch addresses
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await axiosInstance.get("/Address/getaddresses");
      setAddresses(res.data.data);
      const defaultAddr = res.data.data.find(x => x.isDefault);
      if (defaultAddr) setSelectedAddress(defaultAddr.addressId);
    } catch {
      toast.error("Failed to load addresses");
    }
  };

  // Save new address
  const saveAddress = async () => {
    try {
      const res = await axiosInstance.post("/Address/addaddress", {
        fullName,
        phone,
        addressLine1,
        addressLine2,
        city,
        state,
        pincode,
        country,
        isDefault
      });
      return res.data.data; // return new addressId
    } catch {
      toast.error("Failed to save address");
      return null;
    }
  };

const startRazorpayPayment = async (orderId) => {

    try {

        const res = await axiosInstance.post(`/Payment/create/${orderId}`);

        const razorpayOrder = res.data.data;

        const options = {

            key: razorpayOrder.key,

            amount: razorpayOrder.amount,

            currency: razorpayOrder.currency,

            order_id: razorpayOrder.orderId,

            handler: async function (response) {

                await axiosInstance.post("/Payment/verify", {

                    razorpayOrderId: response.razorpay_order_id,

                    razorpayPaymentId: response.razorpay_payment_id,

                    razorpaySignature: response.razorpay_signature,

                });

                toast.success("Payment Successful");

                if (!buyNowData) clearCart();

                navigate("/order");

            }

        };

        const razor = new window.Razorpay(options);

        razor.open();

    }

    catch {

        toast.error("Payment Failed");

    }

};

const getPaymentMethodValue = () => {
  return paymentMethod === "cod" ? 1 : 2;
};

  // Place order
  const placeOrder = async () => {
  setLoading(true);

  try {

    let addressId = selectedAddress;

    if (!addressId) {
      addressId = await saveAddress();
      if (!addressId) return;
    }

    let orderId;

    if (buyNowData) {

      orderId = await buyNowOrder(
        buyNowData.id,
        buyNowQuantity,
        addressId,
        getPaymentMethodValue()
      );

    } else {

      orderId = await placeCartOrder(
        addressId,
        getPaymentMethodValue()
      );

    }


    if (paymentMethod === "cod") {

      toast.success("Order Placed Successfully");

      if (!buyNowData) clearCart();

      navigate("/order");

    } else {

      await startRazorpayPayment(orderId);

    }

  }
  catch (error) {

    toast.error("Order Failed");

  }

  setLoading(false);
};

  return (
    <div className="min-h-screen bg-black pt-24 pb-10 px-6 flex justify-center">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-6">

        {/* LEFT: Address */}
        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
          <h2 className="text-white text-lg font-semibold mb-4">Select Address</h2>

          {addresses.map(addr => (
            <div
              key={addr.addressId}
              onClick={() => setSelectedAddress(addr.addressId)}
              className={`border p-3 mb-3 rounded cursor-pointer
                ${selectedAddress === addr.addressId
                  ? "border-white bg-zinc-800"
                  : "border-zinc-700"}`}
            >
              <p className="text-white">{addr.fullName}</p>
              <p className="text-gray-400">{addr.addressLine1}</p>
              <p className="text-gray-400">{addr.city}</p>
              <p className="text-gray-400">{addr.phone}</p>
            </div>
          ))}

          <hr className="my-4 border-zinc-700" />

          <h3 className="text-white mb-2">Add New Address</h3>
          <input placeholder="Full Name" className="input-dark" onChange={(e) => setFullName(e.target.value)} />
          <input placeholder="Phone" className="input-dark" onChange={(e) => setPhone(e.target.value)} />
          <input placeholder="Address Line 1" className="input-dark" onChange={(e) => setAddressLine1(e.target.value)} />
          <input placeholder="Address Line 2" className="input-dark" onChange={(e) => setAddressLine2(e.target.value)} />
          <input placeholder="City" className="input-dark" onChange={(e) => setCity(e.target.value)} />
          <input placeholder="State" className="input-dark" onChange={(e) => setState(e.target.value)} />
          <input placeholder="Pincode" className="input-dark" onChange={(e) => setPincode(e.target.value)} />

          <div className="mt-4">
            <label className="text-white flex gap-2">
              <input type="radio" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
              Cash on Delivery
            </label>
            <label className="text-white flex gap-2 mt-2">
              <input type="radio" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} />
              Online Payment
            </label>
          </div>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 h-fit">
          <h2 className="text-white text-lg font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between text-gray-400 mb-3">
            <span>Total</span>
            <span className="text-white font-semibold">₹{total}</span>
          </div>
          <button
            onClick={placeOrder}
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Checkout;