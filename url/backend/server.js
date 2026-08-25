require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const Url = require("./models/Url");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

app.post("/api/shorten", async (req, res) => {
  try {
    const { longUrl } = req.body;
    if (!longUrl) return res.status(400).json({ error: "Please enter a URL." });

    let parsed;
    try {
      parsed = new URL(longUrl);
      if (!["http:", "https:"].includes(parsed.protocol)) throw new Error();
    } catch {
      return res.status(400).json({ error: "Enter a valid HTTP/HTTPS URL." });
    }

    const shortCode = nanoid(7);
    const doc = await Url.create({ longUrl: parsed.toString(), shortCode });

    res.status(201).json({
      id: doc._id,
      longUrl: doc.longUrl,
      shortCode: doc.shortCode,
      shortUrl: `${process.env.BASE_URL || `http://localhost:${PORT}`}/s/${doc.shortCode}`
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create short URL." });
  }
});

app.get("/api/stats/:code", async (req, res) => {
  try {
    const doc = await Url.findOne({ shortCode: req.params.code }).lean();
    if (!doc) return res.status(404).json({ error: "Short URL not found." });
    res.json(doc);
  } catch {
    res.status(500).json({ error: "Server error." });
  }
});

app.get("/s/:code", async (req, res) => {
  try {
    const doc = await Url.findOneAndUpdate(
      { shortCode: req.params.code },
      { $inc: { clicks: 1 }, $set: { lastClickedAt: new Date() } },
      { new: true }
    );
    if (!doc) return res.status(404).send("Short URL not found.");
    res.redirect(doc.longUrl);
  } catch {
    res.status(500).send("Server error.");
  }
});

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/urlshortener")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`LinkForge running at http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
