const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");

// ───────────────────────────────────────────────
// 1) Define the schema
// ───────────────────────────────────────────────
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "CulturalSite" }],
  },
  { timestamps: true }
);

// ───────────────────────────────────────────────
// 2) Hash password automatically before .save()
// ───────────────────────────────────────────────
// userSchema.pre("save", async function (next) {
//   // only hash if the password has been modified or is new
//   if (!this.isModified("password")) return next();

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// ───────────────────────────────────────────────
// 3) Optional helper to compare passwords
// ───────────────────────────────────────────────
userSchema.methods.matchPassword = async function (entered) {
  return bcrypt.compare(entered, this.password);
};

// ───────────────────────────────────────────────
// 4) Export the model
// ───────────────────────────────────────────────
module.exports = mongoose.model("User", userSchema);
