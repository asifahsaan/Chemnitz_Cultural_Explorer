const express = require("express");
const router = express.Router();
const { getAllSites } = require("../controllers/culturalSiteController");

router.get("/", getAllSites);

module.exports = router;
