const express = require("express");
const router = express.Router();
const { sendMessage, getMessages } = require("../controllers/messageController");
const { auth, isAdmin } = require("../middleware/auth");

// Admin sends message
router.post("/send", auth, isAdmin, sendMessage);

// Instructor/Student gets messages
router.get("/my", auth, getMessages);

module.exports = router;
