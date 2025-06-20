const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const Message = require("./models/Message");

// Basic config
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const server = http.createServer(app); // Wrap express in HTTP
const io = new Server(server, {
  cors: {
    origin: "*", // Replace with frontend origin in prod
    methods: ["GET", "POST"],
  },
});

const userSocketMap = new Map();

io.on("connection", (socket) => {
  console.log("WebSocket connected", socket.id);

  socket.on("register", (userId) => {
    userSocketMap.set(userId, socket.id);
  });

  socket.on("admin-message", async ({ senderId, receiverId, message }) => {
    try {
      // Save message to DB
      await Message.create({
        sender: senderId,
        receiver: receiverId,
        message,
      });

      const receiverSocket = userSocketMap.get(receiverId);
      if (receiverSocket) {
        io.to(receiverSocket).emit("receive-message", { message });
      }
    } catch (error) {
      console.error("Error saving message:", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("WebSocket disconnected", socket.id);
    for (const [key, value] of userSocketMap.entries()) {
      if (value === socket.id) userSocketMap.delete(key);
    }
  });
});

// Database & cloudinary
const { connectDB } = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

// Routes
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const paymentRoutes = require("./routes/payments");
const courseRoutes = require("./routes/course");
const analyticsRoutes = require("./routes/analytics");
const messageRoutes = require("./routes/message.route");
const aiRoutes = require("./routes/ai.route");
const reachRoutes = require("./routes/reach");
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp" }));

// Mount routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/reach", reachRoutes);

// Default
app.get("/", (req, res) => res.send("Server is up and running."));

// Start
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
});
connectDB();
cloudinaryConnect();
