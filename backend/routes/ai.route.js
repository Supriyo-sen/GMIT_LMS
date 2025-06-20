const express = require("express");
const router = express.Router();
const { auth, isStudent } = require("../middleware/auth");
const { askAI } = require("../controllers/ai.controller");

router.post("/ask", auth, isStudent, askAI);

module.exports = router;
