import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api",
});

// 🔥 ADD THIS (MOST IMPORTANT)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// 🔐 Your existing response interceptor (keep it)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default API;

// 🔹 Auth APIs
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// 🔹 Order APIs
export const getOrders = () => API.get("/orders");

export const createOrder = (data) => API.post("/orders", data);

export const updateOrder = (id, data) =>
  API.put(`/orders/${id}`, data);

export const deleteOrder = (id) =>
  API.delete(`/orders/${id}`);