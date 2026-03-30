import React, { useState } from "react";
import { createOrder } from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2"; // ✅ import SweetAlert2

const CreateOrder = () => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation with SweetAlert2
    if (!productName || !quantity) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "All fields are required!",
      });
      return;
    }

    if (Number(quantity) <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Quantity",
        text: "Quantity must be greater than 0",
      });
      return;
    }

    try {
      setLoading(true);

      await createOrder({
        productName,
        quantity: Number(quantity),
      });

      // ✅ Success message
      Swal.fire({
        icon: "success",
        title: "Order Created",
        text: `Order "${productName}" created successfully! ✅`,
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Error creating order",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex justify-center items-center mt-10 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create New Order 📦
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Name */}
            <input
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Quantity */}
            <input
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
            >
              {loading ? "Creating..." : "Create Order"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;