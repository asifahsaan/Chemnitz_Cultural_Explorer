const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" }); // Load .env from parent folder

// Load Mongoose model
const CulturalSite = require("../models/CulturalSite");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});

// Read GeoJSON file
const rawData = fs.readFileSync("./Chemnitz.geojson");
const geojson = JSON.parse(rawData);

// Parse and insert features
const features = geojson.features.map((feature) => {
  const props = feature.properties;
  const [lon, lat] = feature.geometry.coordinates;

  return {
    name: props.name || "Unknown",
    category: props.tourism || props.amenity || props.art_gallery || "unknown",
    address: `${props["addr:street"] || ""} ${props["addr:housenumber"] || ""}, ${props["addr:postcode"] || ""} ${props["addr:city"] || ""}`,
    website: props.website || "",
    wheelchair: props.wheelchair || "unknown",
    location: {
      type: "Point",
      coordinates: [lon, lat]
    },
    osm_id: props["@id"] || ""
  };
});

// Insert into MongoDB
CulturalSite.insertMany(features)
  .then(() => {
    console.log("✅ GeoJSON data imported successfully!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ Error importing data:", err);
    mongoose.connection.close();
  });
