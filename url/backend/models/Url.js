const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true, trim: true },
  shortCode: { type: String, required: true, unique: true, index: true },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  lastClickedAt: { type: Date, default: null }
});

urlSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Url", urlSchema);
