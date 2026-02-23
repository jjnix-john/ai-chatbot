import { useState } from "react";
import axios from "axios";

export default function ChatBot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const res = await axios.post("http://localhost:5000/chat", { message });

      setChat((prev) => [...prev, { user: message, bot: res.data.reply }]);
      setMessage("");
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to get response from AI. Check backend logs.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "1rem" }}>
      <h2>AI Chatbot</h2>

      <div>
        {chat.map((c, i) => (
          <div key={i} style={{ marginBottom: "1rem" }}>
            <p><b>You:</b> {c.user}</p>
            <p><b>AI:</b> {c.bot}</p>
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="chat-input" style={{ display: "block", marginBottom: "0.2rem" }}>
          Chat message
        </label>
        <input
          id="chat-input"
          name="chat"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
          style={{ width: "80%", padding: "0.5rem", marginRight: "0.5rem" }}
        />
        <button type="button" onClick={sendMessage} style={{ padding: "0.5rem 1rem" }}>
          Send
        </button>
      </div>
    </div>
  );
}