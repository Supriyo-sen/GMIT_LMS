import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchSentMessages } from "../../../services/operations/messages";
import { getUserProfiles } from "../../../services/operations/profileAPI";

const AdminSentMessages = () => {
  const { token } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    loadUsers();
    loadMessages();
  }, [token]);

  const loadUsers = async () => {
    const res = await getUserProfiles(token);
    if (res) setUsers(res.filter(u => u.accountType !== "Admin"));
  };

  const loadMessages = async () => {
    const data = await fetchSentMessages(token);
    if (data) setMessages(data);
  };

  const filteredMessages = messages.filter(
    (msg) => msg.receiverId._id === selectedUserId
  );

  return (
    <div className="min-h-screen p-6 bg-white text-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Sent Messages</h2>

        <select
          className="w-full mb-4 p-2 border rounded"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.firstName} {user.lastName} ({user.accountType})
            </option>
          ))}
        </select>

        {selectedUserId && filteredMessages.length === 0 ? (
          <p className="text-center text-gray-500">No messages sent to this user.</p>
        ) : (
          <div className="space-y-4 max-h-[70vh] overflow-y-auto">
            {filteredMessages.map((msg, idx) => (
              <div
                key={idx}
                className="bg-gray-100 p-4 rounded shadow border border-gray-300"
              >
                <p>{msg.message}</p>
                <div className="text-xs text-right text-gray-500 mt-2">
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

export default AdminSentMessages;
