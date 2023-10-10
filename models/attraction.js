const mongoose = require("mongoose");
const User = require("./user");

const reviewSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const attractionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  reviews: [reviewSchema],
});

const Attraction = mongoose.model("Attraction", attractionSchema);

module.exports = Attraction;
