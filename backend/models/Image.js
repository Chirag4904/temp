const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true, // Add an index on the name field for faster search
  },

  filepath: {
    type: String,
    required: true,
    unique: true,
  },

  username: {
    type: String,
    ref: "User",
    required: true,
  },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
