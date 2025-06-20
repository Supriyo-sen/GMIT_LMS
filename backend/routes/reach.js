// File: backend/routes/reach.js
const express = require("express");
const router = express.Router();
const { contactUs } = require("../controllers/contact.controller");

router.post("/contact", contactUs);

module.exports = router;
