import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "shipped", "delivered"],
      default: "pending",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;