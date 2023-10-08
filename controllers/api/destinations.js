const Destination = require("../../models/destination");

const getAllDestinations = async (req, res) => {
  try {
    const userId = res.locals.userId;
    const userDestinations = await Destination.find({ user: userId });
    res.status(200).json(userDestinations);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const addDestination = async (req, res) => {
  const data = req.body;
  const userId = res.locals.userId;

  try {
    const newDestination = await Destination.create({ ...data, user: userId });
    res.status(201).json(newDestination);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const addAttraction = async (req, res) => {
  const attractionData = req.body;
  const userId = res.locals.userId;
  const destinationId = req.params.destinationId;

  try {
    const destination = await Destination.findOne({
      _id: destinationId,
      user: userId,
    });

    if (!destination) {
      throw new Error("Destination not found");
    }

    destination.attractions.push(attractionData);
    await destination.save();
    res.status(201).json(attractionData);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const addReview = async (req, res) => {
  const reviewData = req.body;
  const destinationId = req.params.destinationId;
  const attractionId = req.params.attractionId;

  try {
    const destination = await Destination.findById(destinationId);

    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }

    const attraction = destination.attractions.id(attractionId);

    if (!attraction) {
      return res.status(404).json({ error: "Attraction not found" });
    }

    attraction.reviews.push(reviewData);
    await destination.save();
    res.status(201).json(reviewData);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  getAllDestinations,
  addDestination,
  addAttraction,
  addReview,
};
