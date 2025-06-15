const express = require("express");
const router = express.Router();

const {
  capturePayment,
  verifyPayment,
  paymentOverview,
  logs,
} = require("../controllers/payments");
const {
  auth,
  isAdmin,
  isInstructor,
  isStudent,
} = require("../middleware/auth");

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifyPayment);
router.get("/overview", auth, isAdmin, paymentOverview);
router.get("/logs", auth, isAdmin, logs);

module.exports = router;
