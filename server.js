const express = require("express");
const cors    = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const siteRoutes = require("./routes/culturalSiteRoutes");




dotenv.config();
const app = express();
// const app = express();

app.use(cors());
app.use(express.json()); // Enable JSON parsing

app.use("/api/sites", siteRoutes);   //  ← add this line
app.use("/api/users", userRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

// Routes
// 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
