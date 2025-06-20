import { useState } from "react";
import { useSelector } from "react-redux";
import { askAIAssistant } from "../../services/operations/studentFeaturesAPI";
import ReactMarkdown from "react-markdown";

export default function AIAssistantChatbox({ courseTitle, lessonTitle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    const userMsg = { role: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);
    setQuestion("");

    setLoading(true);
    const response = await askAIAssistant(token, {
      question,
      courseTitle,
      lessonTitle,
    });

    const botMsg = { role: "bot", text: response };
    setMessages((prev) => [...prev, botMsg]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 bg-white rounded-xl shadow-lg border p-4 flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-gray-800">AI Assistant</h4>
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 mb-2 text-sm text-black">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-md ${
                  msg.role === "user"
                    ? "bg-blue-100 text-blue-900 self-end"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <ReactMarkdown className="prose prose-sm max-w-none text-richblack-100">
                  {msg.text}
                </ReactMarkdown>
              </div>
            ))}
          </div>
          <div className="flex gap-1">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="flex-1 px-3 py-1 border rounded text-sm text-black"
              placeholder="Ask your doubt..."
            />
            <button
              onClick={handleAsk}
              className={`bg-blue-600 text-white px-3 py-1 rounded text-sm ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
            >
              {loading ? "Asking..." : "Ask"}
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700"
          onClick={() => setIsOpen(true)}
        >
          🤖 Need Help?
        </button>
      )}
    </div>
  );
}
