import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../components/Context/Cartcontext";
import { OrderContext } from "../../components/Context/UserOrderContext";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";

const Checkout = () => {

  // ADDRESS STATES
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


  // FETCH ADDRESSES
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {

    try {

      const res = await axiosInstance.get("/Address/getaddresses");

      console.log(res.data.data)
      setAddresses(res.data.data);

      const defaultAddr = res.data.data.find(x => x.isDefault);

      if (defaultAddr)
        setSelectedAddress(defaultAddr.addressId);

    }
    catch {

      toast.error("Failed to load addresses");

    }

  };


  // SAVE ADDRESS
  const saveAddress = async () => {

    const res = await axiosInstance.post(

      "/Address/addaddress",

      {
        fullName,
        phone,
        addressLine1,
        addressLine2,
        city,
        state,
        pincode,
        country,
        isDefault
      }

    );

    return res.data.data;

  };


  // RAZORPAY PAYMENT
  const startRazorpayPayment = async (addressId) => {

    try {

      const res = await axiosInstance.post(

        "/Payment/CreateOrder",

        {
          amount: total
        }

      );

      const order = res.data;


      const options = {

        key: order.key,

        amount: order.amount * 100,

        currency: order.currency,

        order_id: order.orderId,


        handler: async function (response) {

          await axiosInstance.post(

            "/Payment/VerifyPayment",

            {

              razorpayOrderId: response.razorpay_order_id,

              razorpayPaymentId: response.razorpay_payment_id,

              razorpaySignature: response.razorpay_signature

            }

          );


          if (buyNowData) {

            await buyNowOrder(

              buyNowData.id,

              buyNowQuantity,

              addressId

            );

          }
          else {

            await placeCartOrder(addressId);

            clearCart();

          }


          toast.success("Payment Successful");

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


  // PLACE ORDER
  const placeorder = async () => {

    setLoading(true);

    try {

      let addressId = selectedAddress;


      if (!addressId) {

        addressId = await saveAddress();

      }

      

      // COD
      if (paymentMethod === "cod") {

        if (buyNowData) {

          await buyNowOrder(

            buyNowData.id,

            buyNowQuantity,

            addressId

          );

        }
        else {

          await placeCartOrder(addressId);

          clearCart();

        }

        toast.success("Order placed");

        navigate("/order");

      }


      // ONLINE PAYMENT
      else {

        await startRazorpayPayment(addressId);

      }

    }

    catch {

      toast.error("Order Failed");

    }

    setLoading(false);

  };


  return (

    <div className="min-h-screen bg-black pt-24 pb-10 px-6 flex justify-center">

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-6">


        {/* LEFT */}

        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">

          <h2 className="text-white text-lg font-semibold mb-4">

            Select Address

          </h2>


         {
  addresses.map(addr => (

    <div
      key={addr.addressId}

      onClick={() => setSelectedAddress(addr.addressId)}

      className={`border p-3 mb-3 rounded cursor-pointer

      ${selectedAddress === addr.addressId
        ? "border-white bg-zinc-800"
        : "border-zinc-700"}

      `}
    >

      <p className="text-white">{addr.fullName}</p>

      <p className="text-gray-400">{addr.addressLine1}</p>

      <p className="text-gray-400">{addr.city}</p>

      <p className="text-gray-400">{addr.phone}</p>

    </div>

  ))
}


          <hr className="my-4 border-zinc-700" />


          <h3 className="text-white mb-2">

            Add New Address

          </h3>


          <input placeholder="Full Name" className="input-dark"
            onChange={(e) => setFullName(e.target.value)} />


          <input placeholder="Phone" className="input-dark"
            onChange={(e) => setPhone(e.target.value)} />


          <input placeholder="Address Line 1" className="input-dark"
            onChange={(e) => setAddressLine1(e.target.value)} />


          <input placeholder="City" className="input-dark"
            onChange={(e) => setCity(e.target.value)} />


          <input placeholder="State" className="input-dark"
            onChange={(e) => setState(e.target.value)} />


          <input placeholder="Pincode" className="input-dark"
            onChange={(e) => setPincode(e.target.value)} />


          {/* PAYMENT METHOD */}

          <div className="mt-4">

            <label className="text-white flex gap-2">

              <input

                type="radio"

                checked={paymentMethod === "cod"}

                onChange={() => setPaymentMethod("cod")}

              />

              Cash on Delivery

            </label>


            <label className="text-white flex gap-2 mt-2">

              <input

                type="radio"

                checked={paymentMethod === "online"}

                onChange={() => setPaymentMethod("online")}

              />

              Online Payment

            </label>

          </div>


        </div>



        {/* RIGHT */}

        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 h-fit">


          <h2 className="text-white text-lg font-semibold mb-4">

            Order Summary

          </h2>


          <div className="flex justify-between text-gray-400 mb-3">

            <span>Total</span>

            <span className="text-white font-semibold">

              ₹{total}

            </span>

          </div>


          <button

            onClick={placeorder}

            disabled={loading}

            className="w-full bg-white text-black py-3 rounded"

          >

            {

              loading

                ? "Processing..."

                : "Place Order"

            }

          </button>


        </div>


      </div>


    </div>

  );

};

export default Checkout;
