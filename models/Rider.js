const mongoose = require("mongoose");

const RiderSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Rider", RiderSchema);
