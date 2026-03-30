import { useState, useEffect } from "react";
import { deleteOrder, getOrders, updateOrder } from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch Orders
  const fetchApi = async () => {
    try {
      const res = await getOrders();
      const fetchedOrders = res.data.data;
      setOrders(fetchedOrders);

      // Show SweetAlert if no orders
      if (fetchedOrders.length === 0) {
        Swal.fire({
          title: "📦 No Orders Yet!",
          text: "You have no orders. Click below to create your first order.",
          icon: "info",
          confirmButtonText: "Create Order",
          showCancelButton: true,
          cancelButtonText: "Later",
          confirmButtonColor: "#10b981",
          cancelButtonColor: "#6b7280",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/createOrder");
          }
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to fetch orders",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  // DELETE Order
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This order will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteOrder(id);
        setOrders((prev) => prev.filter((order) => order._id !== id));
        Swal.fire("Deleted!", "Order has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", error.response?.data?.message || "Failed to delete order", "error");
      }
    }
  };

  // UPDATE STATUS
  const handleStatusChange = async (e, id) => {
    e.stopPropagation();
    const newStatus = e.target.value;

    try {
      await updateOrder(id, { status: newStatus });
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );
      Swal.fire("Updated!", `Order status changed to "${newStatus}"`, "success");
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.message || "Failed to update status", "error");
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
        {orders.map((order) => (
          <div
            key={order._id}
            onClick={() => navigate(`/order/${order._id}`, { state: order })}
            className="group bg-white rounded-2xl shadow-md p-6 cursor-pointer transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition">
              {order.productName}
            </h3>

            <p className="text-gray-600 mb-4">
              Quantity: <span className="font-medium">{order.quantity}</span>
            </p>

            <div className="mb-4">
              <span
                className={`px-3 py-1 text-sm rounded-full text-white ${
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
              onChange={(e) => handleStatusChange(e, order._id)}
              className="w-full mb-4 border rounded-lg p-2"
            >
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>

            <button
              onClick={(e) => handleDelete(e, order._id)}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 active:scale-95 transition transform"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;