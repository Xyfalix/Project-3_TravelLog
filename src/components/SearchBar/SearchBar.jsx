import { useState } from "react";
import {
  searchAttractions,
  addAttractionToBucketList,
  getPhotoReference,
  ImageDisplay,
  getDescription,
} from "../../utilities/users-service";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [attractionType, setAttractionType] = useState("Attractions");
  // const [photoReference, setPhotoReference] = useState();
  const [descriptions, setDescriptions] = useState([]);
  const [showFullDescriptionFor, setShowFullDescriptionFor] = useState(null);

  const fetchDescriptions = async (attractions) => {
    const descriptionPromises = attractions.map(async (attraction) => {
      try {
        const description = await getDescription(attraction.name);
        return { ...attraction, description };
      } catch (error) {
        console.error(
          `Error fetching description for ${attraction.name}: ${error}`
        );
        return attraction;
      }
    });

    const attractionsWithDescriptions = await Promise.all(descriptionPromises);
    setDescriptions(attractionsWithDescriptions);
  };

  const handleSearch = async () => {
    try {
      const attractions = await searchAttractions(searchInput + attractionType);
      console.log("attractions", attractions);
      if (attractions) {
        await fetchDescriptions(attractions);
        // Retrieve photo references for each attraction
        const photoPromises = attractions.map(async (attraction) => {
          if (attraction.photos && attraction.photos.length > 0) {
            const photoReference = attraction.photos[0].photo_reference;
            const photo = await getPhotoReference(photoReference);
            return { ...attraction, photo };
          }
          return attraction;
        });
        const attractionsWithPhotos = await Promise.all(photoPromises);
        setSearchResults(attractionsWithPhotos);
      } else {
        console.error("Error searching attractions");
      }
    } catch (error) {
      console.error("Error performing search:", error);
    }
  };

  const handleAddAttractionToBucketList = async (attraction) => {
    const matchingDescription = descriptions.find(
      (desc) => desc.place_id === attraction.place_id
    );
    if (matchingDescription) {
      attraction.description = matchingDescription.description;
    } else {
      attraction.description = "No description available";
    }
    try {
      const addedAttraction = await addAttractionToBucketList(attraction);
      if (addedAttraction) {
        console.log(`Added "${addedAttraction.name}" to the bucket list`);
      } else {
        console.error("Error adding attraction to the bucket list");
      }
    } catch (error) {
      console.error("Error adding attraction to the bucket list:", error);
    }
  };

  const handleShowMore = (placeId) => {
    setShowFullDescriptionFor((prevPlaceId) =>
      prevPlaceId === placeId ? null : placeId
    );
  };

  const renderSearchResults = () => {
    if (searchResults.length === 0) {
      return <p>No results found.</p>;
    }

    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {searchResults.map((result) => (
          <div
            key={result.place_id}
            className="card w-96 bg-base-100 shadow-xl image-full"
          >
            <figure>
              <img src={ImageDisplay(result.photo)} alt={result.name} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{result.name}</h2>
              {descriptions.map((attraction) =>
                attraction.place_id === result.place_id ? (
                  <div key={attraction.place_id}>
                    <p>
                      Description:{" "}
                      {showFullDescriptionFor === attraction.place_id
                        ? attraction.description
                        : attraction.description.length > 30
                        ? `${attraction.description.substring(0, 30)}...`
                        : attraction.description}
                    </p>
                    {attraction.description.length > 30 && (
                      <button
                        onClick={() => handleShowMore(attraction.place_id)}
                      >
                        {showFullDescriptionFor === attraction.place_id
                          ? "Show Less"
                          : "Show More"}
                      </button>
                    )}
                  </div>
                ) : null
              )}
              <div className="card-actions justify-between">
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddAttractionToBucketList(result)}
                >
                  Add to Bucket List
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-semibold mb-4">Search Attractions</h1>
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          placeholder="Search for city here.."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border rounded-lg py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
        />
        <select
          value={attractionType}
          onChange={(e) => setAttractionType(e.target.value)}
          className="bg-gray-500 border rounded-lg py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="Attractions">Attractions</option>
          <option value="Cafe">Cafe</option>
          <option value="Eatery">Eatery</option>
          <option value="Natural Park">Natural Park</option>
          <option value="Restaurants">Restaurants</option>
          <option value="Museum">Museum</option>
          <option value="Beach">Beach</option>
          <option value="Theater">Theater</option>
          {/* Add more options here */}
        </select>
        <button
          onClick={() => handleSearch(searchInput, attractionType)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Search
        </button>
      </div>

      {renderSearchResults()}
    </div>
  );
};

export default SearchBar;
