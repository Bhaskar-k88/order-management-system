import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateOrder from "./pages/CreateOrder";
import ProtectedRoute from "./routes/ProtectedRoute";
import OrderDetails from "./pages/OrderDetails";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* ✅ NO redirect logic here */}
      <Route path="/" element={<Login />} />

      {/* Public Routes */}
      <Route
        path="/login"
        element={!token ? <Login /> : <Navigate to="/dashboard" replace />}
      />

      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/createOrder"
        element={
          <ProtectedRoute>
            <CreateOrder />
          </ProtectedRoute>
        }
      />



<Route
  path="/order/:id"
  element={
    <ProtectedRoute>
      <OrderDetails />
    </ProtectedRoute>
  }
/>
    </Routes>
  );
};

export default App;