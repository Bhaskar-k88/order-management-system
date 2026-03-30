import { useState, useEffect } from "react";
import { deleteOrder, getOrders, updateOrder } from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchApi = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data.data);
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  // ✅ DELETE
  const handleDelete = async (e, id) => {
    e.stopPropagation(); // 🔥 prevent card click
    try {
      await deleteOrder(id);
      setOrders((prev) =>
        prev.filter((order) => order._id !== id)
      );
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  // ✅ UPDATE STATUS
  const handleStatusChange = async (e, id) => {
    e.stopPropagation(); // 🔥 prevent navigation
    const newStatus = e.target.value;

    try {
      await updateOrder(id, { status: newStatus });

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id
            ? { ...order, status: newStatus }
            : order
        )
      );
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  if (loading)
    return (
      <h2 className="text-center text-xl mt-10 font-semibold animate-pulse">
        Loading Orders...
      </h2>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200">
      <Navbar />

      <h1 className="text-3xl font-bold text-center mt-6 mb-8">
        📊 Order Dashboard
      </h1>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
  {orders.length === 0 ? (
    <div className="col-span-full flex flex-col items-center justify-center mt-20 text-center">
      <div className="text-6xl mb-4">📦</div>

      <h2 className="text-2xl font-semibold mb-2">
        No Orders Yet
      </h2>

      <p className="text-gray-500 mb-6">
        Start by creating your first order
      </p>

      <button
        onClick={() => navigate("/createOrder")}
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
      >
        ➕ Create Order
      </button>
    </div>
  ) : (
    orders.map((order) => (   // ✅ CORRECT (no extra {})
      <div
        key={order._id}
        onClick={() =>
          navigate(`/order/${order._id}`, { state: order })
        }
        className="group bg-white rounded-2xl shadow-md p-6 cursor-pointer transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
      >
        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition">
          {order.productName}
        </h3>

        <p className="text-gray-600 mb-4">
          Quantity:{" "}
          <span className="font-medium">{order.quantity}</span>
        </p>

        <div className="mb-4">
          <span
            className={`px-3 py-1 text-sm rounded-full text-white
              ${
                order.status === "pending"
                  ? "bg-yellow-500"
                  : order.status === "shipped"
                  ? "bg-blue-500"
                  : "bg-green-500"
              }`}
          >
            {order.status}
          </span>
        </div>

        <select
          value={order.status}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) =>
            handleStatusChange(e, order._id)
          }
          className="w-full mb-4 border rounded-lg p-2"
        >
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>

        <button
          onClick={(e) => handleDelete(e, order._id)}
          className="w-full bg-red-500 text-white py-2 rounded-lg"
        >
          Delete
        </button>
      </div>
    ))
  )}
</div>

    </div>
  );
};

export default Dashboard;