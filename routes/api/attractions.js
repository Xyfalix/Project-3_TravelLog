var express = require("express");
var router = express.Router();
const attractionsCtrl = require("../../controllers/api/attractions");
const { checkToken } = require("../../config/checkToken");

router.get("/", checkToken, attractionsCtrl.getAllAttractions);
router.get("/:attractionId/reviews", attractionsCtrl.getAttractionReviews);
router.post("/", checkToken, attractionsCtrl.addAttraction);
router.post("/:attractionId/reviews", checkToken, attractionsCtrl.addReview);
router.patch(
  "/:attractionId/reviews/:reviewId",
  checkToken,
  attractionsCtrl.updateReview,
);
router.delete(
  "/:attractionId/reviews/:reviewId",
  checkToken,
  attractionsCtrl.deleteReview,
);
router.get("/search/:searchQuery", attractionsCtrl.searchNearbyPlaces);
router.get("/getPlacePhoto/:photoReference", attractionsCtrl.getPhoto);
router.get("/description/:getDescription", attractionsCtrl.getDescription);
router.delete(
  "/:attractionId",
  checkToken,
  attractionsCtrl.removeUserFromAttraction,
);
router.patch(
  "/:attractionId/toggleVisit",
  checkToken,
  attractionsCtrl.toggleVisited,
);

module.exports = router;
