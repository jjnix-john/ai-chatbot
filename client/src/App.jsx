import React, { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: "user", text: message };
    setChat([...chat, userMessage]);

    try {
      const res = await axios.post("http://localhost:5000/chat", {
        message
      });

      const aiMessage = {
        sender: "ai",
        text: res.data.reply
      };

      setChat(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
    }

    setMessage("");
  };

  return (
    <div className="container">
      <h2>AI Chatbot</h2>

      <div className="chat-box">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === "user" ? "user-message" : "ai-message"}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          className="input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}


export default App;