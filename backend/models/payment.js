const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  orderId: String,
  paymentId: String,
  amount: Number, // in paisa (store as Razorpay sends)
  status: { type: String, enum: ["SUCCESS", "FAILED"] },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", paymentSchema);
