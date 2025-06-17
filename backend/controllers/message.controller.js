const Message = require("../models/Message");
const User = require("../models/user");

// Save message to DB
exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;

    if (!receiverId || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    const newMessage = await Message.create({
      sender: req.user.id, // assuming admin is authenticated
      receiver: receiverId,
      message,
    });

    res
      .status(200)
      .json({ success: true, message: "Message sent", data: newMessage });
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
};

// Get all messages for a user (Instructor/Student)
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ receiver: req.user.id })
      .populate("sender", "firstName lastName email")
      .sort({ timestamp: -1 });

    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error("Get messages error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch messages" });
  }
};

exports.getUserMessages = async (req, res) => {
  try {
    const userId = req.user.id; // Must come from auth middleware

    const messages = await Message.find({ receiver: userId })
      .sort({ timestamp: 1 })
      .select("message timestamp sender");

    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, message: "Failed to fetch inbox." });
  }
};
