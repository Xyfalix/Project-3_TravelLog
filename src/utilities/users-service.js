// Import all named exports attached to a usersAPI object
// This syntax can be helpful documenting where the methods come from
import * as usersAPI from "./users-api";

export async function signUp(userData) {
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const token = await usersAPI.signUp(userData);
  // Baby step by returning whatever is sent back by the server
  return token;
}

function getTokenPayload(token) {
  const tokenArray = token.split(".");
  const middle = tokenArray[1];
  const payload = window.atob(middle);
  return payload;
}

export function getToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const payload = getTokenPayload(token);

  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
    return null;
  }

  return token;
}

export function getUser() {
  const token = getToken();
  if (token === null) {
    return null;
  }

  const payload = getTokenPayload(token);
  return JSON.parse(payload);
}

export function logout() {
  localStorage.removeItem("token");
}

// calls the login function from users-api
export async function login(email, password) {
  const data = await usersAPI.login(email, password);
  return data;
}

export async function checkToken() {
  const data = await usersAPI.checkToken();
  return data;
}

export async function getAttractions() {
  const attractionsData = await usersAPI.fetchAttractions();
  return attractionsData;
}

export async function searchAttractions(searchQuery) {
  const searchData = await usersAPI.searchAttractions(searchQuery);
  return searchData;
}

export async function addAttractionToBucketList(attraction) {
  const addedAttraction = await usersAPI.addAttractionToBucketList(attraction);
  return addedAttraction;
}

export async function removeAttractionFromBucketList(attractionId) {
  const addedAttraction =
    await usersAPI.removeAttractionFromBucketList(attractionId);
  return addedAttraction;
}

export async function createReview(cityId, attractionId, review) {
  const reviews = await usersAPI.createReview(cityId, attractionId, review);
  return reviews;
}

export async function removeReview(cityId, attractionId, reviewId) {
  const deletedReview = await usersAPI.removeReview(
    cityId,
    attractionId,
    reviewId,
  );
  return deletedReview;
}

export async function updateReview(
  cityId,
  attractionId,
  reviewId,
  updatedText,
) {
  const updatedReview = await usersAPI.updateReview(
    cityId,
    attractionId,
    reviewId,
    updatedText,
  );
  return updatedReview;
}
