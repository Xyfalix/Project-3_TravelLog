import * as reviewsAPI from "./reviews-api";

export async function createReview(review) {
  const reviews = await reviewsAPI.create(review);
  return reviews;
}

export async function getAllReviews() {
  const reviews = await reviewsAPI.getAllReviews();
  return reviews;
}

export async function removeReview(id) {
  const deletedReview = await reviewsAPI.removeReview(id);
  return deletedReview;
}

export async function updateReview(id, updatedText) {
  const updatedReview = await reviewsAPI.updateReview(id, updatedText);
  return updatedReview;
}
