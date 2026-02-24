import React, { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: "user", text: message };
    setChat(prev => [...prev, userMessage]);

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
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>AI Chatbot</h2>

        <div style={styles.chatBox}>
          {chat.map((msg, index) => (
            <div
              key={index}
              style={
                msg.sender === "user"
                  ? styles.userMessage
                  : styles.aiMessage
              }
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div style={styles.inputArea}>
          <input
            style={styles.input}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button style={styles.button} onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#dbeafe", 
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
    
  },
  container: {
    width: "420px",
    height: "600px",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    padding: "20px"
  },
  title: {
    textAlign: "center",
    marginBottom: "15px",
    color: "#1e3a8a"
  },
  chatBox: {
    flex: 1,
    overflowY: "auto",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
    
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#2563eb",
    color: "white",
    padding: "10px 14px",
    borderRadius: "18px",
    maxWidth: "75%",
    wordWrap: "break-word"
  },
  aiMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e5e7eb",
    color: "#111827",
    padding: "10px 14px",
    borderRadius: "18px",
    maxWidth: "75%",
    wordWrap: "break-word"
  },
  inputArea: {
    display: "flex",
    gap: "10px",
    marginTop: "10px"
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    outline: "none"
  },
  button: {
    padding: "10px 16px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default App;