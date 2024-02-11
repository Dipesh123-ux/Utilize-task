const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  customer_name: {
    type: String,
  },
  customer_email: {
    type: String,
  },
  product: {
    type: String,
  },

  quantity: {
    type: Number,
  },
});

module.exports = mongoose.model("Order", orderSchema);
