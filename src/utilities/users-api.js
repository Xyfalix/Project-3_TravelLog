// This is the base path of the Express route we'll define
const BASE_URL = "/api/users";
const ATTRACTION_URL = "/api/attractions";

export async function signUp(userData) {
  // Fetch uses an options object as a second arg to make requests
  // other than basic GET requests, include data, headers, etc.
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Fetch requires data payloads to be stringified
    // and assigned to a body property on the options object
    body: JSON.stringify(userData),
  });
  // Check if request was successful
  if (res.ok) {
    // res.json() will resolve to the JWT
    return res.json();
  } else {
    throw new Error("Invalid Sign Up");
  }
}

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Fetch requires data payloads to be stringified
    // and assigned to a body property on the options object
    body: JSON.stringify({ email, password }),
  });

  // Check if request was successful
  if (res.ok) {
    // res.json() will resolve to the JWT
    return res.json();
  } else {
    throw new Error("Invalid username/password");
  }
}

export async function checkToken() {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await fetch("/api/users/check-token", { headers });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error checking token: " + error.message);
  }
}

export async function fetchAttractions() {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(`${ATTRACTION_URL}`, { headers });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching user notes: ${error.message}`);
  }
}

export async function searchAttractions(searchQuery) {
  try {
    const response = await fetch(`${ATTRACTION_URL}/search/${searchQuery}`);

    if (!response.ok) {
      throw new Error("Google Places search request failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error searching attractions: ${error.message}`);
  }
}

export async function addAttractionToBucketList(attraction) {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // Define the request body here (you can customize it)
    const requestBody = {
      name: attraction.name,
      description: attraction.description,
      image: attraction.photo,
      city: "City",
    };

    const response = await fetch(`${ATTRACTION_URL}`, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error("Error adding attraction to the bucket list");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      `Error adding attraction to the bucket list: ${error.message}`,
    );
  }
}

export async function removeAttractionFromBucketList(attractionId) {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(`${ATTRACTION_URL}/${attractionId}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      throw new Error("Error removing attraction");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error removing city: ${error.message}`);
  }
}

export async function createReview(attractionId, review) {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(`${ATTRACTION_URL}/${attractionId}/reviews`, {
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

export async function removeReview(attractionId, reviewId) {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(
      `${ATTRACTION_URL}/${attractionId}/reviews/${reviewId}`,
      {
        method: "DELETE",
        headers,
      },
    );

    if (!response.ok) {
      throw new Error("Error deleting review");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error deleting review: ${error.message}`);
  }
}

export async function updateReview(
  attractionId,
  reviewId,
  updatedText,
  updatedRating,
) {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(
      `${ATTRACTION_URL}/${attractionId}/reviews/${reviewId}`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify({ text: updatedText, rating: updatedRating }),
      },
    );

    if (!response.ok) {
      throw new Error("Error updating review");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error updating review: ${error.message}`);
  }
}

export async function getAllReviews(attractionId) {
  try {
    const response = await fetch(`${ATTRACTION_URL}/${attractionId}/reviews`);

    if (!response.ok) {
      throw new Error("Error fetching reviews");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error sfetching reviews: ${error.message}`);
  }
}

export async function getPhotoReference(photoReferenceId) {
  try {
    const response = await fetch(
      `${ATTRACTION_URL}/getPlacePhoto/${photoReferenceId}`,
    );

    if (!response.ok) {
      throw new Error("Error fetching photos");
    }

    const data = await response.json();
    console.log("Data from API:", data);
    return data.image;
  } catch (error) {
    throw new Error(`Error sfetching photo: ${error.message}`);
  }
}

export async function getDescription(attractionName) {
  try {
    const response = await fetch(
      `${ATTRACTION_URL}/description/${attractionName}`,
    );

    if (!response.ok) {
      throw new Error("Error fetching photos");
    }

    const data = await response.json();
    console.log("Data from API:", data);
    return data.extract;
  } catch (error) {
    throw new Error(`Error sfetching photo: ${error.message}`);
  }
}

export async function updateAttraction(attractionId) {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(
      `${ATTRACTION_URL}/${attractionId}/toggleVisit`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify(),
      },
    );

    if (!response.ok) {
      throw new Error("Error updating review");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error updating review: ${error.message}`);
  }
}
