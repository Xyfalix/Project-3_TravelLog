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
  reviews: [reviewSchema],
});

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  attractions: [attractionSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
});

const Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;
