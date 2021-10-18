const Order = require("../models/Order");
const Rider = require("../models/Rider");

exports.createOrder = async (req, res, next) => {
  try {
    let { orderDetails } = req.body;
    orderDetails.status = "pending";
    let order = new Order(orderDetails);
    await order.save();

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("create order:", error);
    return res
      .status(500)
      .json({ msg: "Order Creation failed. Please try again later." });
  }
};

exports.addRider = async (req, res, next) => {
  try {
    let { name } = req.query;
    let rider = new Rider({ name });
    await rider.save();

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("create order:", error);
    return res
      .status(500)
      .json({ msg: "Order Creation failed. Please try again later." });
  }
};

exports.getRiders = async (req, res, next) => {
  try {
    let riders = await Rider.find({});
    return res.status(200).json({
      success: true,
      riders,
    });
  } catch (error) {
    console.error("add rider:", error);
    return res
      .status(500)
      .json({ msg: "Adding rider failed. Please try again later." });
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    let orders = [];
    orders = await Order.find({});
    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("create order:", error);
    return res
      .status(500)
      .json({ msg: "Order Creation failed. Please try again later." });
  }
};
