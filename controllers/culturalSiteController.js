// const CulturalSite = require("../models/CulturalSite");

// const getAllSites = async (req, res) => {
//   try {
//     const filter = {};

//     if (req.query.category) {
//       filter.category = { $regex: new RegExp(`^${req.query.category}$`, "i") };
//     }

//     const sites = await CulturalSite.find(filter);
//     res.json(sites);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error fetching cultural sites" });
//   }
// };

// module.exports = { getAllSites };

const CulturalSite = require("../models/CulturalSite");

const getAllSites = async (req, res) => {
  try {
    const filter = {};

    // ✅ Handle category filter
    if (req.query.category) {
      filter.category = { $regex: new RegExp(`^${req.query.category}$`, "i") };
    }

    // ✅ Handle search by name or address
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, "i");
      filter.$or = [
        { name: searchRegex },
        { address: searchRegex }
      ];
    }

    const sites = await CulturalSite.find(filter);
    res.json(sites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching cultural sites" });
  }
};

module.exports = { getAllSites };
