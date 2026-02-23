import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;

// POST /chat route
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    console.log("Received message:", message);

    // OpenRouter API call
    const https = require("https");
https.get("https://api.openrouter.ai/v1/chat/completions", (res) => {
  console.log(res.statusCode);
  res.on("data", d => process.stdout.write(d));
});

    const reply = response.data.choices[0].message.content;
    console.log("AI reply:", reply);

    res.json({ reply });
  } catch (error) {
    console.error("Backend error:", error.response?.data || error.message);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
});

// Optional GET route to test server
app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

// Start backend on port 5000
app.listen(5000, () => console.log("Server running on port 5000"));