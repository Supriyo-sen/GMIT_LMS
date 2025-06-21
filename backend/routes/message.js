const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getMessages,
  getUserMessages,
  getSentMessages,
} = require("../controllers/message");
const { auth, isAdmin } = require("../middleware/auth");

// Admin sends message
router.post("/send", auth, isAdmin, sendMessage);

// Instructor/Student gets messages
router.get("/my", auth, getMessages);

router.get("/inbox", auth, getUserMessages);

// routes/message.js
router.get("/sent", auth, isAdmin, getSentMessages);

module.exports = router;
