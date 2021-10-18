const express = require("express");
const router = express.Router();

const {
  createOrder,
  addRider,
  getRiders,
  getAllOrders,
  cli,
} = require("./../controllers/AdminController");

const {
  validateRider,
  getRiderOrders,
  changeOrderStatus,
} = require("./../controllers/RiderController");

//test
router.post("/admin/cli", cli);

//admin
router.post("/admin/create-order", createOrder);
router.get("/admin/add-rider", addRider);
router.get("/admin/get-riders", getRiders);
router.get("/admin/get-all-orders", getAllOrders);

//rider
router.post("/rider/validate", validateRider);
router.get("/rider/orders", getRiderOrders);
router.patch("/rider/order-status", changeOrderStatus);

module.exports = router;
