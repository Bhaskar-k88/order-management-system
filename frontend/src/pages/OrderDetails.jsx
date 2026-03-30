import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const OrderDetails = () => {
  const { state: order } = useLocation();
  const navigate = useNavigate();

  if (!order) {
    return <h2 className="text-center mt-10">No order data</h2>;
  }

  const steps = ["pending", "shipped", "delivered"];
  const currentIndex = steps.indexOf(order.status);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="px-6 mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full animate-fadeIn">
          
          {/* Title */}
          <h2 className="text-3xl font-bold mb-8 text-center">
            📦 Order Details
          </h2>

          {/* 🔥 HORIZONTAL INFO */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div>
              <p className="text-gray-500">Product Name</p>
              <h3 className="text-xl font-semibold">
                {order.productName}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">Quantity</p>
              <h3 className="text-lg">{order.quantity}</h3>
            </div>

            <div>
              <p className="text-gray-500">Created At</p>
              <p>{new Date(order.createdAt).toLocaleString()}</p>
            </div>
          </div>

          {/* 🔥 STATUS TRACKER */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-6 text-center">
              Order Status
            </h3>

            <div className="flex items-center justify-between relative">
              
              {/* Line */}
              <div className="absolute top-4 left-0 w-full h-1 bg-gray-300"></div>

              {steps.map((step, index) => (
                <div
                  key={step}
                  className="flex flex-col items-center relative z-10 w-full"
                >
                  {/* Circle */}
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold
                      ${
                        index <= currentIndex
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                  >
                    ✓
                  </div>

                  {/* Label */}
                  <p
                    className={`mt-2 capitalize text-sm
                      ${
                        index <= currentIndex
                          ? "text-green-600 font-semibold"
                          : "text-gray-500"
                      }`}
                  >
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 🔥 STATUS BADGE */}
          <div className="text-center mb-6">
            <span
              className={`px-4 py-2 rounded-full text-white text-sm
                ${
                  order.status === "pending"
                    ? "bg-yellow-500"
                    : order.status === "shipped"
                    ? "bg-blue-500"
                    : "bg-green-500"
                }`}
            >
              Current Status: {order.status}
            </span>
          </div>

          {/* Back Button */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;