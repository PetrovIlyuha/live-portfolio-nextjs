const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  avatar: String,
  email: {
    type: String,
    required: "Email is required",
    lowercase: true,
    index: true,
    unique: true,
  },
});

module.exports = mongoose.model("User", userSchema);
