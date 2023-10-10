const Attraction = require("../../models/attraction");
const axios = require("axios");

const getAllAttractions = async (req, res) => {
  try {
    const userId = res.locals.userId;
    const userAttractions = await Attraction.find({ users: userId });
    res.status(200).json(userAttractions);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const addAttraction = async (req, res) => {
  const data = req.body;
  const userId = res.locals.userId;
  // check if attraction name already exists in database
  // if yes, add userId to array
  // if no, create new attraction schema

  try {
    const newAttraction = await Attraction.create({ ...data, users: userId });
    res.status(201).json(newAttraction);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const removeUserFromAttraction = async (req, res) => {
  const userId = res.locals.userId;
  const attractionId = req.params.attractionId;

  try {
    const result = await Attraction.updateOne(
      { _id: attractionId },
      { $pull: { users: userId } },
    );

    console.log(`result is ${result}`);

    res.status(200).json({ success: "Removed user from attraction" });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong while trying to remove user from attraction",
    });
  }
};

const getAttractionReviews = async (req, res) => {
  try {
    const attractionId = req.params.attractionId;
    const attraction =
      await Attraction.findById(attractionId).populate("reviews.user");

    if (!attraction) {
      res.status(500).json({ error: "Attraction not found" });
      return;
    }

    res.status(200).json(attraction.reviews);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong when retrieving the reviews" });
  }
};

const addReview = async (req, res) => {
  const reviewData = req.body;
  const attractionId = req.params.attractionId;

  try {
    const attraction = await Attraction.findById(attractionId);

    if (!attraction) {
      return res.status(404).json({ error: "Attraction not found" });
    }

    attraction.reviews.push(reviewData);
    await attraction.save();
    res.status(201).json(reviewData);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// const updateReview = async (req, res) => {
//   // update review
// };

// const deleteReview = async (req, res) => {
//   // Delete review
// };

const searchNearbyPlaces = async (req, res) => {
  const searchBaseUrl =
    "https://maps.googleapis.com/maps/api/place/textsearch/json";
  const apiKey = process.env.GOOGLE_API_KEY;
  const searchQuery = req.params.searchQuery;

  try {
    const response = await axios.get(
      `${searchBaseUrl}?query=${searchQuery}&key=${apiKey}`,
    );
    const nearbyPlaces = response.data.results;
    res.status(200).json(nearbyPlaces);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong with searchNearbyPlaces" });
  }
};

const getPhoto = async (req, res) => {
  const getPhotoBaseUrl = "https://maps.googleapis.com/maps/api/place/photo";
  const photoReference = req.params.photoReference;
  const apiKey = process.env.GOOGLE_API_KEY;
  const maxWidth = 400;

  try {
    const response = await axios.get(
      `${getPhotoBaseUrl}?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${apiKey}`,
      {
        responseType: "arraybuffer", // Set the response type to arraybuffer to handle binary data
      },
    );

    const imageBuffer = response.data;
    res.set("Content-Type", "image/jpeg"); // Set the content type to JPEG image
    res.send(imageBuffer);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong while fetching the image" });
  }
};

const getDescription = async (req, res) => {
  const getDescriptionBaseUrl = "https://en.wikipedia.org/w/api.php";
  const searchQuery = req.params.getDescription;

  try {
    const response = await axios.get(
      `${getDescriptionBaseUrl}?action=query&list=search&srsearch=${searchQuery}&format=json`,
    );
    const description = response.data.query.search[0];
    res.status(200).json(description);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong with getDescription" });
  }
};

module.exports = {
  getAllAttractions,
  addAttraction,
  removeUserFromAttraction,
  getAttractionReviews,
  addReview,
  searchNearbyPlaces,
  getPhoto,
  getDescription,
};
