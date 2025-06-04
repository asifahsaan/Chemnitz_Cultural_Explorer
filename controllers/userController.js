const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// ───────── REGISTER ─────────
// const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    console.error("Error in register:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ───────── LOGIN ─────────
// ───────── LOGIN ─────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Find the user document by email
    const user = await User.findOne({ email });
    if (!user) 
      return res.status(401).json({ message: "Invalid credentials" });

    // 2) Compare the plaintext password to hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) 
      return res.status(401).json({ message: "Invalid credentials" });

    // 3) If OK, sign a JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.json({ token });
  } catch (err) {
    console.error("Error in login:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


// ───────── GET PROFILE ─────────
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error("Error in getProfile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ───────── UPDATE PROFILE ─────────
const updateProfile = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name !== undefined) {
      user.name = name.trim();
    }

    if (password) {
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters" });
      }
      user.password = password; // Will be hashed by pre-save hook
    }

    await user.save();

    let newToken = null;
    if (password) {
      newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
    }

    if (newToken) {
      return res.json({ token: newToken });
    } else {
      return res.json({ message: "Profile updated successfully" });
    }
  } catch (err) {
    console.error("Error in updateProfile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET all favorite site objects for logged-in user
const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("favorites");
    res.json(user.favorites);
  } catch (err) {
    console.error("Error fetching favorites:", err);
    res.status(500).json({ message: "Failed to load favorites." });
  }
};

// POST: Add a favorite site
const addFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const siteId = req.params.siteId;
    if (!user.favorites.includes(siteId)) {
      user.favorites.push(siteId);
      await user.save();
    }
    res.json({ message: "Favorite added", favorites: user.favorites });
  } catch (err) {
    console.error("Error adding favorite:", err);
    res.status(500).json({ message: "Failed to add favorite." });
  }
};

// DELETE: Remove a favorite site
const removeFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const siteId = req.params.siteId;
    user.favorites = user.favorites.filter((id) => id.toString() !== siteId);
    await user.save();
    res.json({ message: "Favorite removed", favorites: user.favorites });
  } catch (err) {
    console.error("Error removing favorite:", err);
    res.status(500).json({ message: "Failed to remove favorite." });
  }
};


module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  getFavorites,
  addFavorite,
  removeFavorite,
};