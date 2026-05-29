require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are Snehal Thombare's portfolio assistant. She is a CS student from Pune seeking internships. Projects: File Compression Tool (C++ Huffman), CP Analyzer, Market Predictor, AI Portfolio. Skills: C++, Python, React, Node.js. Keep answers to 2 sentences." },
        { role: "user", content: message }
      ]
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.log("Error details:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => res.send("Backend running!"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));