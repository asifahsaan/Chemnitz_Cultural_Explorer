// // routes/userRoutes.js

// const express = require("express");
// const router = express.Router();
// const protect = require("../middleware/authMiddleware"); 
// const auth = require("../middleware/authMiddleware");
// const { register, login, getProfile, updateProfile } = require("../controllers/userController");

// // Public routes:
// router.post("/register", register);
// router.post("/login", login);

// // Protected routes (require a valid Bearer token):
// router.get("/profile", auth, getProfile);
// router.put("/profile", auth, updateProfile);

// // ─── NEW: Get current user’s profile ───
// router.get("/profile", protect, async (req, res) => {
//   // req.user was populated by authMiddleware (excludes password)
//   res.json({
//     id: req.user._id,
//     email: req.user.email,
//     favorites: req.user.favorites, // array of ObjectId
//   });
// });

// // ─── NEW: Update current user’s profile (e.g. change email/password) ───
// router.put("/profile", protect, async (req, res) => {
//   try {
//     const user = req.user;
//     const { email, password } = req.body;

//     // If email is sent, update it
//     if (email) user.email = email.trim().toLowerCase();

//     // If password is sent, hash and update
//     if (password) {
//       const bcrypt = require("bcryptjs");
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(password, salt);
//     }

//     await user.save();

//     // Return updated profile (omit password)
//     res.json({
//       id: user._id,
//       email: user.email,
//       favorites: user.favorites,
//     });
//   } catch (err) {
//     console.error("❌ Error updating profile:", err);
//     res.status(500).json({ message: "Server error updating profile" });
//   }
// });

// module.exports = router;

// routes/userRoutes.js

const express = require("express");
const router = express.Router();

// We only have one auth middleware, so we’ll call it `protect`.
const protect = require("../middleware/authMiddleware");

// Pull in ALL controller functions (including our new favorites handlers)
const {
  register,
  login,
  getProfile,
  updateProfile,
  getFavorites,
  addFavorite,
  removeFavorite,
} = require("../controllers/userController");

// ─── Public routes ─────────────────────────────────────────────────────────
router.post("/register", register);
router.post("/login",    login);

// ─── Protected routes (require a valid Bearer token) ────────────────────────
// GET user’s own profile
router.get("/profile", protect, getProfile);

// PUT (update) user’s own profile (name and/or password)
router.put("/profile", protect, updateProfile);

// GET all favorites for the logged‐in user
router.get("/favorites", protect, getFavorites);

// POST (add) a single site to favorites
//    e.g. POST /api/users/favorites/<siteId>
router.post("/favorites/:siteId", protect, addFavorite);

// DELETE (remove) a single site from favorites
//    e.g. DELETE /api/users/favorites/<siteId>
router.delete("/favorites/:siteId", protect, removeFavorite);

module.exports = router;
