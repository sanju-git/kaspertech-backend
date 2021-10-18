const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  description: String,
  start: String,
  end: String,
  rider: String,
  status: String,
  coordinates: String,
});

module.exports = mongoose.model("Order", OrderSchema);
