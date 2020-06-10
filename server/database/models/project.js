const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String, required: true, maxlength: 128 },
  content: { type: String, required: true },
  stack: { type: String, required: true },
  link: { type: String, required: true },
  demoGif: { type: String, required: true },
  daysInMaking: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isInProgress: { type: Boolean },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", projectSchema);
