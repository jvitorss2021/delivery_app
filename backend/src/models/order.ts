import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: [
    {
      id: Number,
      name: String,
      price: String,
      quantity: Number,
      image: String,
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  deliveryTime: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
