const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products"
  },
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending"
  },
  payementMethod: {
    type: string,
    enum: [ "online", "cod" ],
    default: "cod"
  },
  orderId: {
    type: string,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: [ "pending", "completed", "failed" ],
    default: "pending"
  },
  address: {
    type: String,
    required: true
  },
  deliveryCharge: {
    type: Number
  },
  totalAmount: {
    type: Number,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  transactionId: {
    type: String
  },
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);