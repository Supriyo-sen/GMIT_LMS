import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { connectSocket, getSocket } from "../utils/socket";
import { fetchInboxMessages } from "../services/operations/messages";

const UserInbox = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("User Inbox Hook", user);
    if (user) {
      connectSocket(user._id);
      loadOldMessages();

      const socket = getSocket();
      socket.on("receive-message", ({ message }) => {
        // console.log("New message received:", message);
        setMessages((prev) => [...prev, { message, timestamp: new Date() }]);
      });
    }
  }, []);

  // console.log("User Inbox Messages:", messages);
  const loadOldMessages = async () => {
    const data = await fetchInboxMessages(token);
    if (data) setMessages(data);
  };

  return (
    <div className="min-h-screen p-6 bg-richblack-900 text-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 border-b pb-2 border-richblack-700">
          Admin Messages
        </h2>

        {messages.length === 0 ? (
          <p className="text-center text-richblack-400">No messages yet.</p>
        ) : (
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scroll">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className="bg-richblack-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all border border-richblack-700"
              >
                <p className="text-base">{msg.message}</p>
                <div className="mt-2 text-right text-sm text-richblack-400">
                  {new Date(msg.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInbox;
