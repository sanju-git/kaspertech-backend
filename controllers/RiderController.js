const Order = require("../models/Order");
const Rider = require("../models/Rider");

exports.validateRider = async (req, res, next) => {
  try {
    let { name } = req.body;
    let valid;
    let riders = await Rider.find({ name });

    if (riders.length >= 1) {
      valid = true;
    } else {
      valid = false;
    }
    return res.status(200).json({
      success: true,
      valid,
    });
  } catch (error) {
    console.error("validate rider:", error);
    return res
      .status(500)
      .json({ msg: "Validating rider failed. Please try again later." });
  }
};

exports.getRiderOrders = async (req, res, next) => {
  try {
    let { name } = req.query;
    let orders = [];
    orders = await Order.find({ rider: name, status: { $ne: "rejected" } });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("get rider:", error);
    return res
      .status(500)
      .json({ msg: "getting rider failed. Please try again later." });
  }
};

exports.changeOrderStatus = async (req, res, next) => {
  try {
    let { status, orderId, coordinates } = req.body;
    if (status === "accepted") {
      await Order.updateOne(
        { _id: orderId },
        { $set: { status, coordinates } }
      );
    } else {
      await Order.updateOne({ _id: orderId }, { $set: { status } });
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("change otder status failed:", error);
    return res.status(500).json({ msg: "Changing order status failed." });
  }
};
