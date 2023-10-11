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

  try {
    // Check if an attraction with the same name already exists
    const existingAttraction = await Attraction.findOne({ name: data.name });

    if (existingAttraction) {
      // Check if the userId is not already in the attraction's users array
      if (!existingAttraction.users.includes(userId)) {
        existingAttraction.users.push(userId);
        await existingAttraction.save();
        res.status(200).json(existingAttraction);
      } else {
        res.status(400).json({ error: "User already added to the attraction" });
      }
    } else {
      // If the attraction doesn't exist, create a new attraction
      const newAttraction = await Attraction.create({
        ...data,
        users: [userId],
      });
      res.status(201).json(newAttraction);
    }
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

    res.status(200).json({ success: "Removed attraction from bucket list" });
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
  const userId = res.locals.userId;
  const attractionId = req.params.attractionId;

  try {
    const attraction = await Attraction.findById(attractionId);

    if (!attraction) {
      return res.status(404).json({ error: "Attraction not found" });
    }

    reviewData.user = userId;

    attraction.reviews.push(reviewData);
    await attraction.save();
    res.status(201).json(reviewData);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const updateReview = async (req, res) => {
  const attractionId = req.params.attractionId;
  const reviewId = req.params.reviewId;
  const userId = res.locals.userId;
  console.log(`userId is ${userId}`);

  try {
    const attraction =
      await Attraction.findById(attractionId).populate("reviews.user");

    if (!attraction) {
      res.status(404).json({ error: "Attraction not found" });
      return;
    }

    // Find the review by its _id within the attraction's reviews array
    const review = attraction.reviews.find((review) =>
      review._id.equals(reviewId),
    );

    console.log(review.user._id);

    if (!review) {
      res.status(404).json({ error: "Review not found" });
      return;
    }

    if (!review.user._id.equals(userId)) {
      res
        .status(403)
        .json({ error: "Unauthorized. You can only update your own reviews." });
      return;
    }

    review.text = req.body.text;
    review.rating = req.body.rating;

    await attraction.save();

    res.status(200).json({ text: review.text, rating: review.rating });
  } catch (error) {
    console.error("Error:", error); // Log the error for debugging
    res.status(500).json({
      error: "Something went wrong when updating/deleting the review",
    });
  }
};

const deleteReview = async (req, res) => {
  const attractionId = req.params.attractionId;
  const reviewId = req.params.reviewId;
  const userId = res.locals.userId;

  try {
    const attraction =
      await Attraction.findById(attractionId).populate("reviews.user");

    if (!attraction) {
      res.status(404).json({ error: "Attraction not found" });
      return;
    }

    const review = attraction.reviews.find((review) =>
      review._id.equals(reviewId),
    );

    if (!review) {
      res.status(404).json({ error: "Review not found" });
      return;
    }

    // Check if the authenticated user is the owner of the review
    if (!review.user.equals(userId)) {
      res
        .status(403)
        .json({ error: "Unauthorized. You can only delete your own reviews." });
      return;
    }

    const index = attraction.reviews.indexOf(review);
    attraction.reviews.splice(index, 1);

    await attraction.save();

    res.status(200).json({ success: "Review deleted successfully!" });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong when updating/deleting the review",
    });
  }
};

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
    const base64Image = imageBuffer.toString("base64");

    // Return the Base64-encoded image data in the response
    res.status(200).json({ image: base64Image });

    // res.set("Content-Type", "image/jpeg");
    // res.send(imageBuffer);
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
    // First request to search for the article
    const searchResponse = await axios.get(
      `${getDescriptionBaseUrl}?action=query&list=search&srsearch=${searchQuery}&format=json`,
    );

    const description = searchResponse.data.query.search[0];

    if (description) {
      // If a matching article was found, retrieve its content
      const pageid = description.pageid;
      const contentResponse = await axios.get(
        `${getDescriptionBaseUrl}?action=query&pageids=${pageid}&prop=extracts&exintro&explaintext&format=json`,
      );

      const articleContent = contentResponse.data.query.pages[pageid];
      res.status(200).json(articleContent);
    } else {
      res.status(404).json({ error: "No matching article found" });
    }
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
  updateReview,
  deleteReview,
  searchNearbyPlaces,
  getPhoto,
  getDescription,
};
