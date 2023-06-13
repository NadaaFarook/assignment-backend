const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersModel = new Schema(
  {
    email: { type: String, unique: true },
    name: String,
    tokens: Array,
    picture: String, // edited to have a consistent naming accross FE and BE
    imagesUploads: Array,
    layers: [],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", usersModel);
