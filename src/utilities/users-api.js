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
    return data.results;
  } catch (error) {
    throw new Error(`Error searching cities: ${error.message}`);
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
      description: attraction.formatted_address,
      // Add more fields as needed
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

export async function removeAttraction(attractionId) {
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

export async function createReview(cityId, attractionId, review) {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(
      `${ATTRACTION_URL}/${cityId}/${attractionId}/reviews`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(review),
      },
    );

    if (!response.ok) {
      throw new Error("Error creating review");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error creating review: ${error.message}`);
  }
}

export async function removeReview(cityId, attractionId, reviewId) {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(
      `${ATTRACTION_URL}/${cityId}/${attractionId}/reviews/${reviewId}`,
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
  cityId,
  attractionId,
  reviewId,
  updatedText,
) {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(
      `${ATTRACTION_URL}/${cityId}/${attractionId}/reviews/${reviewId}`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify({ text: updatedText }),
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
