const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.json());

app.post("/translate", async (req, res) => {
  const { q, source, target, format } = req.body;

  try {
    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q, source, target, format, api_key: "" }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Translation failed." });
  }
});

app.get("/", (req, res) => {
  res.send("LibreTranslate Proxy is running!");
});

app.listen(3000, () => {
  console.log("Server is running");
});
