const mongoose = require("mongoose");

const CulturalSiteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  address: {
    type: String
  },
  website: {
    type: String
  },
  wheelchair: {
    type: String,
    enum: ["yes", "no", "limited", "unknown"]
  },
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number]
  },
  osm_id: {
    type: String,
    unique: true
  }
});

CulturalSiteSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("CulturalSite", CulturalSiteSchema);

// const express = require("express");
// const router = express.Router();
// const { getAllSites } = require("../controllers/culturalSiteController");

// router.get("/", getAllSites);

// module.exports = router;

