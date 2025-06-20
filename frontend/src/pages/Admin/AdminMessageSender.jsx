// utils/socket.js
import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  if (!socket) {
    socket = io("http://localhost:5000", {
      query: { userId },
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      socket = null;
    });
  }
};

export const getSocket = () => socket;

// AdminMessageSender.jsx
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { connectSocket } from "../../utils/socket";
import { getUserProfiles } from "../../services/operations/profileAPI";
import AdminSentMessages from "../../components/core/Admin/AdminSentMessages";
import toast from "react-hot-toast";

const AdminMessageSender = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [users, setUsers] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log("Hook", user);
    if (user) {
      connectSocket(user._id);
      // console.log("User connected:", user._id);
    }
    getAllUsers();
  }, [user]);

  const getAllUsers = async () => {
    const res = await getUserProfiles(token);
    if (res) setUsers(res.filter((u) => u.accountType !== "Admin"));
  };

  const sendMessage = () => {
    setLoading(true);
    if (loading) return; // Prevent multiple clicks
    if (!receiverId || !message) {
      toast.error("Please select a user and type a message.");
      setLoading(false);
      return;
    }

    const socket = getSocket();
    if (!socket) {
      console.warn("Socket not connected yet.");
      setLoading(false);
      return;
    }

    socket.emit("admin-message", { senderId: user._id, receiverId, message });
    setMessage("");
    setReceiverId("");
    setLoading(false);
    toast.success("Message sent successfully!");
  };

  return (
    <div className="p-6 bg-white max-w-xl mx-auto shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Send Message to User</h2>

      <select
        className="w-full p-2 mb-4 border rounded"
        onChange={(e) => setReceiverId(e.target.value)}
        value={receiverId}
      >
        <option value="">Select User</option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>
            {u.firstName} ({u.accountType})
          </option>
        ))}
      </select>

      <textarea
        className="w-full p-3 mb-4 border rounded resize-none"
        rows={4}
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <button
        onClick={sendMessage}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded w-full"
      >
        Send Message
      </button>
    </div>
  );
};

export default AdminMessageSender;
