const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getMessages,
  getUserMessages,
} = require("../controllers/message.controller");
const { auth, isAdmin } = require("../middleware/auth");

// Admin sends message
router.post("/send", auth, isAdmin, sendMessage);

// Instructor/Student gets messages
router.get("/my", auth, getMessages);

router.get("/inbox", auth, getUserMessages);

module.exports = router;
