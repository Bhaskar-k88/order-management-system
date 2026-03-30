import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // 🔹 Only redirect if token is explicitly missing
  if (!token) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;