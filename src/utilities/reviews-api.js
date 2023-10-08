const BASE_URL = "/api/reviews";

export async function createReview(review) {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers,
      body: JSON.stringify(review),
    });

    if (!response.ok) {
      throw new Error("Error creating review");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error creating review: ${error.message}`);
  }
}

export async function getAllReviews() {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(`${BASE_URL}`, { headers });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching reviews: ${error.message}`);
  }
}

export async function removeReview(id) {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      throw new Error("Error deleting review");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error deleting review: ${error.message}`);
  }
}

export async function updateReview(id, updatedText) {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ text: updatedText }),
    });

    if (!response.ok) {
      throw new Error("Error updating review");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error updating review: ${error.message}`);
  }
}
