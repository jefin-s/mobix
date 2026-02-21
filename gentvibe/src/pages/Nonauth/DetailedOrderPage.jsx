import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { OrderContext } from "../../components/Context/UserOrderContext";
import {
  CheckCircleIcon
} from "@heroicons/react/24/solid";

const DetailedOrderPage = () => {

const { orderid } = useParams();

const { fetchOrderDetails, orderDetails } = useContext(OrderContext);


useEffect(() => {

fetchOrderDetails(orderid);

}, [orderid]);


if (!orderDetails)
return <div className="p-10">Loading...</div>;


// Status steps

const steps = [

"Pending",

"Confirmed",

"Packed",

"Shipped",

"Delivered"

];

const currentStep = steps.indexOf(orderDetails.orderStatus);



return (

<div className="bg-gray-100 min-h-screen pt-20 p-4 md:p-10 text-black">


<div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">


{/* Header */}

<h1 className="text-xl font-semibold mb-6">

Order Details

</h1>



{/* Product Images */}

<div className="flex gap-4 overflow-x-auto mb-6">

{orderDetails.items.map(item => (

<img

key={item.productId}

src={item.thumbnail}

className="w-40 h-40 object-cover rounded-lg border"

/>

))}

</div>



{/* Order Info */}

<div className="mb-6">

<p className="font-semibold">

Order #{orderDetails.orderId}

</p>

<p>

Subtotal: ₹{orderDetails.totalAmount}

</p>

<p>

Shipping Fee: Free

</p>

<p className="font-bold">

Total: ₹{orderDetails.totalAmount}

</p>

</div>



{/* Status Progress */}

<div className="mb-6">

<h2 className="font-semibold mb-4">

Order Status

</h2>



<div className="flex items-center justify-between">

{steps.map((step, index) => (

<div

key={step}

className="flex flex-col items-center flex-1"

>


<div

className={`w-6 h-6 rounded-full flex items-center justify-center

${index <= currentStep

? "bg-green-500"

: "bg-gray-300"

}`}

>

{index <= currentStep && (

<CheckCircleIcon className="w-5 text-white"/>

)}

</div>



<p className="text-sm mt-2">

{step}

</p>


</div>

))}

</div>


</div>



{/* Shipping */}

<div>

<h2 className="font-semibold mb-2">

Shipping Address

</h2>


<p>

{orderDetails.shippingFullName}

</p>


<p>

{orderDetails.shippingAddressLine1}

</p>


<p>

{orderDetails.shippingCity}

</p>


<p>

{orderDetails.shippingState}

</p>


<p>

{orderDetails.shippingPincode}

</p>


<p>

{orderDetails.shippingCountry}

</p>


<p>

{orderDetails.shippingPhone}

</p>


</div>


</div>


</div>

);

};


export default DetailedOrderPage;