require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const CulturalSite = require('../models/CulturalSite');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  const categories = await CulturalSite.distinct("category");
  console.log("📦 Categories found in MongoDB:");
  console.log(categories);
  mongoose.connection.close();
})
.catch(err => {
  console.error("❌ Error:", err);
});
