import asyncHandler from "../middleware/asyncHandler.js";
import orderModel from "../models/Order.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { productName, quantity } = req.body;

  if (!productName || !quantity) {
    throw new Error("Both fields are required");
  }

  const userorder = await orderModel.create({
    productName,
    quantity,
    user: req.user._id,
  });

  res.status(201).json({ data: userorder });
});


export const getOrder = asyncHandler(async (req, res) => {
  // 🔹 Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  // 🔹 Filter object
  let filter = {};

  // 🔐 Admin vs User
  if (req.user.role === "admin") {
    // admin → see all orders
    filter = {};
  } else {
    // user → see only their orders
    filter = { user: req.user._id };
  }

  // 🔹 Status filter
  if (req.query.status) {
    filter.status = req.query.status;
  }

  // 🔹 Total count (for pagination)
  const total = await orderModel.countDocuments(filter);

  // 🔹 Fetch orders
  const orders = await orderModel
    .find(filter)
    .sort({ createdAt: -1 }) // latest first
    .skip(skip)
    .limit(limit);

  // 🔹 Response
  res.status(200).json({
    success: true,
    page,
    totalPages: Math.ceil(total / limit),
    totalOrders: total,
    data: orders,
  });
});


export const updateOrder = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const order = await orderModel.findById(id);

  if (!order) {
    throw new Error("Order not found");
  }

  // 🔐 Authorization
  if (
    order.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    throw new Error("Unauthorized user");
  }

  // ✅ Validate status
  const { status } = req.body;

  const allowedStatus = ["pending", "shipped", "delivered"];

  if (!allowedStatus.includes(status)) {
    throw new Error("Invalid status value");
  }

  // ✅ Update
  order.status = status;

  const updatedOrder = await order.save();

  res.status(200).json({
    data: updatedOrder,
  });
});


export const deleteOrder = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const order = await orderModel.findById(id);

  if (!order) {
    throw new Error("Order not found");
  }

  // 🔐 Authorization
  if (
    order.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    throw new Error("Unauthorized user");
  }

  await order.deleteOne();

  res.status(200).json({
    message: "Order has been deleted",
  });
});




