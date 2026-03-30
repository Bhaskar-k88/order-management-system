import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
  const token = localStorage.getItem("token");
  if (token) {
    localStorage.removeItem("token");
    navigate("/login", { replace: true }); // 🔹 replace avoids history stacking
  }
};
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo / Title */}
      <h1
        onClick={() => navigate("/dashboard")}
        className="text-xl font-bold text-blue-600 cursor-pointer"
      >
        OrderApp
      </h1>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/createOrder")}
          className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
        >
          Create Order
        </button>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;